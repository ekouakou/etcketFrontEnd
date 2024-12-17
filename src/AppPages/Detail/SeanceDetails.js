import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SeanceDetails = ({ seanceData }) => {
  const [quantities, setQuantities] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectionDetails, setSelectionDetails] = useState([]);
  const [cartItems, setCartItems] = useState([]); // Nouvel état pour les articles du panier

  if (!seanceData) return null; // Vérification si les données sont disponibles

  const handleQuantityChange = (category, change) => {
    const newQuantities = { ...quantities };
    const itemName = category.LG_CATSEATID;

    if (newQuantities[itemName]) {
      newQuantities[itemName] += change;
      if (newQuantities[itemName] < 0) newQuantities[itemName] = 0; // Empêcher les quantités négatives
    } else {
      newQuantities[itemName] = change > 0 ? 1 : 0;
    }

    setQuantities(newQuantities);

    const newSelectionDetails = [];
    let newTotalAmount = 0;
    const newCartItems = []; // Nouveau tableau pour les articles du panier

    seanceData.infoCategories.forEach(cat => {
      const qty = newQuantities[cat.LG_CATSEATID] || 0;
      if (qty > 0) {
        newSelectionDetails.push({
          category: cat.llgCatPl,
          quantity: qty,
          price: cat.priceMin
        });
        newTotalAmount += qty * cat.priceMin;
        newCartItems.push({
          category: cat.llgCatPl,
          quantity: qty,
          price: cat.priceMin,
          totalPrice: qty * cat.priceMin
        });
      }
    });

    setTotalAmount(newTotalAmount);
    setSelectionDetails(newSelectionDetails);
    setCartItems(newCartItems); // Mettre à jour l'état des articles du panier
  };

  console.log(cartItems);
  const handlePaymentClick = () => {
    localStorage.setItem('totalAmount', totalAmount.toFixed(2));
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Enregistrer le tableau d'objets dans localStorage
  };

  const renderInfoCategories = () => {
    return (
      <div className='w-100'>
        {seanceData.infoCategories.map(category => (
          <div key={category.LG_CATSEATID} className="session-price-item col-12 p-0">
            <div className="session-price-cat">
              <div className="filter-area p-4">
                <div className="filter-main">

                  

                  <h3 className="session-price-cat-title w-100">
                  </h3>
                  <div className='w-100'>

                      <div className='row align-items-center'>
                          <div className='col-xl-8 col-lg-7 col-md-8  sm-6 col-xs-6 col-12'>
                            <h4>
                            <span className="session-price-cat-title-txt mb-2">{category.llgCatPl} : {category.priceMin} &nbsp; {category.STR_DEVISE}</span>
                            </h4>
                          </div>

                          <div className="col-xl-4 col-lg-5 col-md-4 sm-6 col-xs-6 col-12">
                            <div className="border rounded-pill py-1 px-3 border-color-1 form-group">
                              <div className="js-quantity row align-items-center" data-ref={category.LG_CATSEATID} name={category.LG_CATSEATID}>
                                <div className="col pr-0">
                                  <input className="js-result form-control h-auto border-0 rounded p-0 shadow-none" type="number" value={quantities[category.LG_CATSEATID] || 0} readOnly />
                                </div>
                                <div className="col-auto">
                                  <a className="js-minus btn btn-icon btn-xs btn-outline-secondary rounded-circle border-0" href="javascript:;" onClick={() => handleQuantityChange(category, -1)}>
                                    <small className="fas fa-minus btn-icon__inner"></small>
                                  </a>
                                  <a className="js-plus btn btn-icon btn-xs btn-outline-secondary rounded-circle border-0" href="javascript:;" onClick={() => handleQuantityChange(category, 1)}>
                                    <small className="fas fa-plus btn-icon__inner"></small>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* <div className='col-lg-8 col-xs-7 col-7' >
                              <span className="session-price-cat-item-price mb-2">{category.priceMin} &nbsp; {category.STR_DEVISE}</span>
                          </div> */}
                      </div>
                    {/* <div className='col-lg-8 col-xs-12'>
                      <span className="session-price-cat-item-price">{category.priceMin} &nbsp; {category.STR_DEVISE}</span>
                    </div> */}
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
        <div className="row">
          <div className="col-lg-8">
            <div className="checkout-widget d-flex flex-wrap align-items-center justify-content-between">
              <div className="title-area mb-4 col-12">
                <h5 className="title">Already a Boleto Member?</h5>
                <p>Sign in to earn points and make booking easier!</p>
              </div>
              {renderInfoCategories()}
            </div>
          </div>

          <div className="col-lg-4">
            <div className="booking-summery bg-one">
              <h4 className="title">Résumé de l’achat </h4>
              <ul>
                <li>
                  <div className="info"><span>Nbre billet</span> <span>{Object.values(quantities).reduce((acc, curr) => acc + curr, 0)} Tickets</span></div>
                </li>
              </ul>
              <ul className="side-shape"></ul>
              <ul>
                <li>
                  {selectionDetails.filter(detail => detail.quantity > 0).map((detail, index) => (
                    <ul key={index}>
                      <li>
                        <h6 className="subtitle"><span>CAT</span><span>{detail.category}</span></h6>
                        <div className="info"><span>Quantité</span> <span>{detail.quantity}</span></div>
                        <div className="info"><span>Tarif</span> <span>{detail.price} FCFA</span></div>
                      </li>
                    </ul>
                  ))}
                </li>
              </ul>
            </div>
            <div className="proceed-area text-center">
              <h6 className="subtitle"><span>Total</span><span>{totalAmount.toFixed(2)} FCFA</span></h6>
              {totalAmount > 0 && (
                <Link className="w-100" to="/paiement" onClick={handlePaymentClick}>
                  <button className="custom-button back-button">Paiement</button>
                </Link>
              )}
            </div>
          </div>
        </div>
    </div>
  );
};

export default SeanceDetails;
