import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";

export default function GoogleLogin() {
  const { GoogleLogin } = useAuth();
  const navigate = useNavigate();
  const handleGoogleLogin = () => {
    GoogleLogin().then(() => {
      navigate("/");
    });
  };
  return (
    <div>
      <div className="divider">OR</div>

      <div>
        <button
          onClick={handleGoogleLogin}
          className="btn bg-purple-400 text-white btn-outline w-full"
        >
          <FcGoogle size={24} /> Register with Google
        </button>
      </div>
    </div>
  );
}
