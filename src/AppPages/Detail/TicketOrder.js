import React, { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify'; // Gestion des notifications
import 'react-toastify/dist/ReactToastify.css'; // Import du style pour les notifications
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import des icônes
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react'; // Utilisation des tooltips
import { CartContext } from '../../contexts/CartContext'; // Contexte du panier
import { CounterContext } from '../../contexts/CounterContext'; // Contexte pour compter les items
import { fetchEvenements } from '../../services/apiService'; // Fonction de récupération des événements depuis l'API
import { Button, Card } from 'react-bootstrap'; // Composants Bootstrap
import { NavLink } from 'react-router-dom';


const TicketOrder = ({ eventDetails, onQuantityUpdate, datePassed }) => {
  // Récupération de certaines données dans le localStorage
  const mode = JSON.parse(localStorage.getItem("appMode"));
  const appDevise = localStorage.getItem("appDevise");
  const STR_EVESTATUTFREE = localStorage.getItem('STR_EVESTATUTFREE');
  
  // Récupération des valeurs à partir des contextes
  const { cartItems, updateCartItems } = useContext(CartContext); // Pour mettre à jour le panier
  const { updateCount } = useContext(CounterContext); // Pour mettre à jour le compteur

  // États pour gérer les données des tickets et les quantités
  const [ticketCategories, setTicketCategories] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [availableTickets, setAvailableTickets] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Gérer l'état du bouton

  // Utilisation de useEffect pour charger les catégories de tickets
  useEffect(() => {
    const params = {
      mode: mode.listCategorieplaceEvenementMode, // Mode défini dans le localStorage
      LG_EVEID: localStorage.getItem('LG_EVEID') // Identifiant de l'événement
    };

    // Récupération des données depuis l'API
    fetchEvenements(params)
      .then(response => {
        const apiData = response.data.data;

        // Transformation des données de l'API pour correspondre au format requis
        const transformedData = apiData.map(item => ({
          id: item.LG_ELIID,
          title: item.STR_LSTDESCRPTION,
          lg_lstid: item.LG_LSTID,
          price: parseFloat(item.DBL_ELIAMOUNT),
          image: 'assets/images/billet.png', // Image associée à chaque catégorie
          available: parseInt(item.INT_ELINUMBER, 10),
          maxseat: parseInt(item.INT_ELINUMBERMAX, 10),
          maxPurchase: parseInt(item.INT_ELINUMBERMAX, 10), // Nombre maximum d'achats
          currency: appDevise // Devise récupérée du localStorage
        }));

        setTicketCategories(transformedData); // Mise à jour des catégories de tickets

        // Initialisation des états pour gérer les quantités et tickets disponibles
        const initialQuantities = transformedData.reduce((acc, category) => {
          acc[category.id] = 0;
          return acc;
        }, {});

        const initialAvailableTickets = transformedData.reduce((acc, category) => {
          acc[category.id] = category.maxseat;
          return acc;
        }, {});

        setQuantities(initialQuantities);
        setAvailableTickets(initialAvailableTickets);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
      });
  }, []);

  // Fonction pour gérer le clic sur le bouton de paiement
  const handlePaymentClick = () => {
    const existingCartItems = [...cartItems]; // Copier les éléments actuels du panier

    // Filtrer et ajouter les catégories avec des quantités > 0
    ticketCategories
      .filter(category => quantities[category.id] > 0)
      .forEach(category => {
        const existingItemIndex = existingCartItems.findIndex(item =>
          item.category === category.title && item.LG_EVEID === eventDetails.LG_EVEID
        );

        if (existingItemIndex !== -1) {
          // Si l'élément existe déjà, on le met à jour
          existingCartItems[existingItemIndex] = {
            ...existingCartItems[existingItemIndex],
            quantity: quantities[category.id],
            INT_ELINUMBER: quantities[category.id],
            totalPrice: quantities[category.id] * category.price
          };
        } else {
          // Sinon, on l'ajoute comme nouvel élément
          existingCartItems.push({
            LG_EVEID: eventDetails.LG_EVEID,
            STR_TICMAIL: "",
            LG_LSTID: category.lg_lstid,
            STR_EVENAME: eventDetails.STR_EVENAME,
            STR_EVEPIC_PANIER: eventDetails.STR_EVEPIC,
            DT_EVEBEGIN: eventDetails.DT_EVEBEGIN,
            DT_EVEEND: eventDetails.DT_EVEEND,
            HR_EVEBEGIN: eventDetails.HR_EVEBEGIN,
            HR_EVEEND: eventDetails.HR_EVEEND,
            category: category.title,
            quantity: quantities[category.id],
            INT_ELINUMBER: quantities[category.id],
            DBL_TICAMOUNT: category.price,
            totalPrice: quantities[category.id] * category.price,
            STR_DEVISE: category.currency,
            STR_EVEPIC: eventDetails.STR_EVEPIC,
            STR_MAX_PURCHASE: category.maxPurchase,
            mode: mode.createTicketMode
          });
        }
      });

    // Calculer le montant total
    const updatedTotalAmount = ticketCategories.reduce((total, category) => {
      return total + (quantities[category.id] * category.price);
      
    }, 0);

    // Mettre à jour les items du panier et stocker les informations dans le localStorage
    updateCartItems(existingCartItems);
    localStorage.setItem('totalAmount', updatedTotalAmount.toFixed(2));
    localStorage.setItem('quantities', JSON.stringify(quantities));

    //toast.success("Vos choix ont été ajoutés au panier !");
    toast.success(process.env.REACT_APP_MSG_AJOUTER_PANNER, {
      position: "bottom-center",
      autoClose: 3000,
      className: "custom-toast",
    });
    
    resetCategories(); // Réinitialiser les catégories
  };

  // Réinitialiser les quantités et les tickets disponibles
  const resetCategories = () => {
    setQuantities(ticketCategories.reduce((acc, category) => {
      acc[category.id] = 0;
      return acc;
    }, {}));

    setAvailableTickets(ticketCategories.reduce((acc, category) => {
      acc[category.id] = category.available;
      return acc;
    }, {}));
    setIsButtonDisabled(true); // Désactiver le bouton après réinitialisation
  };

  // Fonction pour vider le panier
  const clearCart = () => {
    updateCartItems([]); // Vider les items du panier
    localStorage.removeItem('totalAmount');
    localStorage.removeItem('quantities');
    updateCount(0); // Réinitialiser le compteur d'items
  };

  // Gérer le changement de quantité des tickets
  const handleQuantityChange = (id, change) => {
    const newQuantities = { ...quantities };
    const newAvailableTickets = { ...availableTickets };
    const category = ticketCategories.find(cat => cat.id === id);

    if (category) {
      

      if (STR_EVESTATUTFREE !== '0') {
        // Vérifier si l'utilisateur dépasse la quantité max d'achat ou la disponibilité des tickets
          if (change > 0 && (newAvailableTickets[id] <= 0 || newQuantities[id] >= category.maxPurchase)) {
            // toast.error(`Vous ne pouvez pas acheter plus de ${category.maxPurchase} tickets pour ${category.title}.`);

            toast.error(`Vous ne pouvez pas acheter plus de ${category.maxPurchase} tickets pour ${category.title}.`, {
              position: "bottom-center",
              autoClose: 3000,
              className: "custom-toast",
            });

            return;
          }
      }

      // Mise à jour des quantités
      newQuantities[id] = (newQuantities[id] || 0) + change;
      if (newQuantities[id] < 0) newQuantities[id] = 0;

      // Mise à jour des tickets disponibles
      newAvailableTickets[id] -= change;
      if (newAvailableTickets[id] < 0) newAvailableTickets[id] = 0;

      setQuantities(newQuantities);
      setAvailableTickets(newAvailableTickets);

      // Calculer le montant total
      const newTotalAmount = ticketCategories.reduce((total, category) => {
        return total + (newQuantities[category.id] * category.price);
      }, 0);

      setTotalAmount(newTotalAmount); // Mise à jour du montant total

      // Activer/désactiver le bouton de paiement en fonction de la quantité totale
      const totalTickets = Object.values(newQuantities).reduce((acc, curr) => acc + curr, 0);
      setIsButtonDisabled(totalTickets === 0);

      // Si l'événement est gratuit (STR_EVESTATUTFREE = '0'), mettre à jour les quantités et appeler onQuantityUpdate
      if (STR_EVESTATUTFREE === '0') {
        const totalQuantities = Object.values(newQuantities).reduce((acc, curr) => acc + curr, 0);
        onQuantityUpdate(totalQuantities); // Appel de la fonction du parent
      }
    }
  };




  function updateEventDatesInCart(eventId, newStartDate, newEndDate, newStartTime, newEndTime) {
    // Récupérer les items du panier depuis le localStorage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
    // Trouver l'élément correspondant à l'ID de l'événement
    const updatedCartItems = cartItems.map(item => {
      if (item.LG_EVEID === eventId) {
        // Mettre à jour les dates et heures de l'événement
        return {
          ...item, // garder les autres propriétés intactes
          DT_EVEBEGIN: newStartDate,
          DT_EVEEND: newEndDate,
          HR_EVEBEGIN: newStartTime,
          HR_EVEEND: newEndTime
        };
      }
      return item; // retourner l'item tel quel si l'ID ne correspond pas
    });
  
    // Mettre à jour le localStorage avec les nouveaux items
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  
    console.log("Panier mis à jour avec les nouvelles dates :", updatedCartItems);
  }
  
  // Exemple d'utilisation
  updateEventDatesInCart(
    eventDetails.LG_EVEID,  // ID de l'événement
    eventDetails.DT_EVEBEGIN,
    eventDetails.DT_EVEEND,
    eventDetails.HR_EVEBEGIN,
    eventDetails.HR_EVEEND,                                    // Nouvelle heure de fin
  );
  



  return (
    <>
      <ToastContainer />
      <div className="card card-flush py-4 mb-10">
        {!datePassed ? (
          <div className="card-body pt-0 bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-250px">
            <div className="pb-7">
              <h1 className="fw-bold text-gray-900 text-theme">Choisir mon ticket</h1>
              <div className="text-muted fw-semibold fs-4 text-theme">
                Indiquez le nombre de ticket pour continuer
              </div>
            </div>
            <div id='ticketCategories' className="row justify-content-center mb-0">
              {!datePassed && ticketCategories.map(category => (
                <div key={category.id} className="card card-flush box-shadow-none p-5 mb-5">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h3 className='text-theme'> Billet {category.title}</h3>
                      <span className="badge bg-light text-danger">
                        <span>{category.price} <sup>{category.currency}</sup></span>
                      </span>
                    </div>
                    {quantities[category.id] > 0 &&  (
                      <div className="card card-flush box-shadow-none d-xs-none">
                        <div className="card-body p-2 change-quantity">
                          <div className="d-flex align-items-center">
                            <span className="text-success mx-3 fs-1">
                              {(quantities[category.id] * category.price).toFixed(2)} <sup className='fs-7'>{category.currency}</sup>
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="card card-flush box-shadow-none">
                      <div className="card-body p-2 change-quantity">
                        <div className="d-flex align-items-center">
                            <a className="me-2 btn btn-lg rounded fs-14 pull-right btn-secondary" onClick={() => handleQuantityChange(category.id, -1)}>-</a>
                          <span id='quantiteTicket' className='fs-5 text-theme'>{quantities[category.id]}</span>
                            <a className="ms-2 btn btn-lg rounded fs-14 pull-right btn-secondary" onClick={() => handleQuantityChange(category.id, 1)}>+</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  
                  <div className="d-flex justify-content-between align-items-center d-xs-block d-lg-none d-sm-none">
                    {quantities[category.id] > 0 &&  (
                      <div className="card card-flush box-shadow-none">
                        <div className="card-body p-2 change-quantity">
                          <div className="d-flex align-items-center">
                            <span className="text-success mx-3 fs-1">
                              {(quantities[category.id] * category.price).toFixed(2)} <sup className='fs-7'>{category.currency}</sup>
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {STR_EVESTATUTFREE && STR_EVESTATUTFREE != "0" && (
            <Button variant="primary" className='mt-5' onClick={handlePaymentClick}//{STR_EVESTATUTFREE > 0 ?  : handleGetTicketGratuit}
              disabled={isButtonDisabled}
            >
              Valider
              {/* {totalAmount.toFixed(2)} {ticketCategories[0]?.currency} */}
            </Button>
            )}
          </div>
        ):(
          <div className="card-px text-center pt-15 pb-15">
            {/*begin::Title*/}
            <h2 className="fs-2x fw-bold mb-0 text-theme">Evenement terminé !</h2>
            {/*end::Title*/}
            {/*begin::Description*/}
            <img src="assets/images/event_end.png" height={200} className='my-10'/>
            <p className="text-gray-500 fs-4 fw-semibold py-7">
            Vous avez manqué cet événement ? Pas de panique ! <br />
            Trouvez votre prochain coup de cœur parmi nos autres événements à l’accueil.

            </p>
            {/*end::Description*/}
            {/*begin::Action*/}
            <NavLink to="/" className="btn btn-primary er fs-6 px-8 py-4"
            >Retour à l'accueil</NavLink>
            {/*end::Action*/}
          </div>

        )}
      </div>
    </>
  );
};

export default TicketOrder;
