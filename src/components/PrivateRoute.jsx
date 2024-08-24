import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../auth.js";

const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/auth" />;
};

export default PrivateRoute;
