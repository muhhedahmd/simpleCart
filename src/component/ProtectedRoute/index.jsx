import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/Authcontext';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Outlet />;
  } else {
    // Redirect to the login page if not authenticated
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
