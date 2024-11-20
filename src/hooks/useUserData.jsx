import React, { useEffect, useState } from "react";
import useAuth from "./useAuth";
import axios from "axios";

export default function useUserData() {
  const { user, loading } = useAuth();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/user/${user.email}`
      );
      setUserData(res.data);
    };

    if (user?.email && !loading) {
      fetchUserData();
    }
  }, [user, loading]);
  return userData;
}
