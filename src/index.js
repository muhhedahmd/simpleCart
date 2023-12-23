import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import { BrowserRouter, Route, Routes  } from "react-router-dom";
import { AuthProvider } from './contexts/Authcontext.jsx';
import ProductProvider from './contexts/productContext.jsx';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
<ProductProvider>
  
<AuthProvider>


<App/> 

</AuthProvider>
</ProductProvider>
</BrowserRouter>
  );

