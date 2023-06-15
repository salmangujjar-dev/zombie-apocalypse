import { useState, useRef, useEffect } from "react";
import {
  Button,
  Stack,
  FormControl,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
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
  const [image, setImage] = useState(null);
  const [gender, setGender] = useState("Male");
  const [uploadImageText, setUploadImageText] = useState("Choose Image");

  const username = useRef();
  const name = useRef();
  const age = useRef();
  const password = useRef();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleUploadImage = (event) => {
    setImage(event.target.files[0]);
    setUploadImageText(event.target.files[0].name);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const survivorObj = {
        name: name.current.value,
        username: username.current.value,
        age: age.current.value,
        gender: gender,
        password: password.current.value,
        last_location: { longitude: 20, latitude: 20 },
        isInfected: false,
      };

      const data = new FormData();
      data.append("file", image);
      data.append("survivorObj", JSON.stringify(survivorObj));

      const response = await fetch(
        "http://localhost:3001/api/v1/createSurvivor",
        {
          method: "POST",
          body: data,
        }
      );

      const { message } = await response.json();
      if (response.status === 201) {
        toast.success(message);
        setTimeout(() => {
          setShowLogin(true);
        }, 3000);
      } else {
        toast.error(message);
        setShowError(true);
      }
    } catch (err) {
      console.log(err);
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
      <h1 className="mt-3">Sign up Page</h1>
      <form
        className="mt-4"
        onSubmit={handleSubmit}
      >
        <FormControl>
          <Stack
            spacing={2}
            direction="column"
          >
            <Button
              variant="contained"
              component="label"
            >
              {uploadImageText}
              <input
                hidden
                accept="image/*"
                type="file"
                name="profile_image"
                onChange={handleUploadImage}
              />
            </Button>
            <TextField
              label="Name"
              variant="outlined"
              name="fullName"
              type="text"
              inputRef={name}
              error={showError}
              required
              autoFocus
            />
            <TextField
              label="Username"
              variant="outlined"
              name="username"
              type="text"
              inputRef={username}
              error={showError}
              required
              autoComplete="on"
            />
            <TextField
              label="Age"
              variant="outlined"
              name="age"
              type="number"
              inputRef={age}
              error={showError}
              InputProps={{ inputProps: { min: 0 } }}
              required
            />
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="Male"
              name="gender"
              onChange={handleGenderChange}
              className="justify-content-around align-items-center"
              required
            >
              <FormLabel id="demo-radio-buttons-group-label">
                Gender:{" "}
              </FormLabel>
              <FormControlLabel
                value="Male"
                control={<Radio />}
                label="Male"
              />
              <FormControlLabel
                value="Female"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
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
              autoComplete="new-password"
            />
            <Button
              type="submit"
              variant="contained"
            >
              Signup
            </Button>
          </Stack>
        </FormControl>
      </form>
      <Typography
        variant="body1"
        marginTop={3}
      >
        Have an account?{" "}
        <Typography
          component="span"
          variant="body1"
          color="primary"
          sx={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={() => setShowLogin(true)}
        >
          Login
        </Typography>
      </Typography>
    </>
  );
};

export default Login;
