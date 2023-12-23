// Cart.js
import React, { useReducer } from 'react';

// Initial state for the cart
const initialState = {
  cartItems: [],

};

// Reducer function to handle state changes
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
        const existItem  = state.cartItems.findIndex((item)=> item.id === action.payload.id )
        if(existItem !== -1  )
        {
            state.CartItems.quantaty = 0 

            console.log(state)
            return {
                ...state,
                cartItems: [...state.cartItems, {...action.payload , quantaty: state.cartItems ?  0  : state.cartItems +=1  }],
            }
        }
            
        
        return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload.id),
      };
    default:
      return state;
  }
};

const CartTest = () => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (product) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: product });
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      <div className="product-list">
        {/* Replace this with your product listing */}
        <Product
          id={1}
          name="Product 1"
          price={10}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          cartItems={cartState.cartItems}
        />
        <Product
          id={2}
          name="Product 2"
          price={15}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          cartItems={cartState.cartItems}
        />
      </div>
      <CartItems
        cartItems={cartState.cartItems}
        removeFromCart={removeFromCart}
      />
    </div>
  );
};

const Product = ({ id, name, price, addToCart, removeFromCart, cartItems }) => {
//   const isInCart = cartItems.some((item) => item.id === id);

  return (
    <div className="product">
      <h3>{name}</h3>
      <p>${price}</p>

        <button onClick={() => removeFromCart({ id, name, price })}>Remove</button>

        <button onClick={() => addToCart({ id, name, price })}>Add to Cart</button>
      
    </div>
  );
};

const CartItems = ({ cartItems, removeFromCart }) => {
  return (
    <div className="cart-items">
      <h2>Cart Items</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price}{' '}
            <button onClick={() => removeFromCart(item)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartTest;
