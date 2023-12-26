import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {
  Button,
  Stack,
  FormControl,
  TextField,
  InputAdornment,
  Typography,
} from "@mui/material";

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
        process.env.REACT_APP_AUTHENTICATION_API + "login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setAuth(response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("_id", response.data._id);

      toast.success(response.data.message);

      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (err) {
      const message = err.response.data.message;
      toast.error(message);
    }
  };

  return (
    <div className="bg-light d-flex flex-column justify-content-center align-items-center p-5 rounded">
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
    </div>
  );
};

export default Login;
