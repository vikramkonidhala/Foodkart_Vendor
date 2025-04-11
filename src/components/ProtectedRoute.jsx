import React from "react";
import { Navigate } from "react-router-dom";
import Cookie from "js-cookie";

const ProtectedRoute = (props) => {
  const Component = props.component;
  const token = Cookie.get("token");

  return token ? <Component /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
