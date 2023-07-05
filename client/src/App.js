import { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import useAuth from "./hooks/useAuth";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Loader from "./components/Loader";

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
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
          navigate("/home");
        } catch (error) {}
      }
      setIsAuthenticating(false);
    };
    if (!auth?.token) {
      getAuth(localStorage.getItem("token"));
    }
  }, [auth, setAuth, navigate]);

  return (
    <>
      {isAuthenticating ? (
        <Loader />
      ) : (
        <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
          {showLogin ? (
            <Login setShowLogin={setShowLogin} />
          ) : (
            <Signup setShowLogin={setShowLogin} />
          )}
        </Container>
      )}
    </>
  );
}

export default App;
