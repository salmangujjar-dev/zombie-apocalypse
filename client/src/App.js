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
  const { setAuth } = useAuth();
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    const getAuth = async (token) => {
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
          navigate("/home");
        } catch (error) {
          console.log(error);
        }
      }
      setIsAuthenticating(false);
    };

    getAuth(localStorage.getItem("token"));
  }, []);

  console.log("App Component");
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
