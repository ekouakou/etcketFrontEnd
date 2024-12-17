// src/components/Accueil.js
import React, { useState, useEffect, useContext } from 'react'; // Importation de React et des hooks useState et useEffect
import SliderComponent from'../../AppComponents/Slider/SliderComponent'
import AppHeader from '../../AppComponents/Header/AppHeader'
// import PlanSlider from './plansData'

// src/components/Accueil.js
import { Link } from 'react-router-dom'; // Importation de Link de react-router-dom pour la navigation
import Slider from 'react-slick'; // Importation du composant Slider de react-slick
// import Header from '../components/Header'; // Importation du composant Header
// import Footer from '../components/Footer'; // Importation du composant Header
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faThumbsUp, faThumbsDown, faShare, faEllipsisV, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { fetchEvenements } from '../../services/apiService'; // Importation de la fonction fetchEvenements depuis le fichier apiService
import { HeaderContext } from '../../contexts/HeaderContext'; // Importer le contexte
import { Card, Dropdown, Pagination } from 'react-bootstrap';
import { Modal, Button } from 'react-bootstrap'; // Assurez-vous d'importer Modal depuis react-bootstrap
import { faWhatsapp, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import ExpectedPremiere from './ExpectedPremiere';
import Footer from '../../AppComponents/Footer/Footer';




const urlBaseImage = localStorage.getItem("urlBaseImage");
const fullUrl = localStorage.getItem("fullUrl");
const date = JSON.parse(localStorage.getItem("appDate"));
const mode = JSON.parse(localStorage.getItem("appMode"));



// Slick carousel settings
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3, // Number of cards to show at once
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};



