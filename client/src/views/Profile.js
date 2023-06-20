import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import {
  Modal,
  Box,
  Button,
  Stack,
  FormControl,
  TextField,
  Toolbar,
  Container,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  FormLabel,
  InputAdornment,
  Typography,
} from "@mui/material";
import useAuth from "../hooks/useAuth";
import { ToastContainer } from "react-toastify";
import Styles from "../styles/Styles";

const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [uploadImageText, setUploadImageText] = useState("Choose Image");
  const [inventory, setInventory] = useState([]);
  const [gender, setGender] = useState("Male");

  const { auth } = useAuth();

  const username = useRef();
  const name = useRef();
  const age = useRef();

  const toggleOpen = () => {
    setOpen(!open);
  };

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

  const handleQuantityChange = (index, value) => {
    setInventory((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index].quantity = value;
      return updatedItems;
    });
  };

  const handleSubmit = (e) => {
    e.preventdefault();
  };

  useEffect(() => {
    console.log(auth);
  }, []);
  console.log("Profile");

  return (
    <>
      <ToastContainer
        position="top-center"
        theme="dark"
        autoClose={2000}
      />
      <Navbar />
      <Toolbar />
      <Container
        sx={{
          justifyContent: "center",
          display: "flex",
        }}
      >
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
                label="Name"
                variant="outlined"
                name="fullName"
                type="text"
                defaultValue={auth?.name}
                inputRef={name}
                required
                autoFocus
              />
              <TextField
                label="Username"
                variant="outlined"
                name="username"
                type="text"
                defaultValue={auth?.username}
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
                defaultValue={auth?.age}
                inputRef={age}
                InputProps={{ inputProps: { min: 0 } }}
                required
              />
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={auth?.gender}
                name="gender"
                onChange={handleGenderChange}
                className="justify-content-around align-items-center"
                required
              >
                <FormLabel id="demo-radio-buttons-group-label">
                  Gender:
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
                    {auth?.resources?.map((item, index) => (
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
                Update
              </Button>
            </Stack>
          </FormControl>
        </form>
      </Container>
    </>
  );
};

export default Profile;
