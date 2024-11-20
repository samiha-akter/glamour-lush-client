import React from "react";
import { IoMdSearch } from "react-icons/io";
export default function SearchBar({ handleSearch }) {
  return (
    <form action="" className="flex items-center" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search Products"
        name="search"
        className="max-w-md p-[11px] border border-purple-400 rounded-l-md"
      />
      <button className="btn bg-purple-400 text-white rounded-l-none">
        <IoMdSearch size={20} />
      </button>
    </form>
  );
}
