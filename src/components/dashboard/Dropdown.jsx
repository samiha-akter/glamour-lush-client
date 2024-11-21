import useAuth from "../../hooks/useAuth";

export default function Dropdown() {
  const { user, Logout } = useAuth(); 

  const handleLogout = () => {
    Logout();
  };

 

  const dropItems = (
    <>
      <li>
        <button
          className="text-white text-center hover:bg-purple-400  "
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
              <img src={`${user?.photoURL || "./user.png"}`} />
            </div>
          </div>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-purple-400 rounded-box z-[1] w-40 shadow flex flex-col gap-2 items-center"
        >
          {dropItems}
        </ul>
      </div>
    </div>
  );
}
