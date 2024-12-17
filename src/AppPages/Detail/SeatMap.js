import React, { useState } from 'react';

// Composant de siège
const Seat = ({ id, category, rowLabel, seatNumber, isFree, price, addToCart, removeFromCart }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    // Ne rien faire si le siège est occupé
    if (!isFree) return;
    
    // Inverser l'état de sélection
    setIsSelected(!isSelected);

    // Ajouter ou retirer du panier en fonction de l'état de sélection
    if (!isSelected) {
      addToCart({ id, category, rowLabel, seatNumber, price }); // Ajoutez le prix ici
    } else {
      removeFromCart(id);
    }
  };

  return (
    <li className={isFree ? (isSelected ? 'single-seat seat-selected' : 'single-seat seat-free') : 'single-seat'}>
      {isFree ? (
        <div>
          <img
            src={isSelected ? "assets/images/movie/seat01-selected.svg" : "assets/images/movie/seat01-free.svg"}
            alt="seat"
            width={50} height={50}
            onClick={handleClick}
          />
          <span className="sit-num">{seatNumber}</span>
          {/* <span className="price">{price}</span> //Affichez le prix */}
        </div>
      ) : (
        <img src="assets/images/movie/seat01.svg" className='d-none' width={50} height={50} alt="seat" />
      )}
    </li>
  );
};

// Composant de ligne de sièges
const SeatRow = ({ category, rowLabel, seats, seatType, addToCart, removeFromCart }) => {
  // Filtrer les sièges pour n'afficher que ceux qui sont disponibles
  const availableSeats = seats.filter(seat => seat.isFree);

  // Ne rendre cette rangée que si elle a des places disponibles
  if (availableSeats.length === 0) return null;

  return (
    <ul className="front-seat" >
      {availableSeats.map((seat, index) => (
        <Seat key={index} id={`${category}-${rowLabel}-${seat.seatNumber}`} category={category} rowLabel={rowLabel} seatNumber={seat.seatNumber} isFree={seat.isFree} price={seat.price} addToCart={addToCart} removeFromCart={removeFromCart} />
      ))}
    </ul>
  );
};


// Composant de zone de sièges
const SeatArea = ({ category, seatsData, addToCart, removeFromCart }) => (
  <div>
    <div className='screen'>
    <h5 className="subtitle text-center mt-2">Catégorie {category}</h5>
    </div>
   
    <div className="screen-wrapper">
      {seatsData.map((seatRow, index) => {
        // Filtrer les rangées pour n'afficher que celles qui ont des places disponibles
        const availableSeatsRows = seatRow.seats.filter(seat => seat.isFree);
        
        // Déterminez si la classe spéciale doit être ajoutée en fonction du nombre de places disponibles
        const specialClass = availableSeatsRows.length <= 5 ? 'few-seats' : '';

        // Ne rendre cette zone de sièges que si elle contient des rangées avec des places disponibles
        if (availableSeatsRows.length === 0) return null;

        return (
          <ul key={index} className={`seat-area`}>
            <li className="seat-line">
              <span>{seatRow.rowLabel}</span>
              <ul className={`seat--area ${specialClass}`}>
                <SeatRow category={category} rowLabel={seatRow.rowLabel} seats={seatRow.seats} seatType={seatRow.seatType} addToCart={addToCart} removeFromCart={removeFromCart} />
              </ul>
              <span>{seatRow.rowLabel}</span>
            </li>
          </ul>
        );
      })}
    </div>
  </div>
);

