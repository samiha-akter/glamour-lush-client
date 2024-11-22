import React from "react";

export default function BrandCard({ title }) {
  return (
    <div className="card bg-base-100 w-40 lg:w-72 shadow-xl border-2 border-purple-400 border-t-0 border-r-0 border-b-0">
      <div className="card-body flex items-center justify-center gap-3 flex-row-reverse ">
        <h2 className="card-title font-bold lg:text-2xl">{title}</h2>
      </div>
    </div>
  );
}
