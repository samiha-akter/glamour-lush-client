import useAuth from "../../hooks/useAuth";
import useUserData from "../../hooks/useUserData";
import Loading from "../../pages/Loading";
import { useLocation, Navigate } from "react-router-dom";

export default function BuyerRoute({ children }) {
  const { user, loading } = useAuth();
  const userData = useUserData();
  const location = useLocation();

  if (loading || !userData.role) {
    return <Loading />;
  }

  if (user && userData.role === "buyer") {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
}
