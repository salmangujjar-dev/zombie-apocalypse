import Navbar from "../components/Navbar";
import {
  Grid,
  Avatar,
  Box,
  Container,
  Toolbar,
  Button,
  Modal,
  Typography,
  Stack,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../components/Loader";
import Styles from "../styles/Styles";

const Trade = () => {
  const [open, setOpen] = useState(false);
  const [survivor, setSurvivor] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { auth } = useAuth();

  const toggleOpen = () => {
    setOpen(!open);
  };

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

  const handleTrade = async () => {
    try {
    } catch (err) {}
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
  }, [id]);

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
                onClick={toggleOpen}
                disabled={survivor?.isInfected || auth?.isInfected}
              >
                Trade
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

                  <Button
                    variant="contained"
                    className="d-flex mt-4 mx-auto"
                    onClick={() => {
                      handleTrade();
                    }}
                  >
                    Trade
                  </Button>
                </Box>
              </Modal>
              <Button
                variant="contained"
                color="error"
                onClick={handleReport}
                disabled={survivor?.isInfected || auth?.isInfected}
              >
                Report
              </Button>
            </Stack>
          </Box>
        ) : (
          <Box>
            <Typography
              variant="h2"
              fontFamily="monospace"
              fontWeight="bold"
              textAlign="center"
            >
              Trade Requests
            </Typography>
            {auth?.tradeRequest ? (
              ""
            ) : (
              <Typography
                mt={5}
                variant="h4"
                fontFamily="monospace"
                fontWeight="bold"
                textAlign="center"
              >
                No Trade Request Found
              </Typography>
            )}
          </Box>
        )}
      </Container>
    </>
  );
};

export default Trade;