const Accueil = () => {
  const [activitesData, setData] = useState([]);
  const [eventAlaUneData, setEventAlaUneData] = useState([]); 
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);  // Met à jour l'état avec la recherche
  };

  const [isLoading, setIsLoading] = useState(true); // Nouveau state pour le chargement

  useEffect(() => {
    const params = {
      mode: mode.listEvenementFrontMode,
      DT_BEGIN: date.firstDayOfYear, // 1er jour de l'année en cours
      DT_END: date.today, // la date du jour
    };

    fetchEvenements(params)
      .then(response => {
        setData(response.data.data);
        setIsLoading(false); // Terminer le chargement
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoading(false); // Terminer le chargement même en cas d'erreur
      });
  }, []);


  useEffect(() => {
    const params = {
      mode: mode.listNewsEvenementMode,
      DT_BEGIN: date.firstDayOfYear, // 1er jour de l'année en cours
      DT_END: date.today, // la date du jour
    };

    fetchEvenements(params)
      .then(response => {
        setEventAlaUneData(response.data.data);
        setIsLoading(false); // Terminer le chargement
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoading(false); // Terminer le chargement même en cas d'erreur
      });
  }, []);



  const items = [
    {
      title: "I Dream in Another Language",
      image: "assets/img/covers/cover1.jpg",
      rate: 8.4,
      categories: ["Action", "Thriller"],
      link: "details.html",
    },
    {
      title: "Benched",
      image: "assets/img/covers/cover2.jpg",
      rate: 7.1,
      categories: ["Comedy"],
      link: "details.html",
    },
    // Ajoutez d'autres objets d'éléments ici
  ];


  if (isLoading) {
    return <div>Loading...</div>; // Affiche un message de chargement pendant la récupération des données
  }

  const filteredBlocks = Array.isArray(activitesData) ? activitesData.map((activite) => {
    if (!activite.evenements || !Array.isArray(activite.evenements)) return null; // Vérification supplémentaire
  
    const filteredModels = activite.evenements.filter((evenement) =>
      searchTerm
        .toLowerCase()
        .split(/\s+/)
        .some((word) => evenement.STR_EVENAME.toLowerCase().includes(word) || evenement.STR_EVEDESCRIPTION.toLowerCase().includes(word))
    );
  
    return filteredModels.length > 0 ? { ...activite, evenements: filteredModels } : null;
  }).filter((activite) => activite !== null) : [];
  

  return (
    <>
  {/* header */}
  <AppHeader onSearch={handleSearch}  />
  
  <SliderComponent ImagelBaseUrl={urlBaseImage} />

  <ExpectedPremiere ImagelBaseUrl ={urlBaseImage} fullUrl ={fullUrl} data={activitesData} searchTerm={searchTerm}/>

  <Footer />

  <footer className="footer d-none">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="footer__content">
            <a href="index.html" className="footer__logo">
              <img src="assets/img/logo.svg" alt="" />
            </a>
            <span className="footer__copyright">
              © HOTFLIX, 2019—2024 <br /> Create by{" "}
              <a
                href="https://themeforest.net/user/dmitryvolkov/portfolio"
                target="_blank"
              >
                Dmitry Volkov
              </a>
            </span>
            <nav className="footer__nav">
              <a href="about.html">About Us</a>
              <a href="contacts.html">Contacts</a>
              <a href="privacy.html">Privacy policy</a>
            </nav>
            <button className="footer__back" type="button">
              <i className="ti ti-arrow-narrow-up" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </footer>
  {/* end footer */}
  {/* mobile filter */}
  <div className="mfilter">
    <div className="mfilter__head">
      <h6 className="mfilter__title">Filter</h6>
      <button className="mfilter__close" type="button">
        <i className="ti ti-x" />
      </button>
    </div>
    <div className="mfilter__select-wrap">
      <div className="sign__group">
        <select className="filter__select" name="mgenre" id="mfilter__genre">
          <option value={0}>All genres</option>
          <option value={1}>Action/Adventure</option>
          <option value={2}>Animals</option>
          <option value={3}>Animation</option>
          <option value={4}>Biography</option>
          <option value={5}>Comedy</option>
          <option value={6}>Cooking</option>
          <option value={7}>Dance</option>
          <option value={8}>Documentary</option>
          <option value={9}>Drama</option>
          <option value={10}>Education</option>
          <option value={11}>Entertainment</option>
          <option value={12}>Family</option>
          <option value={13}>Fantasy</option>
          <option value={14}>History</option>
          <option value={15}>Horror</option>
          <option value={16}>Independent</option>
          <option value={17}>International</option>
          <option value={18}>Kids</option>
          <option value={19}>Medical</option>
          <option value={20}>Military/War</option>
          <option value={21}>Music</option>
          <option value={22}>Mystery/Crime</option>
          <option value={23}>Nature</option>
          <option value={24}>Paranormal</option>
          <option value={25}>Politics</option>
          <option value={26}>Racing</option>
          <option value={27}>Romance</option>
          <option value={28}>Sci-Fi/Horror</option>
          <option value={29}>Science</option>
          <option value={30}>Science Fiction</option>
          <option value={31}>Science/Nature</option>
          <option value={32}>Spanish</option>
          <option value={33}>Travel</option>
          <option value={34}>Western</option>
        </select>
      </div>
      <div className="sign__group">
        <select
          className="filter__select"
          name="mquality"
          id="mfilter__quality"
        >
          <option value={0}>Any quality</option>
          <option value={1}>HD 1080</option>
          <option value={2}>HD 720</option>
          <option value={3}>DVD</option>
          <option value={4}>TS</option>
        </select>
      </div>
      <div className="sign__group">
        <select className="filter__select" name="mrate" id="mfilter__rate">
          <option value={0}>Any rating</option>
          <option value={1}>from 3.0</option>
          <option value={2}>from 5.0</option>
          <option value={3}>from 7.0</option>
          <option value={4}>Golder Star</option>
        </select>
      </div>
      <div className="sign__group">
        <select className="filter__select" name="msort" id="mfilter__sort">
          <option value={0}>Relevance</option>
          <option value={1}>Newest</option>
          <option value={2}>Oldest</option>
        </select>
      </div>
    </div>
    <button className="mfilter__apply" type="button">
      Apply
    </button>
  </div>
  {/* end mobile filter */}
  {/* plan modal */}
  <div
    className="modal fade"
    id="plan-modal"
    tabIndex={-1}
    aria-labelledby="plan-modal"
    aria-hidden="true"
  >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal__content">
          <button
            className="modal__close"
            type="button"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i className="ti ti-x" />
          </button>
          <form action="#" className="modal__form">
            <h4 className="modal__title">Select plan</h4>
            <div className="sign__group">
              <label htmlFor="fullname" className="sign__label">
                Name
              </label>
              <input
                id="fullname"
                type="text"
                name="name"
                className="sign__input"
                placeholder="Full name"
              />
            </div>
            <div className="sign__group">
              <label htmlFor="email" className="sign__label">
                Email
              </label>
              <input
                id="email"
                type="text"
                name="email"
                className="sign__input"
                placeholder="example@domain.com"
              />
            </div>
            <div className="sign__group">
              <label className="sign__label" htmlFor="value">
                Choose plan:
              </label>
              <select className="sign__select" name="value" id="value">
                <option value={35}>Premium - $34.99</option>
                <option value={50}>Cinematic - $49.99</option>
              </select>
              <span className="sign__text">
                You can spend money from your account on the renewal of the
                connected packages, or to order cars on our website.
              </span>
            </div>
            <div className="sign__group">
              <label className="sign__label">Payment method:</label>
              <ul className="sign__radio">
                <li>
                  <input
                    id="type1"
                    type="radio"
                    name="type"
                    defaultChecked=""
                  />
                  <label htmlFor="type1">Visa</label>
                </li>
                <li>
                  <input id="type2" type="radio" name="type" />
                  <label htmlFor="type2">Mastercard</label>
                </li>
                <li>
                  <input id="type3" type="radio" name="type" />
                  <label htmlFor="type3">Paypal</label>
                </li>
              </ul>
            </div>
            <button type="button" className="sign__btn sign__btn--modal">
              <span>Proceed</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
  {/* end plan modal */}
</>

  );
};

export default Accueil;
