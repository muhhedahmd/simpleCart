import React from 'react';
import Header from "./component/Header/Header";
import ProductProvider from "./contexts/productContext";
import UseRouter from './component/Router/Router';

export default function App() {
  const { routes } = UseRouter();

  return (
      <div className="container">
      <ProductProvider>
        <Header />
      {routes}
      </ProductProvider>
    </div>
  );
}
