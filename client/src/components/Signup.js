import { useState, useRef, useEffect } from "react";
import {
  Modal,
  Box,
  Button,
  Stack,
  FormControl,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  FormLabel,
  InputAdornment,
  Avatar,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Styles from "../styles/Styles";

const Login = ({ setShowLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [image, setImage] = useState(null);
  const [gender, setGender] = useState("Male");
  const [previewImage, setPreviewImage] = useState();
  const [open, setOpen] = useState(false);
  const [inventory, setInventory] = useState([]);

  const username = useRef();
  const name = useRef();
  const age = useRef();
  const password = useRef();
  const longitude = useRef();
  const latitude = useRef();

  const toggleOpen = () => {
    setOpen(!open);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleUploadImage = (event) => {
    setImage(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleAvatarClick = () => {
    const fileInput = document.getElementById("profilePicture");
    fileInput.click();
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleQuantityChange = (index, value) => {
    setInventory((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index].quantity = value;
      return updatedItems;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedResources = inventory.map(({ _id, item, quantity }) => ({
        item: _id,
        quantity,
      }));

      const survivorObj = {
        name: name.current.value,
        username: username.current.value,
        age: age.current.value,
        gender,
        password: password.current.value,
        last_location: {
          longitude: longitude.current.value,
          latitude: latitude.current.value,
        },
        role: "survivor",
        isInfected: false,
        resources: updatedResources,
        reportCount: 0,
        reportHistory: [],
      };

      const data = new FormData();
      data.append("file", image);
      data.append("survivorObj", JSON.stringify(survivorObj));

      const response = await axios.post(
        "http://localhost:3001/api/v1/signup",
        data
      );

      toast.success(response.data.message);

      setTimeout(() => {
        setShowLogin(true);
      }, 2000);
    } catch (err) {
      toast.error(err.response.data.message);
      setShowError(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/v1/getInventory"
        );
        setInventory(response.data.updatedInventory);
      } catch (err) {}
    };

    fetchData();
  }, []);

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
            <Avatar
              className="mx-auto"
              src={previewImage}
              title="Upload Image"
              sx={{
                width: 200,
                height: 200,
                cursor: "pointer",
                transition: "opacity 0.3s",
                "&:hover": {
                  opacity: 0.7,
                },
              }}
              onClick={handleAvatarClick}
            />
            <input
              type="file"
              id="profilePicture"
              style={{ display: "none" }}
              onChange={handleUploadImage}
            />
            <TextField
              label="Name"
              variant="outlined"
              name="fullName"
              type="text"
              inputRef={name}
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
              InputProps={{ inputProps: { min: 0 } }}
              required
            />
            <Stack direction="row">
              <TextField
                label="Longitude"
                variant="outlined"
                name="longitude"
                type="number"
                inputRef={longitude}
                required
              />
              <TextField
                label="Latitude"
                variant="outlined"
                name="latitude"
                type="number"
                inputRef={latitude}
                required
              />
            </Stack>
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
              variant="contained"
              onClick={toggleOpen}
            >
              Add Inventory
            </Button>
            <Modal
              open={open}
              onClose={toggleOpen}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={Styles.Modal}>
                <Typography
                  id="modal-modal-title"
                  variant="h3"
                  component="h1"
                >
                  Items
                </Typography>
                <Grid
                  container
                  spacing={2}
                >
                  {inventory?.map((item, index) => (
                    <Grid
                      item
                      xs={12}
                      className="d-flex align-items-center"
                      key={index}
                    >
                      <Grid
                        item
                        xs={6}
                      >
                        {item.item}
                      </Grid>
                      <TextField
                        type="number"
                        label="Quantity"
                        value={item.quantity}
                        InputProps={{ inputProps: { min: 0 } }}
                        onChange={(e) =>
                          handleQuantityChange(index, e.target.value)
                        }
                      />
                    </Grid>
                  ))}
                </Grid>
                <Button
                  variant="contained"
                  className="d-flex mt-4 mx-auto"
                  onClick={toggleOpen}
                >
                  Close
                </Button>
              </Box>
            </Modal>
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
