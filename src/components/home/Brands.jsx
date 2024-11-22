import React, { useEffect, useState } from "react";
import CategoriesCard from "./CategoriesCard";
import axios from "axios";
import BrandCard from "./BrandCard";

export default function Brands() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchCat = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/all-products`
        );
        setBrands(res.data.brands);
        // console.log(res.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCat();
  }, []);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 items-center justify-center p-5">
      {brands.map((brand, index) => (
        <BrandCard key={index} title={brand} />
      ))}
    </div>
  );
}
