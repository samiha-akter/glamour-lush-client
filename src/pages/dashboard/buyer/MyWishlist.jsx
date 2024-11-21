import React, { useEffect, useState } from "react";
import useUserData from "../../../hooks/useUserData";
import axios from "axios";
import ProductCard from "../../../components/ProductCard";
import Loading from "../../Loading";
import Heading from "../../../components/Heading";

export default function MyWishlist() {
  const [wishlist, setWishlist] = useState([]);
  const userData = useUserData();
  const token = localStorage.getItem("access-token");
  const [loading, setLoading] = useState(false);
  const [latestData, setLatestData] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);

      await axios
        .get(`${import.meta.env.VITE_BASE_URL}/wishlist/${userData._id}`, {
          headers: { 'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        })
        .then((res) => {
          setWishlist(res.data);
          setLoading(false);
        });
    };
    if (userData._id && token) {
      fetchWishlist();
    }
  }, [token, userData._id, latestData]);

  return (
    <div>
      <Heading text={"My Wishlist"} />
      <div>
        {loading ? (
          <Loading />
        ) : (
          <>
            {wishlist.length === 0 ? (
              <div className="w-full h-full items-center justify-center">
                <h1 className="text-3xl font-bold text-center">
                  No Products Found.
                </h1>
              </div>
            ) : (
              <div className="min-h-screen grid grid-cols-1 lg:grid-cols-3 gap-5 p-5">
                {wishlist?.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    isInWishlist
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
