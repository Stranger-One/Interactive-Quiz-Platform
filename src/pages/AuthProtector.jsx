import React, { useEffect } from "react";
import { useAuth } from "../contexts/authContext";
import { useLocation, useNavigate } from "react-router-dom";

const AuthProtector = ({ children }) => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setUser({
        fullname: "",
        email: "",
        isAuthenticated: false,
      });
    } else {
      const [email, fullName, password] = token.split(":");
      setUser({
        fullname: fullName,
        email,
        isAuthenticated: true,
      });
    }
  }, [ token]);

  useEffect(() => {
    if (token && pathname.includes("/auth")) {
      navigate("/");
    } else if (!token && !pathname.includes("/auth")) {
      navigate("/auth/signin");
    }
  }, [token, pathname]);

  return <>{children}</>;
};

export default AuthProtector;
