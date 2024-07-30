import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/signIn" replace />;
};

const isAuthenticated = () => {
  return localStorage.getItem("token") ? true : false;
};

export default PrivateRoute;
