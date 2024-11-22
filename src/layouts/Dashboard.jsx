import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/OverviewCard";
import DashNavbar from "../components/dashboard/DashNavbar";
import Footer from "../shared/Footer";

export default function Dashboard() {
  return (
    <div>
      <div>
        <DashNavbar />
      </div>
      <div className="min-h-screen ">
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
