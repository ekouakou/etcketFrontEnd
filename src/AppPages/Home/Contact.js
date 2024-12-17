import React, { useState, useEffect } from 'react'; 
import AppHeader from '../../AppComponents/Header/AppHeader';
import Footer from '../../AppComponents/Footer/Footer';
import { useTheme } from '../../contexts/ThemeProvider'; 
import { useNavigate } from 'react-router-dom';
import { doConnexion } from '../../services/apiService';

const Contact = () => {
  const { theme, toggleTheme } = useTheme(); // Hook pour le thème
  const [background, setBackground] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Met à jour l'arrière-plan selon le thème
    const newBackground =
      theme === 'light'
        ? "assets/media/bg/section__bg_blue.jpg"
        : "assets/media/bg/section__bg.jpg";
    setBackground(newBackground);
  }, [theme]); // S'exécute à chaque changement de `theme`

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
        navigate('/mon-profile'); // Rediriger vers le profil
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
        {/* titre de la page */}
        <section className="section section--first">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="section__wrap">
                  {/* titre de la section */}
                  <h1 className="section__title section__title--head text-theme">Contacts</h1>
                  {/* fin titre de la section */}
                  {/* fil d'Ariane */}
                  {/* <ul className="breadcrumbs">
                    <li className="breadcrumbs__item">
                      <a href="index.html">Accueil</a>
                    </li>
                    <li className="breadcrumbs__item breadcrumbs__item--active">
                      Contacts
                    </li>
                  </ul> */}
                  {/* fin fil d'Ariane */}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* fin titre de la page */}
        {/* section contacts */}
        <section className="section">
          <div className="container">
            <div className="row">
              <div className="col-12 col-xl-8">
                <div className="row">
                  {/* titre de la section */}
                  <div className="col-12">
                    <h2 className="section__title text-theme">Formulaire de contact</h2>
                  </div>
                  {/* fin titre de la section */}
                  <div className="col-12">
                    <form action="#" className="sign__form sign__form--full">
                      <div className="row">
                        <div className="col-12 col-xl-6">
                          <div className="sign__group">
                            <label className="sign__label text-theme" htmlFor="firstname">
                              Nom
                            </label>
                            <input
                              id="firstname"
                              type="text"
                              name="firstname"
                              className="sign__input"
                              placeholder="Jean"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-xl-6">
                          <div className="sign__group">
                            <label className="sign__label text-theme" htmlFor="email">
                              Email
                            </label>
                            <input
                              id="email"
                              type="text"
                              name="email"
                              className="sign__input"
                              placeholder="email@email.com"
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="sign__group">
                            <label className="sign__label text-theme" htmlFor="subject">
                              Sujet
                            </label>
                            <input
                              id="subject"
                              type="text"
                              name="subject"
                              className="sign__input"
                              placeholder="Partenariat"
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="sign__group">
                            <label className="sign__label text-theme" htmlFor="message">
                              Message
                            </label>
                            <textarea
                              id="message"
                              name="message"
                              className="sign__textarea"
                              placeholder="Tapez votre message..."
                              defaultValue={""}
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <button
                            type="button"
                            className="sign__btn sign__btn--small text-theme"
                          >
                            Envoyer
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-xl-4">
                <div className="row">
                  {/* section contacts */}
                  <div className="col-12">
                    <h2 className="section__title section__title--mt text-theme">
                      Contactez-nous
                    </h2>
                    <p className="section__text text-theme">
                      Nous sommes toujours ravis de vous aider et de vous fournir plus 
                      d'informations sur nos services. Vous pouvez nous contacter par 
                      email, téléphone ou via le formulaire de notre site. Merci de 
                      nous considérer !
                    </p>
                    <ul className="contacts__list text-theme">
                      <li>
                        <a href="#" className="text-theme">Hamdallave Rond Point : 611 30 30 31</a>
                      </li>
                      <li>
                        <a href="mailto:support@hotflix.com" className="text-theme">
                        contact@guineeticket.com
                        </a>
                      </li>
                    </ul>
                    {/* <div className="contacts__social text-theme">
                      <a href="#">
                        <i className="ti ti-brand-facebook text-theme" />
                      </a>
                    </div> */}
                  </div>
                  {/* fin section contacts */}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* fin section contacts */}
      </>
      <Footer />
    </>
  );
};

export default Contact;
