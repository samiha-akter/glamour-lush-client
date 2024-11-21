import React, { useEffect, useState } from "react";
import CategoriesCard from "../CategoriesCard";
import axios from "axios";

export default function Carousel() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCat = async () => {
      try {
        const res = await axios.get("./categories.json");
        setCategories(res.data.categories);
        // console.log(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCat();
  }, []);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 items-center justify-center">
      {categories.map((category) => (
        <CategoriesCard key={category.id} title={category.title} />
      ))}
    </div>
  );
}
