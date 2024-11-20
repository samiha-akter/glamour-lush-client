import useAuth from "../../hooks/useAuth";
import useUserData from "../../hooks/useUserData";
import Loading from "../../pages/Loading";
import { useLocation, Navigate } from "react-router-dom";

export default function SellerRoute({ children }) {
  const { user, loading } = useAuth();
  const userData = useUserData();
  const location = useLocation();

  if (loading || !userData.role) {
    return <Loading />;
  }

  if (user && userData.role ==="seller") {
    return children;
  }

  
  return <Navigate to="/login" state={{from: location}} replace />;
}
