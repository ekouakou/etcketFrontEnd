import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClock, faMapMarkerAlt, faTags } from '@fortawesome/free-solid-svg-icons';



const urlBaseImage = localStorage.getItem("urlBaseImage");


const DetailHeader = ({ evenement, onDatePassedUpdate }) => {
    const [countdown, setCountdown] = useState('');
    const [countJour, setCountJour] = useState('');
    const [countHeure, setCountHeure] = useState('');
    const [countMinute, setCountMinute] = useState('');
    const [countSeconde, setCountSeconde] = useState('');

    useEffect(() => {
        if (!evenement) return; // Protection contre evenement null/undefined
        if (Array.isArray(evenement)) {
            evenement.forEach((evt) => startCountdown(evt));
        } else if (evenement) {
            startCountdown(evenement);
        }
    }, [evenement]);

    const startCountdown = (evt) => {
        if (!evt || !evt.DT_EVEBEGIN || !evt.HR_EVEBEGIN){
            setCountJour("0");
                    setCountHeure("00");
                    setCountMinute("00");
                    setCountSeconde("00");
            return
        } else{
            const interval = setInterval(() => {
                const [day, month, year] = evt.DT_EVEBEGIN.split('/');
                const [hours, minutes] = evt.HR_EVEBEGIN.split(':');
                const eventDate = new Date(year, month - 1, day, hours, minutes);
    
                const now = new Date();
                const difference = eventDate - now;
    
                if (difference > 0) {
                    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                    const minutes = Math.floor((difference / 1000 / 60) % 60);
                    const seconds = Math.floor((difference / 1000) % 60);
    
                    setCountJour(days);
                    setCountHeure(hours);
                    setCountMinute(minutes);
                    setCountSeconde(seconds);
    
                    setCountdown(`${days} Jour -${hours} H-${minutes}:${seconds}s`);
                    
                    // Appeler la fonction de rappel pour mettre à jour les valeurs dans le parent
                } else {
                    setCountdown("L'événement a commencé !");
                    setCountJour("0");
                    setCountHeure("00");
                    setCountMinute("00");
                    setCountSeconde("00");
                    clearInterval(interval);
    
                    onDatePassedUpdate(true); // Passer true si l'événement a commencé
    
    
                }
            }, 1000);
    
            return () => clearInterval(interval);
        } // Protection supplémentaire

        
    };


    const isDatePassed = (dateString, timeString) => {
        if (!dateString || !timeString) return false; // Protection contre les valeurs null/undefined

        // Créer un objet Date à partir de la chaîne de date et d'heure
        const dateParts = dateString.split('/');
        const timeParts = timeString.split(':');
    
        // Construire un nouvel objet Date (année, mois, jour, heure, minute)
        const eventDate = new Date(
            parseInt(dateParts[2]), // année
            parseInt(dateParts[1]) - 1, // mois (0-11)
            parseInt(dateParts[0]), // jour
            parseInt(timeParts[0]), // heure
            parseInt(timeParts[1]) // minute
        );
    
        // Comparer l'heure actuelle à la date de l'événement
        return eventDate < new Date(); // retourne true si la date est passée
    };

    const datePassed = isDatePassed(evenement.DT_EVEBEGIN, evenement.HR_EVEBEGIN);
    onDatePassedUpdate(datePassed); // Mettre à jour `datePassed` dès le rendu




    return (
        <div id='detail-header'>
            {/* <section className="details-banner bg_img" style={{ backgroundImage: `url(${evenement.STR_EVEBANNER})`, backgroundSize: "cover", backgroundPosition: "center" }}> */}
            <section className="details-banner bg_img" style={{
                //backgroundImage: evenement.STR_EVEPIC === "assets/media/eventpicture/" ? `url(${evenement.STR_EVEPIC})` : `url(${evenement.STR_EVEBANNER})`,
                backgroundImage:`url(${urlBaseImage + evenement.STR_EVEPIC})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                
                }}>
                <div className="container  banner-heightbook-sections">
                <img className='card mb-6 img-fluid w-100 h-100 '  style={{maxHeight:500}} src={urlBaseImage + evenement.STR_EVEPIC} alt={evenement.STR_EVEPIC} />
                </div>
            </section>

            <div className=' bg-white'>
                <section className="book-sections bg-white">
                    <div className="container">
                        <div id='headerbottom' class="book-wrapper py-7 flex-stack">
                            {/* <div class="">
                                <div className="text-center mb-1">

                                    <NavLink className="btn btn-sm btn-primary me-2" to={first_btn.link}>
                                        {first_btn.name}
                                    </NavLink>
                                    {cartItems.length > 0 && (
                                        <NavLink className="btn btn-sm btn-light me-2" to={second_btn.link}>
                                            {second_btn.name}
                                        </NavLink>
                                    )}
                                </div>
                            </div> */}
                            <div>
                                <div className="social-and-duration ">
                                <h2 id='event-name-desktop' className="titles detail-title truncate-2-lines text-theme">{evenement.STR_EVENAME}</h2>
                                    <div class="duration-area d-flex align-items-center">
                                        <a className={`p-3 badge me-5 me-xl-13 ${
                                            !datePassed ? (evenement.STR_EVESTATUTFREE == 1 
                                                ? 'badge-danger ' // Payant
                                                : 'badge-success') // Gratuit
                                            : 'badge-warning' // Terminé ou valeurs incorrectes
                                        }`}
                                        >
                                        {
                                        !datePassed ? (evenement.STR_EVESTATUTFREE == 1 
                                                ? 'Payant' 
                                                : 'Gratuit')
                                            : 'Terminé'
                                        }
                                        </a>
                                        <div className="d-flex align-items-center me-5 me-xl-13">
                                            {/* Icone Date */}
                                            <div className="symbol symbol-30px symbol-circle me-3">
                                                <span className="symbol-label bg-info-subtle">
                                                    <FontAwesomeIcon icon={faCalendar} className="fs-5 text-info" />
                                                </span>
                                            </div>
                                            <div className="m-0">
                                                <span className="fw-semibold text-gray-500 d-block fs-8">Date début</span>
                                                <a  className="fw-bold text-gray-800 text-hover-primary fs-7 text-theme">
                                                    {evenement.DT_EVEBEGIN}
                                                </a>
                                            </div>
                                        </div>

                                        <div className="d-flex align-items-center me-5 me-xl-13">
                                            {/* Icone Heure */}
                                            <div className="symbol symbol-30px symbol-circle me-3">
                                                <span className="symbol-label bg-info-subtle">
                                                    <FontAwesomeIcon icon={faClock} className="fs-5 text-info" />
                                                </span>
                                            </div>
                                            <div className="m-0">
                                                <span className="fw-semibold text-gray-500 d-block fs-8">Heure</span>
                                                <span className="fw-bold text-gray-800 fs-7 text-theme">{evenement.HR_EVEBEGIN}</span>
                                            </div>
                                        </div>

                                        <div className="d-flex align-items-center me-5 me-xl-13">
                                            {/* Icone Lieu */}
                                            <div className="symbol symbol-30px symbol-circle me-3">
                                                <span className="symbol-label bg-info-subtle">
                                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="fs-5 text-info" />
                                                </span>
                                            </div>
                                            {/* <div className="m-0">
                                                <span className="fw-semibold text-gray-500 d-block fs-8">Lieu</span>
                                                <a  className="fw-bold text-gray-800 text-hover-primary fs-7 text-theme">
                                                    {evenement.LG_LSTPLACEID_ || 'Lieu non disponible'}
                                                </a>
                                            </div> */}
                                        </div>

                                        {/* <div className="d-flex align-items-center">
                                            <div className="symbol symbol-30px symbol-circle me-3">
                                                <span className="symbol-label bg-info-subtle">
                                                    <FontAwesomeIcon icon={faTags} className="fs-5 text-info" />
                                                </span>
                                            </div>
                                            <div className="m-0">
                                                <span className="fw-semibold text-gray-500 d-block fs-8 ">Catégorie</span>
                                                <span className="fw-bold text-gray-800 fs-7 text-theme">
                                                    {evenement.LG_LSTID_ || 'Catégorie non disponible'}
                                                </span>
                                            </div>
                                        </div> */}

                                    </div>
                                </div>
                            {/* <h3 className="text-gray-100 fw-bold my-7">Type de ticket disponible</h3>

                            <div className='d-flex  w-50'>
                                {ticketCategories && ticketCategories.map((categoreItem, index) => (
                                    <div key={index} className="notice d-flex bg-light-primary rounded border-primary border border-dashed me-3 mb-5 p-6">
                                        <div className="d-flex flex-stack flex-grow-1 ">
                                            <div className=" fw-semibold">
                                                <h4 className="text-gray-900 fw-bold mb-0">{categoreItem.title}</h4>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div> */}
                            </div>
                            <ul className="nav nav-pills nav-pills-custom mt-3" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <a class="nav-link d-flex  flex-column flex-center overflow-hidden w-70px w-75px py-4 active">
                                        <h3 class=" text-gray-600 fw-bold mb-0 fs-1 compte-a-rebour">{countJour}</h3>
                                        <span class=" text-gray-600 fw-bold fs-8 lh-1 compte-a-rebour">Jour</span>
                                        <span class="bullet-custom position-absolute bottom-0 w-100 h-4px bg-primary border-bottom"></span>
                                    </a>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <a class="nav-link d-flex  flex-column flex-center overflow-hidden w-70px w-75px py-4 active">
                                        <h3 class=" text-gray-600 fw-bold mb-0 fs-1 compte-a-rebour">{countHeure}</h3>
                                        <span class=" text-gray-600 fw-bold fs-8 lh-1 compte-a-rebour">Heure</span>
                                        <span class="bullet-custom position-absolute bottom-0 w-100 h-4px bg-primary border-bottom"></span>
                                    </a>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <a class="nav-link d-flex  flex-column flex-center overflow-hidden w-70px w-75px py-4 active">
                                        <h3 class=" text-gray-600 fw-bold mb-0 fs-1 compte-a-rebour">{countMinute}</h3>
                                        <span class=" text-gray-600 fw-bold fs-8 lh-1 compte-a-rebour">Min</span>
                                        <span class="bullet-custom position-absolute bottom-0 w-100 h-4px bg-primary border-bottom"></span>
                                    </a>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <a class="nav-link d-flex  flex-column flex-center overflow-hidden w-70px w-75px py-4 active">
                                        <h3 class=" text-gray-600 fw-bold mb-0 fs-1 compte-a-rebour">{countSeconde}</h3>
                                        <span class=" text-gray-600 fw-bold fs-8 lh-1 compte-a-rebour">Sec</span>
                                        <span class="bullet-custom position-absolute bottom-0 w-100 h-4px bg-primary border-bottom"></span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default DetailHeader;
