import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    props.loggedIn ? 
      <Component {...props} /> : <Navigate to="./sign-up" />
  )
};

export default ProtectedRoute;