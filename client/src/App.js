import { Container } from "@mui/material";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState, useEffect } from "react";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  console.log("render");

  useEffect(() => {
    console.log("Component will mount");
  }, []);

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
      {showLogin ? (
        <Login setShowLogin={setShowLogin} />
      ) : (
        <Signup setShowLogin={setShowLogin} />
      )}

      {/* <Stack
        direction="column"
        spacing={2}
      >
        <Button
          variant="contained"
          size="large"
        >
          Login
        </Button>
        <Button
          variant="contained"
          size="large"
        >
          Signup
        </Button>
      </Stack> */}
    </Container>
  );
}

export default App;
