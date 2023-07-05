import { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  Stack,
} from "@mui/material";
import { toast } from "react-toastify";

export const TradeStepper = ({
  inventory,
  setInventory,
  inventory1,
  setInventory1,
  points,
  setPoints,
  points1,
  setPoints1,
  handleTrade,
}) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = (points) => {
    points > 0
      ? setActiveStep((prevActiveStep) => prevActiveStep + 1)
      : toast.error("Invalid points");
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (inventory, setInventory, setPoints, index, value) => {
    const tradeQty = isNaN(parseInt(inventory[index].tradeQty))
      ? 0
      : parseInt(inventory[index].tradeQty);
    const qtyDiff = inventory[index].quantity + tradeQty;

    if (value < 0 || value > qtyDiff) {
      toast.error("Invalid entry!");
      return;
    }
    setInventory((prevItems) => {
      const updatedItems = [...prevItems];
      const item = updatedItems[index];
      const tradeQtyDiff = value - item.tradeQty;

      if (item.quantity === 0 && tradeQtyDiff >= 1) return updatedItems;

      item.tradeQty = value;

      if (tradeQtyDiff > 0) {
        item.quantity -= tradeQtyDiff;
      } else {
        item.quantity += Math.abs(tradeQtyDiff);
      }

      const updatedPoints = updatedItems.reduce(
        (totalPoints, currentItem) =>
          totalPoints + currentItem.tradeQty * currentItem.points,
        0
      );

      setPoints(updatedPoints);

      return updatedItems;
    });
  };

  const TradeField = ({
    index,
    item,
    quantity,
    tradeQty,
    tradeQtyLabel,
    inventory,
    setInventory,
    setPoints,
  }) => (
    <>
      <Grid
        item
        xs={4}
      >
        {item}
      </Grid>
      <Grid
        item
        xs={4}
      >
        {quantity}
      </Grid>
      <Grid
        item
        xs={4}
      >
        {tradeQtyLabel ? (
          tradeQtyLabel
        ) : (
          <TextField
            type="Number"
            label="Trade Qty"
            name="tradeQty"
            value={tradeQty}
            InputProps={{ inputProps: { min: 0 } }}
            onChange={(e) =>
              handleChange(
                inventory,
                setInventory,
                setPoints,
                index,
                e.target.value
              )
            }
          />
        )}
      </Grid>
    </>
  );

  return (
    <div>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
      >
        <Step>
          <StepLabel>Select your items</StepLabel>
        </Step>
        <Step>
          <StepLabel>Select survivor items</StepLabel>
        </Step>
      </Stepper>

      {activeStep === 0 && (
        <Box>
          <Grid
            item
            container
            className="row"
            xs={12}
            mt={3}
            spacing={2}
          >
            <TradeField
              item={"Item Name"}
              quantity={"Item Limit"}
              tradeQtyLabel={"Trade Quanity"}
            />
            {inventory.map((item, index) => (
              <TradeField
                index={index}
                key={index}
                item={item.item}
                quantity={item.quantity}
                tradeQty={item.tradeQty}
                inventory={inventory}
                setInventory={setInventory}
                setPoints={setPoints}
              />
            ))}
          </Grid>
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h2"
          >
            Total Points: {points}
          </Typography>
          <Button
            variant="contained"
            onClick={() => handleNext(points)}
          >
            Next
          </Button>
        </Box>
      )}

      {activeStep === 1 && (
        <Box>
          <Grid
            item
            container
            className="row"
            xs={12}
            mt={3}
            spacing={2}
          >
            <TradeField
              item={"Item Name"}
              quantity={"Item Limit"}
              tradeQtyLabel={"Trade Quanity"}
            />
            {inventory1.map((item, index) => (
              <TradeField
                index={index}
                key={index}
                item={item.item}
                quantity={item.quantity}
                tradeQty={item.tradeQty}
                inventory={inventory1}
                setInventory={setInventory1}
                setPoints={setPoints1}
              />
            ))}
          </Grid>
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h2"
          >
            Total Points: {points1}
          </Typography>
          <Stack
            direction="row"
            justifyContent="space-between"
            mt={3}
          >
            <Button
              variant="contained"
              onClick={handleBack}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleTrade}
            >
              Trade
            </Button>
          </Stack>
        </Box>
      )}
    </div>
  );
};
