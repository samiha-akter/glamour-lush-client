import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { FaBars, FaUsers } from "react-icons/fa";
import useUserData from "../../hooks/useUserData";
import { NavLink } from "react-router-dom";
import { GrOverview } from "react-icons/gr";
import { IoHomeOutline } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { MdOutlineInventory2 } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import UserDropdown from "../UserDropdown";
import Dropdown from "./Dropdown";

const sellerRoutes = [
  {
    id: 1,
    route: "/dashboard/my-products",
    icon: <MdOutlineInventory2 />,
    title: "My Products",
  },
  {
    id: 2,
    route: "/dashboard/add-products",
    icon: <IoMdAddCircleOutline />,
    title: "Add Products",
  },
];

const buyerRoutes = [
  {
    id: 1,
    route: "/dashboard/wishlist",
    icon: <FaRegHeart />,
    title: "Wishlist",
  },
  {
    id: 2,
    route: "/dashboard/cart",
    icon: <BsCart4 />,
    title: "Cart",
  },
];

const adminRoutes = [
  {
    id: 1,
    route: "/dashboard/all-users",
    icon: <FaUsers />,
    title: "All Users",
  },
];

export default function DashNavbar() {
  const { user, Logout } = useAuth();
  const userData = useUserData();
  const [wishlistLength, setWishlistLength] = useState(
    userData?.wishlist?.length || 0
  );
  useEffect(() => {
    if (userData?.wishlist) {
      setWishlistLength(userData.wishlist.length);
    }
  }, [userData?.wishlist]);
  return (
    <div className="navbar bg-base-100 px-7">
      <div className="flex-1">
        {/* Sidebar Toggle */}
        <label htmlFor="my-drawer" className="drawer-button cursor-pointer">
          <FaBars size={20} />
        </label>
      </div>

      {/* Sidebar */}
      <input id="my-drawer" type="checkbox" className="drawer-toggle hidden" />
      <div className="drawer-side fixed top-0 left-0 z-50 h-full">
        {/* Overlay */}
        <label
          htmlFor="my-drawer"
          className="drawer-overlay fixed inset-0 bg-black opacity-50"
          aria-label="Close Sidebar"
        ></label>

        {/* Sidebar Content */}
        <ul className="menu bg-purple-400 text-white w-80 p-4 pt-20 h-full">
          <li className="p-2">
            <NavLink
              to="/dashboard/overview"
              className="flex items-center gap-2"
            >
              <GrOverview />
              <p>Overview</p>
            </NavLink>
          </li>
          {userData.role === "seller" &&
            sellerRoutes?.map((route) => (
              <li key={route.id} className="p-2">
                <NavLink to={route.route} className="flex items-center gap-2">
                  <>{route.icon}</>
                  <p>{route.title}</p>
                </NavLink>
              </li>
            ))}
          {userData.role === "buyer" &&
            buyerRoutes?.map((route) => (
              <li key={route.id} className="p-2">
                <NavLink to={route.route} className="flex items-center gap-2">
                  <>{route.icon}</>
                  <p>{route.title}</p>
                </NavLink>
              </li>
            ))}
          {userData.role === "admin" &&
            adminRoutes?.map((route) => (
              <li key={route.id} className="p-2">
                <NavLink to={route.route} className="flex items-center gap-2">
                  <>{route.icon}</>
                  <p>{route.title}</p>
                </NavLink>
              </li>
            ))}
          <li className="p-2">
            <NavLink to="/" className="flex items-center gap-2">
              <IoHomeOutline />
              <p>Home</p>
            </NavLink>
          </li>
          <li className="p-2" onClick={() => Logout()}>
            <NavLink to="/" className="flex items-center gap-2">
              <BiLogOut />
              <p>Logout</p>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Right Section */}
      <div className="flex-none">
        {/* Wishlist Indicator */}
        {userData.role === "buyer" && (
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">
                {wishlistLength}
              </span>
            </div>
          </div>
        )}

        {/* User Avatar */}
        {/* <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            <img alt="User Avatar" src="/user.png" />
          </div>
        </div> */}
        <Dropdown/>
      </div>
    </div>
  );
}
