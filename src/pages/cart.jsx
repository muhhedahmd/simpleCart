import React from "react";
import ProductProvider, { UseProductContext } from "../contexts/productContext";
import MapOfProducts from "../component/mapOfProducts/mapOfProducts";
import { formantCurrancy } from "../utiles/formatCurrancy";

const Cart = () => {
  const { state  ,  totalCount , totalprice} = UseProductContext();
  console.log(state)

  return (


    <div style={{display:"flex" , justifyContent:"space-between" , alignItems:"baseline"}}>
    <ul className="products">
        {state?.products?.map((item, i )=>{
            return (<MapOfProducts key={i}  product={item} />)
        })}
    </ul> 
     
      <div>
        <p>total item: {totalCount}</p>
       <p>total price:  {formantCurrancy(totalprice) } </p> 
      </div> 
    
    </div>
  );
};

export default Cart;