const newSelections = [];
// Composant principal
const SeatMap = () => {
  // État pour stocker les sièges sélectionnés
  const [cart, setCart] = useState([]);

  //Fonction pour ajouter un siège au panier
  const addToCart = (seatInfo) => {
    setCart([...cart, seatInfo]);
  };



  // Fonction pour retirer un siège du panier
  const removeFromCart = (seatId) => {
    setCart(cart.filter(seat => seat.id !== seatId));
  };

  // Fonction pour envoyer les données à l'API
  const sendDataToAPI = () => {
    // Envoyer les données à l'API ici
    console.log("Données envoyées à l'API :", cart);
    // Réinitialiser le panier après l'envoi
    setCart([]);
  };

  // Fonction pour calculer le montant total du panier
  const calculateTotalAmount = (cart) => {
    let totalAmount = 0;

    console.log(cart);
    cart.forEach(seat => {
      if (seat.price) { // Vérifiez si le siège a un prix défini
        totalAmount += seat.price; // Ajoutez le prix uniquement si défini
      }
    });
    return  totalAmount.toLocaleString('fr-FR') ;
  };


const totalAmount = calculateTotalAmount(cart);

// const formatAmount = (amount) => {
//   return amount.toLocaleString('fr-FR'); // Utilisez 'fr-FR' pour le format français
// };

// // Utilisation de la fonction pour formater un montant
// const totalAmountFormatted = formatAmount(totalAmount);


  // Données des sièges pour toutes les catégories
const allSeatsData = [
  {
    category: "VIP",
    seatsData: [
      {
        rowLabel: 'G',
        seatType: 'seat01',
        seats: [
          { isFree: false,price : 20000 },
          { isFree: false,price : 20000 },
          { isFree: false,price : 20000 },
          { isFree: false,price : 20000 },
        ],
      },
      {
        rowLabel: 'f',
        seatType: 'seat01',
        price : 20000,
        seats: [
          { isFree: false,price : 20000 },
          { isFree: false,price : 20000 },
          { isFree: true, seatNumber: 'f7',price : 20000 },
          { isFree: true, seatNumber: 'f8',price : 20000 },
          { isFree: false,price : 20000 },
          { isFree: false,price : 20000 },
        ],
      },
      // Ajoutez d'autres lignes de sièges pour la catégorie VIP au besoin...
    ]
  },
  {
    category: "Pass",
    seatsData: [
      {
        rowLabel: 'e',
        seatType: 'seat01',
        seats: [
          { isFree: false,price : 10000 },
          { isFree: false,price : 10000 },
        ],
      },
      {
        rowLabel: 'd',
        seatType: 'seat01',
        seats: [
          { isFree: false,price : 10000 },
          { isFree: true, seatNumber: 'D7',price : 10000 },
          { isFree: false,price : 10000 },
        ],
      },
      // Ajoutez d'autres lignes de sièges pour la catégorie Pass au besoin...
    ]
  },
  // Ajoutez d'autres catégories de sièges au besoin...
];

  return (
    <div>

<div className="screen-area">
  <h4 className="screen">screen</h4>
  <div className="screen-thumb">
    <img src="assets/images/movie/screen-thumb.png" alt="movie" />
  </div>
  
</div>

      {allSeatsData.map((categoryData, index) => (
        <SeatArea key={index} category={categoryData.category} seatsData={categoryData.seatsData} addToCart={addToCart} removeFromCart={removeFromCart} />
      ))}
      <div class="proceed-book bg_img" data-background="assets/images/movie/movie-bg-proceed.jpg">
        <div class="proceed-to-book">
          <div class="book-item">
            <span>You have Choosed Seat</span>
            <h3 class="title d-flex">
            {cart.map((seat, index) => (
              <span key={index}>
                {index > 0 && ' , '} {/* Affiche une virgule à partir du deuxième élément */}
                {seat.seatNumber}
              </span>
            ))}
            &nbsp;
            </h3>
          </div>
          <div class="book-item">
            <span>total price</span>
            <h3 class="title">{totalAmount}</h3>
          </div>
          <div class="book-item">
            {/* <a href="#" onClick={sendDataToAPI} class="custom-button">proceed</a> */}
            <button class="custom-button" onClick={sendDataToAPI}>Enregistrer</button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SeatMap;
