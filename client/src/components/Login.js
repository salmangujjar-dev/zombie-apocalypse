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

const Login = ({ setShowLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);

  const email = useRef();
  const password = useRef();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {" "}
      <ToastContainer
        position="top-center"
        theme="dark"
        hideProgressBar
        autoClose={3000}
      />
      <LockIcon fontSize="large" />
      <h1 className="mt-3">Login Page</h1>
      <form className="mt-4">
        <FormControl>
          <Stack
            spacing={2}
            direction="column"
          >
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              type="email"
              inputRef={email}
              error={showError}
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
              error={showError}
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
