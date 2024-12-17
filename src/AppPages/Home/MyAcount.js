import React, { useState, useEffect } from 'react'; 
import AppHeader from '../../AppComponents/Header/AppHeader';
import Footer from '../../AppComponents/Footer/Footer';
import { useTheme } from '../../contexts/ThemeProvider'; 
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { doConnexion,doDisConnexion, crudData } from '../../services/apiService';
import html2pdf from 'html2pdf.js';




const MyAcount = () => {
    const { theme, toggleTheme } = useTheme(); // Hook pour le thème
    const [background, setBackground] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const urlBaseImage = localStorage.getItem("urlBaseImage");
    const [currentPage, setCurrentPage] = useState(1);
    const ticketsPerPage = 3;
    const [userData, setUserData] = useState(null);
    const [response, setResponse] = useState([]);
    const apiUrl = "TicketManager.php";
    const [showModal, setShowModal] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null); // Nouvel état pour l'élément sélectionné

    const user = JSON.parse(localStorage.getItem('user'));


  useEffect(() => {

    console.log(user);

    if (!user) {
      navigate('/'); // Redirige vers la page d'accueil si l'utilisateur est vide
    } else {
      setUserData(user);
    }
  }, [navigate]);

  useEffect(() => {
    if (userData && userData.STR_CLILOGIN) { // Vérifiez que userData et UTITOKEN sont définis
      fetchData({ mode: 'listTicket', LG_CLIID: userData.STR_CLITOKEN, DT_BEGIN: "2024-01-01", DT_END: "2024-10-06" }, apiUrl, setResponse);
    }
  }, [userData, apiUrl]);

  const fetchData = (params, url, setData) => {
    crudData(params, url)
      .then(response => {
        setData(response.data.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
      });
  };




  const handleEditClick = (ticket) => {
    setSelectedTicket(ticket); // Mettez à jour l'état avec l'élément cliqué
    setShowModal(true);
  };

  const handleExportPdf = () => {
    const element = document.getElementById('ticket-details');
    html2pdf(element);
  };


  const generateWhatsAppLink = () => {
    if (!selectedTicket) return '';
    const ticketName = encodeURIComponent(selectedTicket.STR_EVENAME);
    const ticketDate = encodeURIComponent(selectedTicket.DT_EVENT);
    const ticketUrl = encodeURIComponent("http://guineeticket.com/?id="+ticketName); // Ou un lien direct vers l'affichage du ticket en ligne
    //const ticketUrl = encodeURIComponent(window.location.href+"?id="+selectedTicket.DT_EVENT); // Ou un lien direct vers l'affichage du ticket en ligne
    const message = `Check out this event: *${ticketName}* on ${ticketDate}. View your ticket here: ${ticketUrl}`;
    return `https://wa.me/?text=${message}`;
  };






// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++





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


    const handleLogout = async () => {
        try {
          const params = new URLSearchParams();
          params.append('mode', 'doDisConnexion');
          params.append('STR_CLITOKEN', user?.STR_CLITOKEN);
    
          await doDisConnexion(params);
          localStorage.removeItem('user');
          setUserData(null);
          navigate('/'); // Rediriger vers la page d'accueil ou la page de connexion
        } catch (error) {
          console.error('Erreur de déconnexion:', error);
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
                    {/* section title */}
                    <h1 className="section__title section__title--head text-theme">Mon compte</h1>
                    {/* end section title */}
                    {/* breadcrumbs */}
                    {/* <ul className="breadcrumbs">
                    <li className="breadcrumbs__item">
                        <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumbs__item breadcrumbs__item--active ">
                        Profile
                    </li>
                    </ul> */}
                    {/* end breadcrumbs */}
                </div>
                </div>
            </div>
            </div>
        </section>
        {/* end page title */}
        {/* content */}
        <div className="content">
            {/* profile */}
            <div className="profile">
            <div className="container">
                <div className="row">
                <div className="col-12">
                    <div className="profile__content">
                    <div className="profile__user">
                        <div className="profile__avatar">
                        <img src="img/user.svg" alt="" />
                        </div>
                        <div className="profile__meta ">
                        <h3 className='text-theme'>John Doe</h3>
                        <span>HOTFLIX ID: 78123</span>
                        </div>
                    </div>
                    {/* content tabs nav */}
                    <ul
                        className="nav nav-tabs content__tabs content__tabs--profile"
                        id="content__tabs"
                        role="tablist"
                    >
                        <li className="nav-item" role="presentation">
                        <button
                            id="1-tab"
                            className="active"
                            data-bs-toggle="tab"
                            data-bs-target="#tab-1"
                            type="button"
                            role="tab"
                            aria-controls="tab-1"
                            aria-selected="true"
                        >
                            Profile
                        </button>
                        </li>
                        {/* <li className="nav-item" role="presentation">
                        <button
                            id="2-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#tab-2"
                            type="button"
                            role="tab"
                            aria-controls="tab-2"
                            aria-selected="false"
                        >
                            Subs
                        </button>
                        </li> */}
                        {/* <li className="nav-item" role="presentation">
                        <button
                            id="3-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#tab-3"
                            type="button"
                            role="tab"
                            aria-controls="tab-3"
                            aria-selected="false"
                        >
                            Favorites
                        </button>
                        </li> */}
                        <li className="nav-item" role="presentation">
                        <button
                            id="4-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#tab-4"
                            type="button"
                            role="tab"
                            aria-controls="tab-4"
                            aria-selected="false"
                        >
                            Settings
                        </button>
                        </li>
                    </ul>
                    {/* end content tabs nav */}
                    {/* logout */}
                    <button className="profile__logout" type="button" onClick={handleLogout}>
                        <i className="ti ti-logout" />
                        <span>Déconnexion</span>
                    </button>
                    {/* end logout */}
                    </div>
                </div>
                </div>
            </div>
            </div>
            {/* end profile */}
            <div className="container">
            {/* content tabs */}
            <div className="tab-content">
                <div
                className="tab-pane fade show active"
                id="tab-1"
                role="tabpanel"
                aria-labelledby="1-tab"
                tabIndex={0}
                >
                <div className="row">
                    {/* stats */}
                    <div className="col-12 col-md-6 col-xl-3">
                    <div className="stats">
                        <span>Premium plan</span>
                        <p>$34.99 / month</p>
                        <i className="ti ti-credit-card" />
                    </div>
                    </div>
                    {/* end stats */}
                    {/* stats */}
                    <div className="col-12 col-md-6 col-xl-3">
                    <div className="stats">
                        <span>Films watched</span>
                        <p>1 678</p>
                        <i className="ti ti-movie" />
                    </div>
                    </div>
                    {/* end stats */}
                    {/* stats */}
                    <div className="col-12 col-md-6 col-xl-3">
                    <div className="stats">
                        <span>Your comments</span>
                        <p>2 573</p>
                        <i className="ti ti-message-circle" />
                    </div>
                    </div>
                    {/* end stats */}
                    {/* stats */}
                    <div className="col-12 col-md-6 col-xl-3">
                    <div className="stats">
                        <span>Your reviews</span>
                        <p>1 021</p>
                        <i className="ti ti-star-half-filled" />
                    </div>
                    </div>
                    {/* end stats */}
                </div>
                <div className="row">
                    {/* dashbox */}
                    <div className="col-12 col-xl-6">
                    <div className="dashbox">
                        <div className="dashbox__title">
                        <h3>
                            <i className="ti ti-movie" /> Movies for you
                        </h3>
                        <div className="dashbox__wrap">
                            <a className="dashbox__refresh" href="#">
                            <i className="ti ti-refresh" />
                            </a>
                            <a className="dashbox__more" href="catalog.html">
                            View All
                            </a>
                        </div>
                        </div>
                        <div className="dashbox__table-wrap dashbox__table-wrap--1">
                        <table className="dashbox__table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>TITLE</th>
                                <th>CATEGORY</th>
                                <th>RATING</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                <div className="dashbox__table-text dashbox__table-text--grey">
                                    241
                                </div>
                                </td>
                                <td>
                                <div className="dashbox__table-text">
                                    <a href="details.html">The Lost City</a>
                                </div>
                                </td>
                                <td>
                                <div className="dashbox__table-text">Movie</div>
                                </td>
                                <td>
                                <div className="dashbox__table-text dashbox__table-text--rate">
                                    <i className="ti ti-star" /> 9.2
                                </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div
                className="tab-pane fade d-none"
                id="tab-2"
                role="tabpanel"
                aria-labelledby="2-tab"
                tabIndex={0}
                >
                <div className="row">
                    {/* plan */}
                    <div className="col-12 col-md-6 col-lg-4 order-md-2 order-lg-1">
                    <div className="plan plan--active">
                        <h3 className="plan__title">Basic</h3>
                        <span className="plan__price">Free</span>
                        <ul className="plan__list">
                        <li className="plan__item">
                            <i className="ti ti-circle-check" /> 7 days
                        </li>
                        <li className="plan__item">
                            <i className="ti ti-circle-check" /> 720p Resolution
                        </li>
                        <li className="plan__item plan__item--none">
                            <i className="ti ti-circle-minus" /> Limited Availability
                        </li>
                        <li className="plan__item plan__item--none">
                            <i className="ti ti-circle-minus" /> Desktop Only
                        </li>
                        <li className="plan__item plan__item--none">
                            <i className="ti ti-circle-minus" /> Limited Support
                        </li>
                        </ul>
                        <a href="signin.html" className="plan__btn">
                        Current plan
                        </a>
                    </div>
                    </div>
                    {/* end plan */}
                    {/* plan */}
                    <div className="col-12 col-md-12 col-lg-4 order-md-1 order-lg-2">
                    <div className="plan plan--orange">
                        <h3 className="plan__title">Premium</h3>
                        <span className="plan__price">
                        $34.99 <sub>/ month</sub>
                        </span>
                        <ul className="plan__list">
                        <li className="plan__item">
                            <i className="ti ti-circle-check" /> 1 Month
                        </li>
                        <li className="plan__item">
                            <i className="ti ti-circle-check" /> Full HD
                        </li>
                        <li className="plan__item">
                            <i className="ti ti-circle-check" /> Limited Availability
                        </li>
                        <li className="plan__item plan__item--none">
                            <i className="ti ti-circle-minus" /> TV &amp; Desktop
                        </li>
                        <li className="plan__item plan__item--none">
                            <i className="ti ti-circle-minus" /> 24/7 Support
                        </li>
                        </ul>
                        <button
                        className="plan__btn"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#plan-modal"
                        >
                        Choose Plan
                        </button>
                    </div>
                    </div>
                    {/* end plan */}
                    {/* plan */}
                    <div className="col-12 col-md-6 col-lg-4 order-md-3">
                    <div className="plan plan--red">
                        <h3 className="plan__title">Cinematic</h3>
                        <span className="plan__price">
                        $49.99 <sub>/ month</sub>
                        </span>
                        <ul className="plan__list">
                        <li className="plan__item">
                            <i className="ti ti-circle-check" /> 2 Months
                        </li>
                        <li className="plan__item">
                            <i className="ti ti-circle-check" /> Ultra HD
                        </li>
                        <li className="plan__item">
                            <i className="ti ti-circle-check" /> Limited Availability
                        </li>
                        <li className="plan__item">
                            <i className="ti ti-circle-check" /> Any Device
                        </li>
                        <li className="plan__item">
                            <i className="ti ti-circle-check" /> 24/7 Support
                        </li>
                        </ul>
                        <button
                        className="plan__btn"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#plan-modal"
                        >
                        Choose Plan
                        </button>
                    </div>
                    </div>
                    {/* end plan */}
                </div>
                </div>
                <div
                className="tab-pane fade d-none"
                id="tab-3"
                role="tabpanel"
                aria-labelledby="3-tab"
                tabIndex={0}
                >
                <div className="row">
                    {/* item */}
                    <div className="col-6 col-sm-4 col-lg-3 col-xl-2">
                    <div className="item">
                        <div className="item__cover">
                        <img src="img/covers/cover.jpg" alt="" />
                        <a href="details.html" className="item__play">
                            <i className="ti ti-player-play-filled" />
                        </a>
                        <span className="item__rate item__rate--green">8.4</span>
                        <button
                            className="item__favorite item__favorite--active"
                            type="button"
                        >
                            <i className="ti ti-bookmark" />
                        </button>
                        </div>
                        <div className="item__content">
                        <h3 className="item__title">
                            <a href="details.html">I Dream in Another Language</a>
                        </h3>
                        <span className="item__category">
                            <a href="#">Action</a>
                            <a href="#">Triler</a>
                        </span>
                        </div>
                    </div>
                    </div>
                    {/* end item */}
                    {/* item */}
                    <div className="col-6 col-sm-4 col-lg-3 col-xl-2">
                    <div className="item">
                        <div className="item__cover">
                        <img src="img/covers/cover2.jpg" alt="" />
                        <a href="details.html" className="item__play">
                            <i className="ti ti-player-play-filled" />
                        </a>
                        <span className="item__rate item__rate--green">7.1</span>
                        <button
                            className="item__favorite item__favorite--active"
                            type="button"
                        >
                            <i className="ti ti-bookmark" />
                        </button>
                        </div>
                        <div className="item__content">
                        <h3 className="item__title">
                            <a href="details.html">Benched</a>
                        </h3>
                        <span className="item__category">
                            <a href="#">Comedy</a>
                        </span>
                        </div>
                    </div>
                    </div>
                    {/* end item */}
                    {/* item */}
                    <div className="col-6 col-sm-4 col-lg-3 col-xl-2">
                    <div className="item">
                        <div className="item__cover">
                        <img src="img/covers/cover3.jpg" alt="" />
                        <a href="details.html" className="item__play">
                            <i className="ti ti-player-play-filled" />
                        </a>
                        <span className="item__rate item__rate--red">6.3</span>
                        <button
                            className="item__favorite item__favorite--active"
                            type="button"
                        >
                            <i className="ti ti-bookmark" />
                        </button>
                        </div>
                        <div className="item__content">
                        <h3 className="item__title">
                            <a href="details.html">Whitney</a>
                        </h3>
                        <span className="item__category">
                            <a href="#">Romance</a>
                            <a href="#">Drama</a>
                            <a href="#">Music</a>
                        </span>
                        </div>
                    </div>
                    </div>
                    {/* end item */}
                    {/* item */}
                    <div className="col-6 col-sm-4 col-lg-3 col-xl-2">
                    <div className="item">
                        <div className="item__cover">
                        <img src="img/covers/cover4.jpg" alt="" />
                        <a href="details.html" className="item__play">
                            <i className="ti ti-player-play-filled" />
                        </a>
                        <span className="item__rate item__rate--yellow">6.9</span>
                        <button
                            className="item__favorite item__favorite--active"
                            type="button"
                        >
                            <i className="ti ti-bookmark" />
                        </button>
                        </div>
                        <div className="item__content">
                        <h3 className="item__title">
                            <a href="details.html">Blindspotting</a>
                        </h3>
                        <span className="item__category">
                            <a href="#">Comedy</a>
                            <a href="#">Drama</a>
                        </span>
                        </div>
                    </div>
                    </div>
                    {/* end item */}
                    {/* item */}
                    <div className="col-6 col-sm-4 col-lg-3 col-xl-2">
                    <div className="item">
                        <div className="item__cover">
                        <img src="img/covers/cover5.jpg" alt="" />
                        <a href="details.html" className="item__play">
                            <i className="ti ti-player-play-filled" />
                        </a>
                        <span className="item__rate item__rate--green">8.4</span>
                        <button
                            className="item__favorite item__favorite--active"
                            type="button"
                        >
                            <i className="ti ti-bookmark" />
                        </button>
                        </div>
                        <div className="item__content">
                        <h3 className="item__title">
                            <a href="details.html">I Dream in Another Language</a>
                        </h3>
                        <span className="item__category">
                            <a href="#">Action</a>
                            <a href="#">Triler</a>
                        </span>
                        </div>
                    </div>
                    </div>
                    {/* end item */}
                    {/* item */}
                    <div className="col-6 col-sm-4 col-lg-3 col-xl-2">
                    <div className="item">
                        <div className="item__cover">
                        <img src="img/covers/cover6.jpg" alt="" />
                        <a href="details.html" className="item__play">
                            <i className="ti ti-player-play-filled" />
                        </a>
                        <span className="item__rate item__rate--green">7.1</span>
                        <button
                            className="item__favorite item__favorite--active"
                            type="button"
                        >
                            <i className="ti ti-bookmark" />
                        </button>
                        </div>
                        <div className="item__content">
                        <h3 className="item__title">
                            <a href="details.html">Benched</a>
                        </h3>
                        <span className="item__category">
                            <a href="#">Comedy</a>
                        </span>
                        </div>
                    </div>
                    </div>
                    {/* end item */}
                    {/* item */}
                    <div className="col-6 col-sm-4 col-lg-3 col-xl-2">
                    <div className="item">
                        <div className="item__cover">
                        <img src="img/covers/cover7.jpg" alt="" />
                        <a href="details.html" className="item__play">
                            <i className="ti ti-player-play-filled" />
                        </a>
                        <span className="item__rate item__rate--green">7.1</span>
                        <button
                            className="item__favorite item__favorite--active"
                            type="button"
                        >
                            <i className="ti ti-bookmark" />
                        </button>
                        </div>
                        <div className="item__content">
                        <h3 className="item__title">
                            <a href="details.html">Benched</a>
                        </h3>
                        <span className="item__category">
                            <a href="#">Comedy</a>
                        </span>
                        </div>
                    </div>
                    </div>
                    {/* end item */}
                    {/* item */}
                    <div className="col-6 col-sm-4 col-lg-3 col-xl-2">
                    <div className="item">
                        <div className="item__cover">
                        <img src="img/covers/cover8.jpg" alt="" />
                        <a href="details.html" className="item__play">
                            <i className="ti ti-player-play-filled" />
                        </a>
                        <span className="item__rate item__rate--red">5.5</span>
                        <button
                            className="item__favorite item__favorite--active"
                            type="button"
                        >
                            <i className="ti ti-bookmark" />
                        </button>
                        </div>
                        <div className="item__content">
                        <h3 className="item__title">
                            <a href="details.html">I Dream in Another Language</a>
                        </h3>
                        <span className="item__category">
                            <a href="#">Action</a>
                            <a href="#">Triler</a>
                        </span>
                        </div>
                    </div>
                    </div>
                    {/* end item */}
                    {/* item */}
                    <div className="col-6 col-sm-4 col-lg-3 col-xl-2">
                    <div className="item">
                        <div className="item__cover">
                        <img src="img/covers/cover9.jpg" alt="" />
                        <a href="details.html" className="item__play">
                            <i className="ti ti-player-play-filled" />
                        </a>
                        <span className="item__rate item__rate--yellow">6.7</span>
                        <button
                            className="item__favorite item__favorite--active"
                            type="button"
                        >
                            <i className="ti ti-bookmark" />
                        </button>
                        </div>
                        <div className="item__content">
                        <h3 className="item__title">
                            <a href="details.html">Blindspotting</a>
                        </h3>
                        <span className="item__category">
                            <a href="#">Comedy</a>
                            <a href="#">Drama</a>
                        </span>
                        </div>
                    </div>
                    </div>
                    {/* end item */}
                    {/* item */}
                    <div className="col-6 col-sm-4 col-lg-3 col-xl-2">
                    <div className="item">
                        <div className="item__cover">
                        <img src="img/covers/cover10.jpg" alt="" />
                        <a href="details.html" className="item__play">
                            <i className="ti ti-player-play-filled" />
                        </a>
                        <span className="item__rate item__rate--red">5.6</span>
                        <button
                            className="item__favorite item__favorite--active"
                            type="button"
                        >
                            <i className="ti ti-bookmark" />
                        </button>
                        </div>
                        <div className="item__content">
                        <h3 className="item__title">
                            <a href="details.html">Whitney</a>
                        </h3>
                        <span className="item__category">
                            <a href="#">Romance</a>
                            <a href="#">Drama</a>
                            <a href="#">Music</a>
                        </span>
                        </div>
                    </div>
                    </div>
                    {/* end item */}
                    {/* item */}
                    <div className="col-6 col-sm-4 col-lg-3 col-xl-2">
                    <div className="item">
                        <div className="item__cover">
                        <img src="img/covers/cover11.jpg" alt="" />
                        <a href="details.html" className="item__play">
                            <i className="ti ti-player-play-filled" />
                        </a>
                        <span className="item__rate item__rate--green">9.2</span>
                        <button
                            className="item__favorite item__favorite--active"
                            type="button"
                        >
                            <i className="ti ti-bookmark" />
                        </button>
                        </div>
                        <div className="item__content">
                        <h3 className="item__title">
                            <a href="details.html">Benched</a>
                        </h3>
                        <span className="item__category">
                            <a href="#">Comedy</a>
                        </span>
                        </div>
                    </div>
                    </div>
                    {/* end item */}
                    {/* item */}
                    <div className="col-6 col-sm-4 col-lg-3 col-xl-2">
                    <div className="item">
                        <div className="item__cover">
                        <img src="img/covers/cover12.jpg" alt="" />
                        <a href="details.html" className="item__play">
                            <i className="ti ti-player-play-filled" />
                        </a>
                        <span className="item__rate item__rate--green">8.4</span>
                        <button
                            className="item__favorite item__favorite--active"
                            type="button"
                        >
                            <i className="ti ti-bookmark" />
                        </button>
                        </div>
                        <div className="item__content">
                        <h3 className="item__title">
                            <a href="details.html">I Dream in Another Language</a>
                        </h3>
                        <span className="item__category">
                            <a href="#">Action</a>
                            <a href="#">Triler</a>
                        </span>
                        </div>
                    </div>
                    </div>
                    {/* end item */}
                    {/* item */}
                    <div className="col-6 col-sm-4 col-lg-3 col-xl-2">
                    <div className="item">
                        <div className="item__cover">
                        <img src="img/covers/cover13.jpg" alt="" />
                        <a href="details.html" className="item__play">
                            <i className="ti ti-player-play-filled" />
                        </a>
                        <span className="item__rate item__rate--green">8.0</span>
                        <button
                            className="item__favorite item__favorite--active"
                            type="button"
                        >
                            <i className="ti ti-bookmark" />
                        </button>
                        </div>
                        <div className="item__content">
                        <h3 className="item__title">
                            <a href="details.html">I Dream in Another Language</a>
                        </h3>
                        <span className="item__category">
                            <a href="#">Action</a>
                            <a href="#">Triler</a>
                        </span>
                        </div>
                    </div>
                    </div>
                    {/* end item */}
                    {/* item */}
                    <div className="col-6 col-sm-4 col-lg-3 col-xl-2">
                    <div className="item">
                        <div className="item__cover">
                        <img src="img/covers/cover14.jpg" alt="" />
                        <a href="details.html" className="item__play">
                            <i className="ti ti-player-play-filled" />
                        </a>
                        <span className="item__rate item__rate--green">7.2</span>
                        <button
                            className="item__favorite item__favorite--active"
                            type="button"
                        >
                            <i className="ti ti-bookmark" />
                        </button>
                        </div>
                        <div className="item__content">
                        <h3 className="item__title">
                            <a href="details.html">Benched</a>
                        </h3>
                        <span className="item__category">
                            <a href="#">Comedy</a>
                        </span>
                        </div>
                    </div>
                    </div>
                    {/* end item */}
                    {/* item */}
                    <div className="col-6 col-sm-4 col-lg-3 col-xl-2">
                    <div className="item">
                        <div className="item__cover">
                        <img src="img/covers/cover15.jpg" alt="" />
                        <a href="details.html" className="item__play">
                            <i className="ti ti-player-play-filled" />
                        </a>
                        <span className="item__rate item__rate--yellow">5.9</span>
                        <button
                            className="item__favorite item__favorite--active"
                            type="button"
                        >
                            <i className="ti ti-bookmark" />
                        </button>
                        </div>
                        <div className="item__content">
                        <h3 className="item__title">
                            <a href="details.html">Whitney</a>
                        </h3>
                        <span className="item__category">
                            <a href="#">Romance</a>
                            <a href="#">Drama</a>
                            <a href="#">Music</a>
                        </span>
                        </div>
                    </div>
                    </div>
                    {/* end item */}
                    {/* item */}
                    <div className="col-6 col-sm-4 col-lg-3 col-xl-2">
                    <div className="item">
                        <div className="item__cover">
                        <img src="img/covers/cover16.jpg" alt="" />
                        <a href="details.html" className="item__play">
                            <i className="ti ti-player-play-filled" />
                        </a>
                        <span className="item__rate item__rate--green">8.3</span>
                        <button
                            className="item__favorite item__favorite--active"
                            type="button"
                        >
                            <i className="ti ti-bookmark" />
                        </button>
                        </div>
                        <div className="item__content">
                        <h3 className="item__title">
                            <a href="details.html">Blindspotting</a>
                        </h3>
                        <span className="item__category">
                            <a href="#">Comedy</a>
                            <a href="#">Drama</a>
                        </span>
                        </div>
                    </div>
                    </div>
                    {/* end item */}
                    {/* item */}
                    <div className="col-6 col-sm-4 col-lg-3 col-xl-2">
                    <div className="item">
                        <div className="item__cover">
                        <img src="img/covers/cover17.jpg" alt="" />
                        <a href="details.html" className="item__play">
                            <i className="ti ti-player-play-filled" />
                        </a>
                        <span className="item__rate item__rate--green">8.0</span>
                        <button
                            className="item__favorite item__favorite--active"
                            type="button"
                        >
                            <i className="ti ti-bookmark" />
                        </button>
                        </div>
                        <div className="item__content">
                        <h3 className="item__title">
                            <a href="details.html">I Dream in Another Language</a>
                        </h3>
                        <span className="item__category">
                            <a href="#">Action</a>
                            <a href="#">Triler</a>
                        </span>
                        </div>
                    </div>
                    </div>
                    {/* end item */}
                    {/* item */}
                    <div className="col-6 col-sm-4 col-lg-3 col-xl-2">
                    <div className="item">
                        <div className="item__cover">
                        <img src="img/covers/cover18.jpg" alt="" />
                        <a href="details.html" className="item__play">
                            <i className="ti ti-player-play-filled" />
                        </a>
                        <span className="item__rate item__rate--green">7.1</span>
                        <button
                            className="item__favorite item__favorite--active"
                            type="button"
                        >
                            <i className="ti ti-bookmark" />
                        </button>
                        </div>
                        <div className="item__content">
                        <h3 className="item__title">
                            <a href="details.html">Benched</a>
                        </h3>
                        <span className="item__category">
                            <a href="#">Comedy</a>
                        </span>
                        </div>
                    </div>
                    </div>
                    {/* end item */}
                </div>
                <div className="row">
                    {/* paginator */}
                    <div className="col-12">
                    {/* paginator mobile */}
                    <div className="paginator-mob">
                        <span className="paginator-mob__pages">18 of 1713</span>
                        <ul className="paginator-mob__nav">
                        <li>
                            <a href="#">
                            <i className="ti ti-chevron-left" />
                            <span>Prev</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                            <span>Next</span>
                            <i className="ti ti-chevron-right" />
                            </a>
                        </li>
                        </ul>
                    </div>
                    {/* end paginator mobile */}
                    {/* paginator desktop */}
                    <ul className="paginator">
                        <li className="paginator__item paginator__item--prev">
                        <a href="#">
                            <i className="ti ti-chevron-left" />
                        </a>
                        </li>
                        <li className="paginator__item">
                        <a href="#">1</a>
                        </li>
                        <li className="paginator__item paginator__item--active">
                        <a href="#">2</a>
                        </li>
                        <li className="paginator__item">
                        <a href="#">3</a>
                        </li>
                        <li className="paginator__item">
                        <a href="#">4</a>
                        </li>
                        <li className="paginator__item">
                        <span>...</span>
                        </li>
                        <li className="paginator__item">
                        <a href="#">87</a>
                        </li>
                        <li className="paginator__item paginator__item--next">
                        <a href="#">
                            <i className="ti ti-chevron-right" />
                        </a>
                        </li>
                    </ul>
                    {/* end paginator desktop */}
                    </div>
                    {/* end paginator */}
                </div>
                </div>
                <div
                className="tab-pane fade"
                id="tab-4"
                role="tabpanel"
                aria-labelledby="4-tab"
                tabIndex={0}
                >
                <div className="row">
                    {/* details form */}
                    <div className="col-12 col-lg-6">
                    <form action="#" className="sign__form sign__form--full">
                        <div className="row">
                        <div className="col-12">
                            <h4 className="sign__title">Profile details</h4>
                        </div>
                        <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                            <div className="sign__group">
                            <label className="sign__label" htmlFor="username">
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                name="username"
                                className="sign__input"
                                placeholder="User 123"
                            />
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                            <div className="sign__group">
                            <label className="sign__label" htmlFor="email">
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
                        <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                            <div className="sign__group">
                            <label className="sign__label" htmlFor="fname">
                                Name
                            </label>
                            <input
                                id="fname"
                                type="text"
                                name="fname"
                                className="sign__input"
                                placeholder="John Doe"
                            />
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                            <div className="sign__group">
                            <label
                                className="sign__label"
                                htmlFor="sign__gallery-upload"
                            >
                                Avatar
                            </label>
                            <div className="sign__gallery">
                                <label id="gallery1" htmlFor="sign__gallery-upload">
                                Upload (40x40)
                                </label>
                                <input
                                data-name="#gallery1"
                                id="sign__gallery-upload"
                                name="gallery"
                                className="sign__gallery-upload"
                                type="file"
                                accept=".png, .jpg, .jpeg"
                                multiple=""
                                />
                            </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <button
                            className="sign__btn sign__btn--small"
                            type="button"
                            >
                            Save
                            </button>
                        </div>
                        </div>
                    </form>
                    </div>
                    {/* end details form */}
                    {/* password form */}
                    <div className="col-12 col-lg-6">
                    <form action="#" className="sign__form sign__form--full">
                        <div className="row">
                        <div className="col-12">
                            <h4 className="sign__title">Change password</h4>
                        </div>
                        <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                            <div className="sign__group">
                            <label className="sign__label" htmlFor="oldpass">
                                Old password
                            </label>
                            <input
                                id="oldpass"
                                type="password"
                                name="oldpass"
                                className="sign__input"
                            />
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                            <div className="sign__group">
                            <label className="sign__label" htmlFor="newpass">
                                New password
                            </label>
                            <input
                                id="newpass"
                                type="password"
                                name="newpass"
                                className="sign__input"
                            />
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                            <div className="sign__group">
                            <label className="sign__label" htmlFor="confirmpass">
                                Confirm new password
                            </label>
                            <input
                                id="confirmpass"
                                type="password"
                                name="confirmpass"
                                className="sign__input"
                            />
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                            <div className="sign__group">
                            <label className="sign__label" htmlFor="select">
                                Select
                            </label>
                            <select
                                name="select"
                                id="select"
                                className="sign__select"
                            >
                                <option value={0}>Option</option>
                                <option value={1}>Option 2</option>
                                <option value={2}>Option 3</option>
                                <option value={3}>Option 4</option>
                            </select>
                            </div>
                        </div>
                        <div className="col-12">
                            <button
                            className="sign__btn sign__btn--small"
                            type="button"
                            >
                            Change
                            </button>
                        </div>
                        </div>
                    </form>
                    </div>
                    {/* end password form */}
                </div>
                </div>
            </div>
            {/* end content tabs */}
            </div>
        </div>
        {/* end content */}
      </>

      <Footer />
    </>
  );
};

export default MyAcount;
