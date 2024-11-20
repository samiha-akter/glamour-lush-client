import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import Loading from "../../pages/Loading";
import axios from "axios";
const FeaturedProducts = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setLoading(true);
    const fetch = async () => {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/all-products?limit=${6}`)
        .then((res) => {
          setProducts(res.data.products);
          setLoading(false);
        });
    };
    fetch();
  }, []);
  return (
    <div className="lg:flex items-center justify-between gap-4">
      {loading ? (
        <Loading />
      ) : (
        <>
          {products.length === 0 ? (
            <div className="w-full h-full items-center justify-center">
              <h1 className="text-3xl font-bold text-center">No Products Found.</h1>
            </div>
          ) : (
            <div className="min-h-screen grid grid-cols-3 gap-5 pb-5">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FeaturedProducts;