import React, { useState } from "react";
import { Link } from "react-router-dom";
import { hashPassword } from "../utils/password";
import db from "../database/db";
import { useAuth } from "../contexts/authContext";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const {user, setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate an API call

    const isExistingUsers = await db.userData.toArray();
    const isExistingUser = isExistingUsers.filter((user) => user.email === email);

    console.log({ isExistingUsers, isExistingUser });
      
    if (isExistingUser.length > 0) {
      alert("Email already exists");
      setLoading(false);
      return;
    }

    const hashedPassword = hashPassword(password);

    const userData = {
      fullName,
      email,
      password: hashedPassword,
    };
    console.log({ userData, password, hashedPassword });

    await db.userData.add(userData); // Save quiz result and review to the database
    localStorage.setItem("token", `${email}:${fullName}:${hashedPassword}`);

    setUser({
      fullname: fullName,
      email,
      isAuthenticated: true,
    })
    
    alert("Sign Up successful");

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Full Name:
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
          <div className="">
            <p className="text-sm font-semibold">
              Already have an account?{" "}
              <Link to="/auth/signin" className="text-blue-600">
                Sign In
              </Link>{" "}
              here.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
