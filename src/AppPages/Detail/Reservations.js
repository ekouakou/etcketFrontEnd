import React, { useState, useContext, useEffect } from 'react';
import { CartContext } from '../../contexts/CartContext';

const Reservations = ({ pannierData, index, onRemove }) => {
  const [quantity, setQuantity] = useState(pannierData.quantity);
  const { updateCartItems, cartItems } = useContext(CartContext);
  const maxPurchase = parseInt(pannierData.STR_MAX_PURCHASE);

  useEffect(() => {
    const cartItem = cartItems.find(item => item.LG_EVEID === pannierData.LG_EVEID && item.category === pannierData.category);
    if (cartItem) {
      setQuantity(cartItem.quantity);
    }
  }, [cartItems, pannierData.LG_EVEID, pannierData.category]);

  const incrementQuantity = () => {
    const newQuantity = quantity + 1;
    if (newQuantity <= maxPurchase) {
      updateCart(index, newQuantity);
      setQuantity(newQuantity);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      updateCart(index, newQuantity);
      setQuantity(newQuantity);
    }
  };

  const handleRemoveItem = () => {
    const updatedCartItems = cartItems.filter(item => !(item.LG_EVEID === pannierData.LG_EVEID && item.category === pannierData.category));
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    updateCartItems(updatedCartItems);
  };

  const updateCart = (index, newQuantity) => {
    const updatedCartItems = [...cartItems];
    const itemIndex = updatedCartItems.findIndex(item => item.LG_EVEID === pannierData.LG_EVEID && item.category === pannierData.category);
    if (itemIndex !== -1) {
      updatedCartItems[itemIndex].quantity = newQuantity;
      updatedCartItems[itemIndex].totalPrice = updatedCartItems[itemIndex].price * newQuantity;
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      updateCartItems(updatedCartItems);
    }
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <img src="assets/media/svg/illustrations/easy/2.svg" className="theme-light-show w-200px" alt="" />
      ) : (
        <div className="d-flex align-items-center mb-6">
          <span
            data-kt-element="bullet"
            className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-info"
          />
          <div className="flex-grow-1 me-5">
            <div className="text-gray-800 fw-semibold fs-5 text-theme">
              {pannierData.DT_EVEBEGIN} - {pannierData.HR_EVEBEGIN}
             
            </div>
            <div className="text-gray-700 fw-semibold fs-6 text-theme">
            <p className='mb-0'><span className="badge bg-light text-danger"> {pannierData.category} </span></p>
              {pannierData.STR_EVENAME}
            </div>
            <div className="text-gray-500 fw-semibold fs-7 text-theme">
              
            </div>
          </div>
          <a
            className="btn btn-sm btn-light"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_create_project"
          >
            {quantity}
          </a>
        </div>
      )}
    </>
  );
};

export default Reservations;
