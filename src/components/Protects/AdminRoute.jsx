import { Navigate } from 'react-router-dom';

const AdminRoute = ({ isAdmin, children }) => {
  return isAdmin ? children : <Navigate to="/menuform" />;
};

export default AdminRoute;