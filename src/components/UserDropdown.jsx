import useAuth from "../hooks/useAuth";
import { NavLink } from "react-router-dom";
import useUserData from "../hooks/useUserData";
import { useEffect, useState } from "react";

export default function UserDropdown() {
  const { user, Logout } = useAuth();
  const userData = useUserData();
  const [wishlistLength, setWishlistLength] = useState(
    userData?.wishlist?.length || 0
  );

  const handleLogout = () => {
    Logout();
  };

  useEffect(() => {
    if (userData?.wishlist) {
      setWishlistLength(userData.wishlist.length);
    }
  }, [userData?.wishlist]);
  
  const dropItems = (
    <>
      <li>
        <NavLink to="/dashboard/overview">Dashboard</NavLink>
      </li>
      {userData.role === "buyer" && (
        <li>
          <button className="btn bg-white text-black btn-sm border-2 border-purple-400">
            Wishlist: {wishlistLength}
          </button>
        </li>
      )}
      <li>
        <button
          className="btn bg-purple-400 text-white btn-sm btn-outline"
          onClick={handleLogout}
        >
          Logout
        </button>
      </li>
    </>
  );
  return (
    <div>
      <div className="dropdown dropdown-bottom dropdown-end">
        <div tabIndex={0} role="button" className="flex items-center">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={`${user?.photoURL || "/user.png"}`} />
            </div>
          </div>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow flex flex-col gap-2"
        >
          {dropItems}
        </ul>
      </div>
    </div>
  );
}
