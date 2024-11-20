import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";

export default function Dashboard() {
  return (
    <div className="grid lg:grid-cols-12">
      <div className="col-span-2">
        <Sidebar />
      </div>
      <div className="col-span-10 p-12">
        <Outlet />
      </div>
    </div>
  );
}
