import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import Home from '../../pages/home';
import Cart from '../../pages/cart';
import ProtectedRoute from '../ProtectedRoute/index';
import Login from '../Login';
import Signup from '../Signup';
import { PATHS } from './Paths';
import { useAuth } from '../../contexts/Authcontext';

const UseRouter = () => {
  const { isAuthenticated } = useAuth();

  const routes = useRoutes([
    { path: PATHS.login, element: isAuthenticated ? <Navigate to={PATHS.home} /> : <Login /> },
    {
      path: PATHS.home,
      element: isAuthenticated ? <ProtectedRoute /> : <Navigate to={PATHS.login} />,
      children: [
        { index: true, element: <Home /> },
        { path: PATHS.cart, element: <Cart /> }
      ]
    },
    { path: PATHS.register, element: <Signup /> },
    { path: "*", element: <h2>Page not found</h2> }
  ]);

  return { routes };
}

export default UseRouter;
