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
import { TradeStepper } from "../components/TradeStepper";
import TradeCard from "../components/TradeCard";

const Trade = () => {
  const [open, setOpen] = useState(false);
  const [survivor, setSurvivor] = useState({});
  const [loading, setLoading] = useState(false);
  const [inventory, setInventory] = useState([]);
  const [inventory1, setInventory1] = useState([]);
  const [points, setPoints] = useState(0);
  const [points1, setPoints1] = useState(0);
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
        { token: auth.token, victimId: auth._id, reqTo: survivor._id },
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
    if (points !== points1) {
      toast.error("Points does not match!");
      return;
    }
    const data = {
      reqFrom: auth?._id,
      reqTo: survivor?._id,
      inventory,
      inventory1,
      status: "Pending",
    };
    try {
      const response = await axios.put(
        "http://localhost:3001/api/v1/requestTrade",
        { data, token: auth?.token }
      );
      setOpen(false);
      if (response.status === 400) throw new Error(response);

      toast.success(response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      toast.error(err.response.data.message);
      toggleOpen();
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
        let modifiedResources = auth?.resources.map((item) => ({
          _id: item._id,
          item: item.item,
          quantity: item.quantity,
          points: item.points,
          tradeQty: 0,
        }));
        setInventory(modifiedResources);

        modifiedResources = response?.data?.survivor?.resources.map((item) => ({
          _id: item._id,
          item: item.item,
          quantity: item.quantity,
          points: item.points,
          tradeQty: 0,
        }));
        setInventory1(modifiedResources);
      } catch (err) {
        toast.error(err.response.data.message);
      }
    };

    id && fetchProfile();
  }, [id]);

  const Field = ({ label, value }) => (
    <Grid
      item
      container
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
                  <TradeStepper
                    inventory={inventory}
                    setInventory={setInventory}
                    inventory1={inventory1}
                    setInventory1={setInventory1}
                    points={points}
                    setPoints={setPoints}
                    points1={points1}
                    setPoints1={setPoints1}
                    handleTrade={handleTrade}
                  />
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

            <Box
              display="inline-block"
              width="100%"
            >
              {auth?.tradeHistory ? (
                auth.tradeHistory.map((tradeHistory, index) => (
                  <TradeCard
                    key={index}
                    tradeHistory={tradeHistory}
                    id={auth?._id}
                    token={auth?.token}
                  />
                ))
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
          </Box>
        )}
      </Container>
    </>
  );
};

export default Trade;
