import React, { createContext, useContext } from "react";
import useCart from "../reducer";

export const ProductContext = createContext(null);

const ProductProvider = ({ children }) => {
  const cart = useCart();
  return <ProductContext.Provider value={{ ...cart }}>{children}</ProductContext.Provider>;
};

export default ProductProvider;
// Custom hook to access the context

export const UseProductContext = () => {
  return useContext(ProductContext);
};
