import React, { useState, useRef, useEffect, useContext } from 'react';
import { useTheme } from '../../contexts/ThemeProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faUser,faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import LogoHeader from './LogoHeader';
import PanierItem from '../PanierItem';
import DropdownMenu from './DropdownMenu';
import { HeaderContext } from '../../contexts/HeaderContext';
import { Modal, Button } from 'react-bootstrap';
import { CartContext } from '../../contexts/CartContext';

function Header({ onSearch }) {
  const { theme, toggleTheme } = useTheme();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const searchInputRef = useRef(null);
  const searchIconRef = useRef(null);
  const { searchTerm, setSearchTerm, handleSearchSubmit } = useContext(HeaderContext);
  const { cartItems, updateCartItems } = useContext(CartContext);
  const [menuActive, setMenuActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const headerNavRef = useRef(null);
  const filterFixedRef = useRef(null);

  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user)


  const toggleButton = () => {
    toggleTheme();
  };

  const toggleCartVisibility = (event) => {
    event.preventDefault();
    setIsCartVisible(!isCartVisible);
    if (isSearchVisible) {
      setIsSearchVisible(false);
    }
  };


  const handleClickOutside = (event) => {
    if (
      searchInputRef.current &&
      !searchInputRef.current.contains(event.target) &&
      !searchIconRef.current.contains(event.target)
    ) {
      setIsSearchVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isActiveFunc = (match, location) => {
    return match !== null;
  };


  const isDatePassed = (dateString, timeString) => {
    if (!dateString || !timeString) {
      return false; 
    }
    const dateParts = dateString.split('/');
    const timeParts = timeString.split(':');
    const eventDate = new Date(
      parseInt(dateParts[2]), // année
      parseInt(dateParts[1]) - 1, // mois
      parseInt(dateParts[0]), // jour
      parseInt(timeParts[0]), // heure
      parseInt(timeParts[1]) // minute
    );
    return eventDate < new Date();
  };


  // Vérification et suppression des éléments dont la date est passée au montage du composant
  useEffect(() => {
    const validCartItems = cartItems.filter(
      (item) => !isDatePassed(item.DT_EVEBEGIN, item.HR_EVEBEGIN)
    );
    if (validCartItems.length !== cartItems.length) {
      updateCartItems(validCartItems);
      localStorage.setItem('cartItems', JSON.stringify(validCartItems));
    }
  }, [cartItems, updateCartItems]);

  const CartModal = (
    <Modal
      size="lg"
      show={isCartVisible}
      onHide={() => setIsCartVisible(false)}
      animation={false}
      centered
    >
      <Modal.Header closeButton>
        <div className="card-header pt-7">
          <h3 className="card-title fw-bold text-gray-900 text-theme">Vos commandes en cours</h3>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="hover-scroll-overlay-y pe-6 me-n6" >
          {cartItems.length === 0 ? (
            <p className='text-theme'>Votre panier est vide.</p>
          ) : (
            cartItems.map((item, index) => (
              <PanierItem
                key={index}
                pannierData={item}
                index={index}
                onRemove={() => handleRemoveItem(index)}
              />
            ))
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <NavLink exact to="/detail-event">
          <Button variant="success">Passez à l'achat</Button>
        </NavLink>
        <Button variant="secondary" onClick={() => setIsCartVisible(false)}>
          Fermer
        </Button>
      </Modal.Footer>
    </Modal>
  );


  const handleRemoveItem = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    updateCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };


  function removeExpiredItems() {
    // Récupérer les items du panier depuis le localStorage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
    // Obtenir la date et l'heure actuelles
    const now = new Date();
  
    // Filtrer les items dont la date et l'heure ne sont pas dépassées
    const validItems = cartItems.filter(item => {
      // Vérifier si DT_EVEEND et HR_EVEEND existent et sont valides
      if (!item.DT_EVEEND || !item.HR_EVEEND) {
        console.warn("Item avec date ou heure invalide : ", item);
        return false; // Si une des deux valeurs est manquante, on supprime l'item
      }
  
      try {
        // Convertir la date au format "YYYY-MM-DD"
        const eventEndDate = item.DT_EVEEND.split('/').reverse().join('-');
        const eventEndTime = item.HR_EVEEND; // heure de fin
  
        // Créer un objet Date pour la date et l'heure de fin de l'événement
        const eventEndDateTime = new Date(`${eventEndDate}T${eventEndTime}`);
  
        // Garder l'item si l'événement n'est pas encore terminé
        return now < eventEndDateTime;
      } catch (error) {
        console.error("Erreur lors du traitement de l'item : ", item, error);
        return false;
      }
    });
  
    // Mettre à jour le localStorage avec les items valides
    localStorage.setItem('cartItems', JSON.stringify(validItems));
  
    console.log("Panier mis à jour:", validItems);
  }
  
  // Appeler la fonction pour supprimer les items expirés
  removeExpiredItems();
  
  


  // 



  const handleSearchChange = (e) => {
      const value = e.target.value;
      setSearchTerm(value);
      onSearch(value);  // Propager le terme de recherche au parent
  };




    const menus = [
        // {
        //     label: 'Home',
        //     link: '#',
        //     submenu: [
        //         { label: 'Home style 1', link: 'index.html' },
        //         { label: 'Home style 2', link: 'index2.html' },
        //         { label: 'Home style 3', link: 'index3.html' },
        //     ],
        // },
        // {
        //     label: 'Catalog',
        //     link: '#',
        //     submenu: [
        //         { label: 'Catalog style 1', link: 'catalog.html' },
        //         { label: 'Catalog style 2', link: 'catalog2.html' },
        //         { label: 'Details Movie', link: 'details.html' },
        //         { label: 'Details TV Series', link: 'details2.html' },
        //     ],
        // },
        // { label: 'Pricing plan', link: 'pricing.html', submenu: [] },
        // {
        //     label: 'Pages',
        //     link: '#',
        //     submenu: [
        //         { label: 'About Us', link: 'about.html' },
        //         { label: 'Profile', link: 'profile.html' },
        //         { label: 'Actor', link: 'actor.html' },
        //         { label: 'Contacts', link: 'contacts.html' },
        //         { label: 'Help center', link: 'faq.html' },
        //         { label: 'Privacy policy', link: 'privacy.html' },
        //         { label: 'Admin pages', link: 'https://hotflix.volkovdesign.com/admin/index.html', external: true },
        //     ],
        // },
        // {
        //     label: 'More',
        //     link: '#',
        //     icon: 'ti-dots',
        //     submenu: [
        //         { label: 'Sign in', link: 'signin.html' },
        //         { label: 'Sign up', link: 'signup.html' },
        //         { label: 'Forgot password', link: 'forgot.html' },
        //         { label: '404 Page', link: '404.html' },
        //     ],
        // },
    ];

    

    const toggleHeaderMenu = () => {
        setMenuActive((prev) => !prev);
        if (filterFixedRef.current) {
            filterFixedRef.current.classList.toggle('filter--hidden');
        }
    };

    const toggleSearch = () => {
        setSearchActive((prev) => !prev);
    };







    // 



    



  return (
    
  <>
  {/* Old */}


    {/* Good */}

    <header id="header" className={`header ${theme}`} >
      <div className="container">
          <div className="row">
              <div className="col-12">
                  <div className="header__content">
                      {/* <a href="index.html" className="header__logo">
                          <img src="assets/img/logo.svg" alt="Logo" />
                      </a> */}
                      <NavLink exact to="/" isActive={isActiveFunc}>
                        <LogoHeader theme={theme} />
                      </NavLink>

                      <ul ref={headerNavRef} className={`header__nav ${menuActive ? 'header__nav--active' : ''}`}>
                          {menus.map((menu, index) => (
                              <li className="header__nav-item" key={index}>
                                  <a
                                      className="header__nav-link"
                                      href={menu.link}
                                      role="button"
                                      data-bs-toggle={menu.submenu.length > 0 ? 'dropdown' : undefined}
                                      aria-expanded="false"
                                  >
                                      {menu.label} {menu.submenu.length > 0 && <i className="ti ti-chevron-down" />}
                                  </a>
                                  {menu.submenu.length > 0 && (
                                      <ul className="dropdown-menu header__dropdown-menu">
                                          {menu.submenu.map((item, subIndex) => (
                                              <li key={subIndex}>
                                                  <a href={item.link} target={item.external ? '_blank' : undefined} rel={item.external ? 'noopener noreferrer' : undefined}>
                                                      {item.label}
                                                  </a>
                                              </li>
                                          ))}
                                      </ul>
                                  )}
                              </li>
                          ))}

                          <li className='header__nav-item mobileMenu '>
                            <NavLink exact to="/signIn" isActive={isActiveFunc}>                                                        
                              <a className='header__nav-link' ><i className="ti ti-ghost me-5"  /> Profile</a>
                            </NavLink>
                            </li>
                          <li className='header__nav-item mobileMenu'><a className='header__nav-link' href="#"><i className="ti ti-logout me-5"  /> Déconnexion</a></li>
                          <li className='header__nav-item mobileMenu'>
                            <div className="header__sign-in">
                              <a id="themeToggle" onClick={toggleButton} >
                                  {theme === 'light' ? <div className='btn btn-default px-5 header-btn'><FontAwesomeIcon icon={faMoon} /></div> : <div className='btn btn-default  px-5'><FontAwesomeIcon icon={faSun} /></div>}
                                </a>
                            </div>
                          </li>
                      </ul>

                      <div className="header__auth">
                          <form action="#" className={`header__search ${searchActive ? 'header__search--active' : ''}`}>
                              <input
                                  className="header__search-input"
                                  type="text"
                                  placeholder="Search..."
                                  value={searchTerm}
                                  onChange={handleSearchChange} // Update on input change
                              />
                              <button className="header__search-button" type="button">
                                  <i className="ti ti-search" />
                              </button>
                              <button className="header__search-close" type="button" onClick={toggleSearch}>
                                  <i className="ti ti-x" />
                              </button>
                          </form>
                          <button className="header__search-btn" type="button" onClick={toggleSearch}>
                              <i className="ti ti-search" />
                          </button>

                          {/* Cart Dropdown */}
                          <div className="header__sign-in  mx-2">
                            <a
                              className="header__nav-link"
                              role="button"
                              onClick={toggleCartVisibility}
                            >
                              {/* Replacing "Pannier" with the shopping cart icon */}
                              <FontAwesomeIcon icon={faShoppingCart}  className=''/> 
                              <span className='conpteur-pannier'>
                                {cartItems.reduce((total, item) => total + item.quantity, 0)}
                              </span>
                              
                            </a>
                          </div>

                          <div className="header__sign-in  mx-2 " id='toggletheme'  onClick={toggleButton}>
                            <a  >
                                {theme === 'light' ? <div className='btn btn-default px-5 header-btn d-block mx-auto'><FontAwesomeIcon icon={faMoon} /></div> : <div className='btn btn-default  px-5 d-block mx-auto'><FontAwesomeIcon icon={faSun} /></div>}
                              </a>
                          </div>
                          

                          {/* User Profile Dropdown */}
                          <div className="header__profile  mx-2" id='header__profile'>
                            
                              <a
                                  className="header__sign-in header__sign-in--user px-5 m-0"
                                  href="#"
                                  role="button"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                              >
                                   <FontAwesomeIcon icon={faUser} />
                              </a>
                              
                              
                              <div className="dropdown-menu dropdown-menu-end header__dropdown-menu header__dropdown-menu--user">
                                  
                              {user && user !=null ? (
                                <>
                                  <li>
                                    <NavLink to="/profile">
                                      <i className="ti ti-ghost" />Mes tickets
                                    </NavLink>
                                  </li>
                                  <li><a href="#"><i className="ti ti-logout" /> Deconnexion</a></li>
                                </>
                              ) : (
                                <li>
                                  <NavLink to="/signIn" isActive={isActiveFunc}>
                                    <i className="ti ti-ghost" /> Connexion
                                  </NavLink>
                                </li>
                              )}

                                  {/* <li><a href="profile.html"><i className="ti ti-stereo-glasses" /> Subscription</a></li>
                                  <li><a href="profile.html"><i className="ti ti-bookmark" /> Favorites</a></li>
                                  <li><a href="profile.html"><i className="ti ti-settings" /> Settings</a></li> */}
                                  
                              </div>

                              {/* <ul className="dropdown-menu dropdown-menu-end header__dropdown-menu header__dropdown-menu--user">
                                  <li><a href="profile.html"><i className="ti ti-ghost" /> Profile</a></li>
                                  <li><a href="profile.html"><i className="ti ti-stereo-glasses" /> Subscription</a></li>
                                  <li><a href="profile.html"><i className="ti ti-bookmark" /> Favorites</a></li>
                                  <li><a href="profile.html"><i className="ti ti-settings" /> Settings</a></li>
                                  <li><a href="#"><i className="ti ti-logout" /> Logout</a></li>
                              </ul> */}

                          </div>
                      </div>

                      <button className={`header__btn ${menuActive ? 'header__btn--active' : ''}`} onClick={toggleHeaderMenu} type="button">
                          <span />
                          <span />
                          <span />
                      </button>
                  </div>
              </div>
          </div>
      </div>
      {CartModal} {/* Render the Cart Modal */}
    </header>
  </>
  );
}

export default Header;
