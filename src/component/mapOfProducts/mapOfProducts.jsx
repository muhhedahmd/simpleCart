import React from "react";
import useCart from "../../reducer";
import { UseProductContext } from "../../contexts/productContext";
import { useLocation } from "react-router-dom";

import { formantCurrancy } from "../../utiles/formatCurrancy";
import { PATHS } from "../Router/Paths";

const MapOfProducts = ({ product }) => {
  const {  addToCart, removeFromCart }= UseProductContext();

  const location = useLocation();

  return (
    <li>
      <h3> {product.name}</h3>
      <p>{product.description}</p>
      <span>{ formantCurrancy(product.price) }</span>
      {location.pathname === PATHS.cart ? (
        <>
          <button onClick={() => addToCart(product)}>+</button>
          <span> you add {product.quantity} to cart </span>
          <button className="remove" onClick={() => removeFromCart(product.id)}>
            -
          </button>
          <p> total price for {product.name} - { formantCurrancy(product.price * product.quantity)}</p>
        
        </>
      ) : location.pathname === PATHS.home ? (<>
      <button onClick={() => addToCart(product)}>+</button>
      </>
      ) : (
        ""
      )}
    </li>
  );
};

export default MapOfProducts;
