import useAuth from "../../hooks/useAuth";
import Loading from "../../pages/Loading";
import { useLocation, Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();


  if (loading) {
    return <Loading />;
  }

  if (user) {
    return children;
  }

  return <Navigate to="/" state={{from: location}} replace />;
}
