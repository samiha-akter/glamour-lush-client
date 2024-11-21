import React, { useEffect, useState } from "react";
import UserCard from "../../../components/user/UserCard";
import Loading from "../../Loading";
import Heading from "../../../components/Heading";
import axios from "axios"
export default function ViewUser() {
  const token = localStorage.getItem("access-token");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [latestData, setLatestData] = useState(true);
  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/all-users`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      setUsers(res.data);
    //   console.log(res.data)
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Users:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [latestData]);

  return (
    <div>
      <Heading text={"My Products"} />
      <div>
        {loading ? (
          <Loading />
        ) : (
          <>
            {users.length === 0 ? (
              <div className="w-full h-full items-center justify-center">
                <h1 className="text-3xl font-bold text-center">
                  No User Found.
                </h1>
              </div>
            ) : (
              <div className="min-h-screen grid grid-cols-1 lg:grid-cols-3 gap-5 p-5">
                {users.map((user) => (
                  <UserCard
                    key={user._id}
                    user={user}
                    setLatestData={setLatestData}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
