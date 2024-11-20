import React from "react";
import { Outlet } from "react-router-dom";


export default function Root() {
  return (
    <div>
      <div className="bg-base-100">
        
      </div>
      <div className="min-h-screen ">
        <Outlet />
      </div>
      <div>
        
      </div>
    </div>
  );
}