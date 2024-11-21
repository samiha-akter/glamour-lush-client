import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create User
  const CreateUser = async (email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return result;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  };

  // Login
  const Login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  // Google Login
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result;
    } catch (error) {
      console.error("Error during Google login:", error);
      throw error;
    }
  };

  // Logout
  const Logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    }
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      try {
        setUser(currentUser);
        if (currentUser) {
          const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/authentication`,
            {
              email: currentUser.email,
            }
          );
          if (response.data && response.data.token) {
            localStorage.setItem("access-token", response.data.token);
          } else {
            console.warn("No token received from the server.");
          }
        } else {
          localStorage.removeItem("access-token");
        }
      } catch (error) {
        console.error("Error during authentication state change:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unSubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    CreateUser,
    Login,
    GoogleLogin,
    Logout,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
