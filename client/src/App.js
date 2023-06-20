import { Container } from "@mui/material";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import axios from "axios";
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
          const response = await axios.post(
            `http://localhost:3001/api/v1/fetchProfile/${_id}`,
            { token },
            {
              headers: {
                "Content-Type": "application/json",
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
  }, []);

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
