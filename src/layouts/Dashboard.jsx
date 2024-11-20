import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/OverviewCard";
import DashNavbar from "../components/dashboard/DashNavbar";

export default function Dashboard() {
  return (
    <div>
      <div>
        <DashNavbar />
      </div>
      <div className="min-h-screen bg-purple-100">
        <Outlet />
      </div>
    </div>
  );
}
