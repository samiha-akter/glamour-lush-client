import React, { useEffect, useState } from "react";
import useUserData from "../../../hooks/useUserData";
import axios from "axios";
import ProductCard from "../../../components/ProductCard";
import Loading from "../../Loading";
import Heading from "../../../components/Heading";

export default function MyCart() {
  const [cart, setCart] = useState([]);
  const userData = useUserData();
  const token = localStorage.getItem("access-token");
  const [loading, setLoading] = useState(false);
  const [latestData, setLatestData] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);

      await axios
        .get(`${import.meta.env.VITE_BASE_URL}/cart/${userData._id}`, {
          headers: { 'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        })
        .then((res) => {
          setCart(res.data);
          setLoading(false);
        });
    };
    if (userData._id && token) {
      fetchCart();
    }
  }, [token, userData._id, latestData]);

  return (
    <div>
      <Heading text={"My Cart"}/>
      <div>
        {loading ? (
          <Loading />
        ) : (
          <>
            {cart.length === 0 ? (
              <div className="w-full h-full items-center justify-center">
                <h1 className="text-3xl font-bold text-center">No Products Found.</h1>
              </div>
            ) : (
              <div className="min-h-screen grid grid-cols-1 lg:grid-cols-3 gap-5 p-5">
                {cart.map((product) => (
                  <ProductCard key={product._id} product={product} isInCart setLatestData={setLatestData} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
