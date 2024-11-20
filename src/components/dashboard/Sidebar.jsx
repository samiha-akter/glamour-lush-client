import { NavLink } from "react-router-dom";
import { GrOverview } from "react-icons/gr";
import { IoHomeOutline } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { MdOutlineInventory2 } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import useUserData from "../../hooks/useUserData";
import useAuth from "../../hooks/useAuth";
import { FaRegHeart } from "react-icons/fa";
import { useState } from "react";

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
];
export default function Sidebar() {
  const userData = useUserData();
  const { Logout } = useAuth();

  return (
    <div className="bg-purple-600 px-8 py-16 text-white h-full min-h-screen">
      <h1 className="text-center text-3xl font-bold mb-8">Glamour Lush</h1>
      <ul className="flex flex-col gap-2">
        <li className="p-2">
          <NavLink to="/dashboard/overview" className="flex items-center gap-2">
            <GrOverview />
            <p>Overview</p>
          </NavLink>
        </li>
        {userData.role === "seller" &&
          sellerRoutes.map((route) => (
            <li key={route.id} className="p-2">
              <NavLink to={route.route} className="flex items-center gap-2">
                <>{route.icon}</>
                <p>{route.title}</p>
              </NavLink>
            </li>
          ))}
        {userData.role === "buyer" &&
          buyerRoutes.map((route) => (
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
  );
}
