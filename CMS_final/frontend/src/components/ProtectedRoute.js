import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, authToken }) => {
  return authToken ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;