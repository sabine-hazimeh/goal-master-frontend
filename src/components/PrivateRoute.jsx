import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthenticated } from "../auth.js";

const PrivateRoute = () => {
  const location = useLocation();  
  return isAuthenticated() ? (
    <Outlet />
  ) : (
    <Navigate to="/auth" state={{ from: location }} />
  );
};

export default PrivateRoute;
