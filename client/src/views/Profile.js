import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import {
  Button,
  Stack,
  FormControl,
  TextField,
  Toolbar,
  Container,
  RadioGroup,
  FormControlLabel,
  Radio,
  Avatar,
  FormLabel,
} from "@mui/material";
import useAuth from "../hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const Profile = () => {
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState();
  const [gender, setGender] = useState("Male");

  const { auth } = useAuth();

  const username = useRef();
  const name = useRef();
  const age = useRef();
  const longitude = useRef();
  const latitude = useRef();

  const handleUploadImage = (event) => {
    setImage(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleAvatarClick = () => {
    const fileInput = document.getElementById("profilePicture");
    fileInput.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedSurvivorObj = {
        name: name.current.value,
        age: age.current.value,
        username: auth?.username,
        gender,
        last_location: {
          longitude: longitude.current.value,
          latitude: latitude.current.value,
        },
      };
      const data = new FormData();
      data.append("file", image);
      data.append("updatedSurvivorObj", JSON.stringify(updatedSurvivorObj));
      data.append("token", localStorage.getItem("token"));

      await axios.put(
        `http://localhost:3001/api/v1/updateSurvivor/${auth._id}`,
        data
      );
      toast.info("Profile Updated!");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {}
  };

  useEffect(() => {
    if (auth?.profile_image) {
      setPreviewImage(`data:image/*;base64,${auth?.profile_image}`);
    }
  }, []);

  return (
    <>
      <ToastContainer
        position="top-center"
        theme="dark"
        autoClose={2000}
      />
      <Navbar />
      <Toolbar />
      <Container>
        <form
          className="d-flex justify-content-center"
          onSubmit={handleSubmit}
        >
          <FormControl>
            <Stack
              spacing={2}
              direction="column"
            >
              <Avatar
                alt={auth?.name}
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
                required
                autoComplete="on"
                disabled
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
              <Stack direction="row">
                <TextField
                  label="Longitude"
                  variant="outlined"
                  name="longitude"
                  type="number"
                  defaultValue={auth?.last_location?.longitude}
                  inputRef={longitude}
                  required
                />
                <TextField
                  label="Latitude"
                  variant="outlined"
                  name="latitude"
                  type="number"
                  defaultValue={auth?.last_location?.latitude}
                  inputRef={latitude}
                  required
                />
              </Stack>
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
