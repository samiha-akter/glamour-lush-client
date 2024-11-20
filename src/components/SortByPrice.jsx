import React from "react";

export default function SortByPrice({ setSort }) {
  return (
    <select
      className="p-[11px] max-w-md w-56 border border-purple-400 rounded-md"
      onChange={(e) => setSort(e.target.value)}
    >
      <option value="asc">Price: Low To High</option>
      <option value="desc">Price: High To Low</option>
    </select>
  );
}
