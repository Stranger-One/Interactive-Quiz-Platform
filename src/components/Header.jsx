import React from "react";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../contexts/authContext";
import { MdOutlineLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate()

  const handleLogOut = () => {
    localStorage.removeItem("token")
    navigate("/auth/signin")
  };
  return (
    <div className="w-full px-4 sticky top-0 left-0 md:px-10 py-4 flex items-center justify-between bg-white z-20 shadow">
      <div className=""></div>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2 cursor-pointer">
          <FaUser size={20} />
          <h2 className="capitalize font-semibold text-lg">{user.fullname} </h2>
        </div>

        <div
          className="flex items-center justify-center p-1 cursor-pointer border-2 border-gray-700 rounded-lg"
          onClick={handleLogOut}
        >
          <MdOutlineLogout size={24} className="font-semibold" />
        </div>
      </div>
    </div>
  );
};

export default Header;
