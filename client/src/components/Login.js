import { useState, useRef } from "react";
import {
  Button,
  Stack,
  FormControl,
  TextField,
  InputAdornment,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Login = ({ setShowLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const username = useRef();
  const password = useRef();

  const { setAuth } = useAuth();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        username: username.current.value,
        password: password.current.value,
      };

      const response = await axios.post(
        "http://localhost:3001/api/v1/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setAuth(response.data.body);
      localStorage.setItem("token", response.data.body.token);

      toast.success(response.data.message);

      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (err) {
      console.log(err);
      const message = err.response.data.message;
      toast.error(message);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        theme="dark"
        autoClose={2000}
      />
      <LockIcon fontSize="large" />
      <h1 className="mt-3">Login Page</h1>
      <form
        className="mt-4"
        onSubmit={handleSubmit}
      >
        <FormControl>
          <Stack
            spacing={2}
            direction="column"
          >
            <TextField
              label="Username"
              variant="outlined"
              name="username"
              type="username"
              inputRef={username}
              required
              autoFocus
            />
            <TextField
              label="Password"
              variant="outlined"
              name="password"
              type={showPassword ? "text" : "password"}
              inputRef={password}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    onClick={togglePassword}
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOffIcon />}
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
            >
              Login
            </Button>
          </Stack>
        </FormControl>
      </form>
      <Typography
        variant="body1"
        marginTop={3}
      >
        Don't have an account?{" "}
        <Typography
          component="span"
          variant="body1"
          color="primary"
          sx={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={() => setShowLogin(false)}
        >
          Sign up
        </Typography>
      </Typography>
    </>
  );
};

export default Login;
