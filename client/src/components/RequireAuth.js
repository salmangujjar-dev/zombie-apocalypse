import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";

const RequireAuth = ({ allowedRoles }) => {
  const { auth, setAuth } = useAuth();
  const location = useLocation();
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    const getAuth = async (token) => {
      if (!token) {
        token = localStorage.getItem("token");
      }

      if (token) {
        try {
          const response = await axios.post(
            "http://localhost:3001/api/v1/fetchSurvivorWithToken",
            { token: token },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          setAuth(response.data.data);
        } catch (error) {
          console.log(error);
        }
      }
      setIsAuthenticating(false);
    };
    if (!auth.token) {
      console.log("true");
      getAuth(auth.token);
    } else {
      setIsAuthenticating(false);
    }
  }, []);

  if (isAuthenticating) {
    return <Loader />;
  }

  return allowedRoles.find((role) => auth?.role?.includes(role)) ? (
    <Outlet /> /* Renders Child Routes */
  ) : auth?.token ? (
    <h1>You are not authorized to view this page.</h1>
  ) : (
    <Navigate
      to="/"
      state={{ from: location }}
      replace
    />
  );
};

export default RequireAuth;
