import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  IconButton,
  Modal,
  Grid,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { memo, useState } from "react";
import Styles from "../styles/Styles";
import axios from "axios";
import { toast } from "react-toastify";

const TradeCard = ({ tradeHistory, id, token }) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen(!open);

  const handleAccept = async () => {
    try {
      const data = {
        token: token,
        tradeId: tradeHistory._id,
        status: "Accepted",
        tradeObj: tradeHistory,
      };
      const response = await axios.put(
        "http://localhost:3001/api/v1/handleTrade",
        data
      );
      if (response.status === 400) throw new Error(response);
      toast.success(response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const handleReject = async () => {
    try {
      const data = {
        token: token,
        tradeId: tradeHistory._id,
        status: "Rejected",
      };
      const response = await axios.put(
        "http://localhost:3001/api/v1/handleTrade",
        data
      );
      if (response.status === 400) throw new Error(response);
      toast.success(response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <Card className="d-flex">
      <CardContent style={{ flexGrow: 1 }}>
        <Typography variant="h6">Trader Id: {tradeHistory.reqFrom}</Typography>
        <Button
          variant="contained"
          onClick={toggleOpen}
        >
          View Details
        </Button>
        <Modal
          open={open}
          onClose={toggleOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Grid
            container
            spacing={2}
            sx={Styles.Modal}
          >
            <Typography
              fontWeight="bold"
              margin="auto"
            >
              {tradeHistory.reqFrom === id ? "My Items" : "Target Items"}
            </Typography>
            {tradeHistory.inventory.map((item, index) => (
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
                <Typography margin="auto">{item.tradeQty}</Typography>
              </Grid>
            ))}
            <Typography
              id="modal-modal-description"
              fontWeight="bold"
              margin="auto"
            >
              {tradeHistory.reqFrom === id ? "Target Items" : "My Items"}
            </Typography>
            {tradeHistory.inventory1.map((item, index) => (
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
                <Typography margin="auto">{item.tradeQty}</Typography>
              </Grid>
            ))}
            <Button
              variant="contained"
              className="d-flex mt-4 mx-auto"
              onClick={toggleOpen}
            >
              Close
            </Button>
          </Grid>
        </Modal>
      </CardContent>
      {tradeHistory.reqFrom !== id && tradeHistory.status === "Pending" && (
        <CardActions className="justify-content-center">
          <IconButton
            aria-label="Accept"
            onClick={handleAccept}
          >
            <CheckCircleIcon
              color="success"
              fontSize="large"
            />
          </IconButton>
          <IconButton
            aria-label="Reject"
            onClick={handleReject}
          >
            <CancelIcon
              color="error"
              fontSize="large"
            />
          </IconButton>
        </CardActions>
      )}
      {tradeHistory.status}
    </Card>
  );
};

export default memo(TradeCard);
