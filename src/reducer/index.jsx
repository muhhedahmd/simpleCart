import React, { useReducer } from "react";

const initialState = {
  products: [],
};

const ACTIONS = {
  ADD_TO_CART: "addToCart",
  REMOVE_FROM_CART: "removeFromCart",
};

const reduce = (state, action) => {
  const existingProductIndex = (id) => state.products.findIndex(
    (product) => product.id === id
    );
  switch (action.type) {
    case ACTIONS.ADD_TO_CART:
      const { id } = action.payload;

        
        if (existingProductIndex(id) !== -1) {
          const updatedCartItems = [...state.products];
          updatedCartItems[existingProductIndex(id)].quantity ++;
          
          return {
          ...state,
          products:updatedCartItems,
        };
        
        }
        else {
          return {
            ...state,
            products: [...state.products, {...action.payload , quantity:1}],
          };

        }

      

    case ACTIONS.REMOVE_FROM_CART:



      
      // let idx  = state.products.findIndex((item)=> item.id  === action.payload )
      if (state.products[existingProductIndex(action.payload)].quantity  === 1 ){
        console.log(state)
        
        return {
          ...state,
          products: state.products.filter((item)=> item.id !== action.payload),
        }
        
      }

        else {
          const updatedCartItems = [...state.products];
          updatedCartItems[existingProductIndex(action.payload)].quantity --;
          
          return {
            ...state,
            products: updatedCartItems
          }
        }
      

    default:
      return state;
  }
};

const useCart = () => {
  const [state, dispatch] = useReducer(reduce, initialState);

  const totalCount = state.products.reduce(
    (total, product) => total + product.quantity,
    0
  );
  const totalprice = state.products.reduce(
    (total, product) => total + (product.price * product.quantity ),
    0
  );

  const addToCart = (product) => {
    dispatch({ type: ACTIONS.ADD_TO_CART, payload: product });
  };

  const removeFromCart = (productID) => {
    dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: productID });
  };

  return { state, addToCart, removeFromCart, totalCount , totalprice };
};

export default useCart;
