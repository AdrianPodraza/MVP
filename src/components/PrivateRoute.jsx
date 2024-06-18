import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/signIn" replace />;
};

const isAuthenticated = () => {
  // Tu powinna być logika sprawdzająca, czy użytkownik jest zalogowany
  // Na przykład sprawdzenie tokenu w localStorage
  return localStorage.getItem("token") ? true : false;
};

export default PrivateRoute;
