import React from "react";
import useUserData from "../../hooks/useUserData";

export default function OverviewCard() {
  const userData = useUserData();
  return (
    <div className="stats stats-vertical lg:stats-horizontal shadow-xl border-2 border-r-4 border-purple-400 border-b-0">
      <div className="stat">
        <div className="stat-title">Email</div>
        <div className="stat-value">{userData.email}</div>
      </div>

      <div className="stat">
        <div className="stat-title">{userData.role}</div>
        <div className="stat-value">{userData.status}</div>
      </div>

      {userData.role === "buyer" && (
        <div className="stat">
          <div className="stat-title">Wishlist</div>
          <div className="stat-value">
            {userData.wishlist && userData.wishlist.length > 0
              ? userData.wishlist.length
              : 0}
          </div>
        </div>
      )}
      {userData.role === "buyer" && (
        <div className="stat">
          <div className="stat-title">Cart</div>
          <div className="stat-value">
            {userData.cart && userData.cart.length > 0
              ? userData.cart.length
              : 0}
          </div>
        </div>
      )}
    </div>
  );
}
