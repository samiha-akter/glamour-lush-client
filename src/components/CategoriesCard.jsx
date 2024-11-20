import React from "react";

export default function CategoriesCard({ title }) {
  return (
    <div className="card bg-base-100 w-40 lg:w-72 shadow-xl border-2 border-purple-400 border-t-0 border-r-0 border-b-0">
      <div className="card-body ">
        <h2 className="card-title font-semibold">{title}</h2>
      </div>
    </div>
  );
}
