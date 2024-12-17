import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { doDisConnexion } from '../../services/apiService';
import { doConnexion } from '../../services/apiService';


const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      const params = new URLSearchParams();
      params.append('mode', 'doDisConnexion');
      params.append('STR_UTITOKEN', user?.UTITOKEN);

      await doDisConnexion(params);
      localStorage.removeItem('user');
      setUser(null);
      navigate('/'); // Rediriger vers la page d'accueil ou la page de connexion
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
    }
  };


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const params = new URLSearchParams();
            params.append('mode', 'doConnexion');
            params.append('STR_CLILOGIN', email);
            params.append('STR_CLIPASSWORD', password);

            const response = await doConnexion(params);
            const userData = response.data;

            console.log(userData.LG_CLIID);

            if (userData.LG_CLIID != "") {
                localStorage.setItem('user', JSON.stringify(userData));
                navigate('/mon-profile'); // Rediriger vers le tableau de bord
            } else {
                setError(userData.desc_statut);
            }
        } catch (error) {
            setError('Erreur de connexion. Veuillez réessayer.');
        }
    };


  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  return (
    <div className={`dropdown ${isOpen ? 'open' : ''}`} ref={dropdownRef}>
      <a onClick={toggleDropdown} className="dropdown-toggle  btn btn-default header-btn  h-100">
        <i className='fas fa-user' style={{ cursor: 'pointer' }}></i>
        <span className='ml-3 text-white'>{user ? user.UTIFIRSTLASTNAME : ''}</span>
      </a>
      <ul className="dropdown-menu">
        {!user && 
        <>
        <div className="w-300px p-5">
          <form className="form w-100" noValidate="" id="kt_sign_in_form" onSubmit={handleSubmit}>
            <div className="text-center mb-11">
              <div className="text-gray-500 fw-semibold fs-6">
                Connecté vous a votre compte
              </div>
            </div>
            <div className="fv-row mb-8">
              <input type="text" placeholder="Email" name="email" autoComplete="off" className="form-control bg-transparent" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="fv-row mb-3">
              <input type="password" placeholder="Password" name="password" autoComplete="off" className="form-control bg-transparent" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
              <div />
              <a href="reset-password.html" className="link-primary">
                Forgot Password ?
              </a>
            </div>
            <div className="d-grid mb-5">
              <button type="submit" id="kt_sign_in_submit" className="btn btn-primary">
                <span className="indicator-label">Connexion</span>
              </button>
            </div>
          </form>
        </div>

          {/* <li><NavLink to="/login">Connexion</NavLink></li> */}
        </>
        }
        {user && (
          <>
            <li><NavLink to="/mon-profile">Mes tickets</NavLink></li>
            {/* <li><NavLink to="/profile">Profile</NavLink></li>
            <li><NavLink to="/settings">Settings</NavLink></li> */}
            <li><a href="#0" onClick={handleLogout}>Logout</a></li>
          </>
        )}
      </ul>
    </div>
  );
};

export default DropdownMenu;
