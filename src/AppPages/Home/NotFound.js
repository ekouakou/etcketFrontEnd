import React, { useState, useEffect } from 'react'; 
import AppHeader from '../../AppComponents/Header/AppHeader';
import Footer from '../../AppComponents/Footer/Footer';
import { useTheme } from '../../contexts/ThemeProvider'; 
import { useNavigate } from 'react-router-dom';
import { doConnexion } from '../../services/apiService';
import { NavLink } from 'react-router-dom';




const NotFound = () => {
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
  


  return (
    <>
      <AppHeader />
        {/* page 404 */}
        <div className="page-404 section--bg" data-bg={background} style={{ backgroundImage: `url(${background})` }}>
            <div className="container">
            <div className="row">
                <div className="col-12">
                <div className="page-404__wrap">
                    <div className="page-404__content">
                    <h1 className="page-404__title">404</h1>
                    <p className="page-404__text">
                        The page you are looking for <br />
                        not available!
                    </p>
                    <NavLink exact to="/" >
                      <a  className="page-404__btn px-3">
                          Aller à l'accueil
                      </a>
                      </NavLink>
                    
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>

      <Footer />
    </>
  );
};

export default NotFound;
