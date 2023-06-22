import Navbar from "../components/Navbar";
import {
  Grid,
  Avatar,
  Box,
  Container,
  Toolbar,
  Button,
  Stack,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../components/Loader";

const Trade = () => {
  const [survivor, setSurvivor] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { auth } = useAuth();

  const handleReport = async () => {
    if (auth?.role !== "survivor") {
      toast.error("Only Survivor role can report.");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:3001/api/v1/reportSurvivor",
        { token: auth.token, victimId: auth._id, targetId: survivor._id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 400) {
        throw new Error(response);
      }
      toast.success(response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const token = auth?.token;
        const response = await axios.post(
          `http://localhost:3001/api/v1/fetchProfile/${id}`,
          { token },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setLoading(false);
        if (response.status === 400) {
          throw new Error(response);
        }
        setSurvivor(response.data.survivor);
      } catch (err) {
        toast.error(err.response.data.message);
      }
    };

    id && fetchProfile();
  }, []);

  const Field = ({ label, value }) => (
    <Grid
      item
      className="row"
      xs={12}
    >
      <Grid
        item
        xs={6}
      >
        {label}:
      </Grid>

      {value}
    </Grid>
  );

  if (loading) {
    return <Loader />;
  }

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
        {id ? (
          <Box className="d-flex justify-content-center">
            <Stack
              spacing={2}
              justifyContent="center"
            >
              <Avatar
                alt={survivor?.name}
                className="mx-auto"
                src={
                  survivor?.profile_image &&
                  `data:image/png;base64,${survivor?.profile_image}`
                }
                sx={{
                  width: 200,
                  height: 200,
                }}
              />
              <Grid
                container
                spacing={2}
              >
                <Field
                  label="Name"
                  value={survivor?.name}
                />
                <Field
                  label="Username"
                  value={survivor?.username}
                />
                <Field
                  label="Gender"
                  value={survivor?.gender}
                />
                <Field
                  label="Age"
                  value={survivor?.age}
                />
                <Field
                  label="Location"
                  value={JSON.stringify(survivor?.last_location)}
                />
                <Field
                  label="Report Count"
                  value={survivor?.reportCount}
                />
                <Field
                  label="Report History"
                  value={JSON.stringify(survivor?.reportHistory)}
                />
                <Field
                  label="isInfected"
                  value={JSON.stringify(survivor?.isInfected)}
                />
              </Grid>

              <Button
                variant="contained"
                disabled={survivor?.isInfected}
              >
                Trade
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleReport}
                disabled={survivor?.isInfected}
              >
                Report
              </Button>
            </Stack>
          </Box>
        ) : (
          <h1>Zero</h1>
        )}
      </Container>
    </>
  );
};

export default Trade;
