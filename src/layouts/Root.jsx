import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";

export default function Root() {
  return (
    <div>
      <div className="bg-base-100">
        <Navbar/>
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
