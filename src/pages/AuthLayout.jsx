import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="w-full h-screen bg-gray-400 flex items-center justify-center px-10">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
