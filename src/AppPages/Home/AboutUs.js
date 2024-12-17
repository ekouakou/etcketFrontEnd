import React, { useState, useEffect } from 'react'; 
import AppHeader from '../../AppComponents/Header/AppHeader';
import Footer from '../../AppComponents/Footer/Footer';
import { useTheme } from '../../contexts/ThemeProvider'; 
import { useNavigate } from 'react-router-dom';
import { doConnexion } from '../../services/apiService';
import { FaHandshake, FaShieldAlt, FaGlobe, FaHeadset } from 'react-icons/fa'; // Import des icônes

const AboutUs = () => {
  const { theme, toggleTheme } = useTheme(); // Hook pour le thème
  const [background, setBackground] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Met à jour le background selon le thème
    const newBackground =
      theme === 'light'
        ? "assets/media/bg/section__bg_blue.jpg"
        : "assets/media/bg/section__bg.jpg";
    setBackground(newBackground);
  }, [theme]); // Exécuter à chaque changement de `theme`

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const params = new URLSearchParams();
      params.append('mode', 'doConnexion');
      params.append('STR_UTILOGIN', email);
      params.append('STR_UTIPASSWORD', password);

      const response = await doConnexion(params);
      const userData = response.data;

      if (userData.code_statut === "1") {
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/mon-profile'); // Rediriger vers le tableau de bord
      } else {
        setError(userData.desc_statut);
      }
    } catch (error) {
      setError('Erreur de connexion. Veuillez réessayer.');
    }
  };

  return (
    <>
      <AppHeader />
      <>
        {/* page title */}
        <section className="section section--first">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="section__wrap">
                  <h1 className="section__title section__title--head text-theme">
                    À propos de nous
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* about */}
        <section className="section">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h2 className="section__title text-theme">
                  <b>Qui sommes-nous ?</b>
                </h2>
                <p className="section__text text-theme">
                  Guinée Ticket est la solution de billetterie en ligne qui simplifie l'accès à vos événements préférés en Guinée !
                  Détenue par <b className='text-theme'>AFRIDIGICOM SARLU</b>, une agence de marketing et de communication réputée
                  pour son dynamisme et son expertise, Guinée Ticket se positionne comme le lien privilégié entre les organisateurs d'événements et un public passionné.
                </p>
              </div>

              {/* Features */}
              <div className="col-12 col-md-6 col-lg-4">
                <div className="feature">
                  <FaHandshake className="feature__icon text-danger" size={30} />
                  <h3 className="feature__title text-theme">La simplicité</h3>
                  <p className="feature__text text-theme">
                    Une plateforme conviviale et facile à utiliser pour trouver rapidement l'événement qui vous intéresse.
                  </p>
                </div>
              </div>
              
              <div className="col-12 col-md-6 col-lg-4">
                <div className="feature">
                  <FaShieldAlt className="feature__icon text-danger" size={30} />
                  <h3 className="feature__title text-theme">La sécurité</h3>
                  <p className="feature__text text-theme">
                    Un système de paiement en ligne sécurisé pour des transactions fiables et protégées.
                  </p>
                </div>
              </div>
              
              <div className="col-12 col-md-6 col-lg-4">
                <div className="feature">
                  <FaGlobe className="feature__icon text-danger" size={30} />
                  <h3 className="feature__title text-theme">La diversité</h3>
                  <p className="feature__text text-theme">
                    Une sélection d'événements variés : concerts, spectacles, festivals, et bien plus encore.
                  </p>
                </div>
              </div>
              
              <div className="col-12 col-md-6 col-lg-4">
                <div className="feature">
                  <FaHeadset className="feature__icon text-danger" size={30} />
                  <h3 className="feature__title text-theme">La proximité</h3>
                  <p className="feature__text text-theme">
                    Un service client à votre écoute pour répondre à toutes vos questions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
      <Footer />
    </>
  );
};

export default AboutUs;
