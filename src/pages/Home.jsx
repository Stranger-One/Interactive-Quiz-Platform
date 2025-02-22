import React, { useState } from "react";
import { TestHistory } from "../components";
import { useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { useAuth } from "../contexts/authContext";

const Home = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  console.log({ user });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4 md:px-10">
      <h1 className="text-4xl font-bold mb-8">Interactive Quiz Platform</h1>
      <div className="w-full bg-white flex items-center justify-between max-w-2xl p-8 rounded-lg shadow-md">
        {/* <Quiz onQuizComplete={() => setRefreshHistory(!refreshHistory)} /> */}
        <h2 className="text-2xl font-semibold mb-4">Start a new quiz</h2>
        <button
          onClick={() => navigate("/test")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer flex items-center gap-2"
        >
          Start <FaPlay size={16} />
        </button>
      </div>
      <div className="w-full max-w-2xl  mt-8">
        <TestHistory />
      </div>
    </div>
  );
};

export default Home;
