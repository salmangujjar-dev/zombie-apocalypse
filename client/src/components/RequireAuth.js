import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Loader from "./Loader";
import NotAuthorized from "./NotAuthorized";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth, setAuth } = useAuth();
  const location = useLocation();
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    const getAuth = async (token) => {
      if (token) {
        try {
          const _id = localStorage.getItem("_id");
          const response = await axios.get(
            process.env.REACT_APP_SURVIVOR_API + _id,
            {
              headers: {
                "Content-Type": "application/json",
                token,
              },
            }
          );
          setAuth(response.data.survivor);
        } catch (error) {}
      }
      setIsAuthenticating(false);
    };
    if (!auth?.username) {
      getAuth(localStorage.getItem("token"));
    } else {
      setIsAuthenticating(false);
    }
  }, [setAuth, auth]);

  if (isAuthenticating) {
    return <Loader />;
  }
  return allowedRoles.find((role) => auth?.role?.includes(role)) ? (
    <Outlet />
  ) : auth?.token ? (
    <NotAuthorized />
  ) : (
    <Navigate
      to="/"
      state={{ from: location }}
      replace
    />
  );
};

export default RequireAuth;
