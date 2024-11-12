import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ token, children }) => {
  return token ? children : <Navigate to="/users/signin" />;
};

export default ProtectedRoute;
