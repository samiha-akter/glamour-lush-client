import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import SortByPrice from "../components/SortByPrice";
import FilterBar from "../components/product/FilterBar";
import axios from "axios";
import Loading from "./Loading";
import ProductCard from "../components/ProductCard";
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [uniqueBrand, setUniqueBrand] = useState([]);
  const [uniqueCategory, setUniqueCategory] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    const fetch = async () => {
      axios
        .get(
          `${
            import.meta.env.VITE_BASE_URL
          }/all-products?title=${search}&page=${page}&limit=${6}&sort=${sort}&brand=${brand}&category=${category}`
        )
        .then((res) => {
          setProducts(res.data.products);
          setUniqueBrand(res.data.brands);
          setUniqueCategory(res.data.categories);
          setTotalPages(Math.ceil(res.data.totalProducts / 6));
          setLoading(false);
        });
    };
    fetch();
  }, [search, sort, brand, category, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.search.value);
    e.target.search.value = "";
  };
  const handleReset = () => {
    setBrand("");
    setSearch("");
    setCategory("");
    setSort("asc");
    window.location.reload();
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="my-8 text-2xl font-semibold text-center">All Products</h1>
      {/* Search and Sort */}
      <div className="flex flex-col lg:flex-row gap-3 justify-between items-center w-full mb-6">
        <SearchBar handleSearch={handleSearch} />
        <SortByPrice setSort={setSort} />
      </div>
      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Filter Bar */}
        <div className="lg:col-span-3">
          <FilterBar
            setBrand={setBrand}
            setCategory={setCategory}
            handleReset={handleReset}
            uniqueBrand={uniqueBrand}
            uniqueCategory={uniqueCategory}
          />
        </div>
        {/* Products List */}
        <div className="lg:col-span-9">
          {loading ? (
            <Loading />
          ) : (
            <>
              {products.length === 0 ? (
                <div className="flex items-center justify-center min-h-[50vh]">
                  <h1 className="text-3xl font-bold text-center">
                    No Products Found.
                  </h1>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {products?.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              )}
            </>
          )}
          {/* Pagination */}
          {products.length !== 0 && (
            <div className="flex justify-center items-center gap-4 mt-8 mb-5">
              <button
                className="rounded-full hover:bg-white text-purple-400 disabled:opacity-50"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                <FaRegArrowAltCircleLeft size={26} />
              </button>
              <p>
                Page {page} of {totalPages}
              </p>
              <button
                className="rounded-full hover:bg-white text-purple-400 disabled:opacity-50"
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
              >
                <FaRegArrowAltCircleRight size={26} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
