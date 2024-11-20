import React from "react";

const ReviewCard = ({ desc, name }) => {
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <div className="card-body">
        <p>{desc}</p>
        <div className=" flex flex-row items-center justify-between">
          <h2 className="card-title">{name}</h2>
          <img src="./woman.png" alt="" className="w-8 h-8 object-cover" />
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
