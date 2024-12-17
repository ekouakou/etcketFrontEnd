import React, { useState, useEffect } from 'react'; 
import AppHeader from '../../AppComponents/Header/AppHeader';
import Footer from '../../AppComponents/Footer/Footer';
import { useTheme } from '../../contexts/ThemeProvider'; 
import { useNavigate } from 'react-router-dom';
import { doConnexion } from '../../services/apiService';



const SignIn = () => {
  const { theme, toggleTheme } = useTheme(); // Hook pour le thème
  const [background, setBackground] = useState('');
  const [STR_CLILOGIN, setSTR_CLILOGIN] = useState('');
  const [STR_CLIPASSWORD, setSTR_CLIPASSWORD] = useState('');
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
            params.append('STR_CLILOGIN', STR_CLILOGIN);
            params.append('STR_CLIPASSWORD', STR_CLIPASSWORD);

            const response = await doConnexion(params);
            const userData = response.data;

            // if (userData.code_statut === "1") {
            //     localStorage.setItem('user', JSON.stringify(userData));
            //     navigate('/mon-profile'); // Rediriger vers le tableau de bord
            // } else {
            //     setError(userData.desc_statut);
            // }

            if (userData.code_statut === "1") {
                localStorage.setItem('user', JSON.stringify(userData));
                navigate('/profile'); // Rediriger vers le tableau de bord
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
      <div className="sign section--bg" data-bg={background} style={{ backgroundImage: `url(${background})` }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="sign__content">
                <form action="#" className="sign__form" onSubmit={handleSubmit}>
                  <a href="index.html" className="sign__logo">
                    <img src="img/logo.svg" alt="" />
                  </a>
                  <div className="sign__group">
                    <input type="text" className="sign__input text-theme" placeholder="Votre numéro de téléphone" value={STR_CLILOGIN} onChange={(e) => setSTR_CLILOGIN(e.target.value)} required />
                  </div>
                  <div className="sign__group">
                    <input type="password" className="sign__input text-theme" placeholder="Votre mot de passe" value={STR_CLIPASSWORD} onChange={(e) => setSTR_CLIPASSWORD(e.target.value)} required/>
                  </div>
                  {/* <div className="sign__group sign__group--checkbox">
                    <input id="remember" name="remember" type="checkbox" defaultChecked="checked" />
                    <label htmlFor="remember">Remember Me</label>
                  </div> */}
                  <button className="sign__btn text-theme" type="submit">
                    Se connecter
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignIn;
