import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../../components/ProductCard";
import useAuth from "../../../hooks/useAuth";
import useUserData from "../../../hooks/useUserData";
import Heading from "../../../components/Heading";
import Loading from "../../Loading";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [latestData, setLatestData] = useState(true);
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("access-token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/my-products`,

        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      setProducts(response.data);
      console.log(products);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [latestData]);

  return (
    <div>
      <Heading text={"My Products"} />
      <div>
        {loading ? (
          <Loading />
        ) : (
          <>
            {products.length === 0 ? (
              <div className="w-full h-full items-center justify-center">
                <h1 className="text-3xl font-bold text-center">
                  No Products Found.
                </h1>
              </div>
            ) : (
              <div className="min-h-screen grid grid-cols-1 lg:grid-cols-3 gap-5 p-5">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} setLatestData={setLatestData}/>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyProducts;
