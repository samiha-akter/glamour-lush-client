import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import DashNavbar from "../components/dashboard/DashNavbar";

export default function Dashboard() {
  return (
    <div>
      <div>
        <DashNavbar />
      </div>
      <div className="min-h-screen ">
        <Outlet />
      </div>
    </div>
  );
}
