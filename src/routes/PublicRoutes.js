import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PublicRoutes = ({ children, redirectLink }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  if (user) {
    return <Navigate to={redirectLink} state={{ from: location }} replace />;
  }
  return children;
};

export default PublicRoutes;
