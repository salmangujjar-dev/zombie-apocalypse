import { useEffect, useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Autocomplete,
  TextField,
  Box,
  IconButton,
  Button,
  Modal,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Checkbox,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import axios from "axios";

import Styles from "../styles/Styles";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const Search = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchByUsername, setSearchByUsername] = useState(true);
  const [inventory, setInventory] = useState([]);
  const { auth } = useAuth();
  const navigate = useNavigate();

  const toggleSearchModal = () => {
    setSearchOpen(!searchOpen);
  };

  const handleQuantityChange = (index, value) => {
    setInventory((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index].quantity = value;
      return updatedItems;
    });
  };

  const handleEnabledChange = (index) => {
    setInventory((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index].enabled = !updatedItems[index].enabled;
      return updatedItems;
    });
  };

  const handleResourceSearch = async () => {
    try {
      const modifiedInventory = inventory
        .filter((item) => item.enabled)
        .map((item) => ({ item: item._id, quantity: { $gte: item.quantity } }));

      if (modifiedInventory.length === 0) {
        toast.error("Empty Search");
        return;
      }
      const response = await axios.get(process.env.REACT_APP_SURVIVOR_API, {
        params: {
          inventory: modifiedInventory,
          _id: auth._id,
        },
        headers: {
          "Content-Type": "application/json",
          token: auth.token,
        },
      });
      response.data.body.length === 0 && toast.error("Result Empty");
      setResult(response.data.body);
    } catch (err) {}
  };

  const handleKeyDown = (key, e) => {
    key === "Backspace" && setInput(input.slice(0, -1));
    key === "Enter" && e.stopPropagation();
  };

  const handleDropdownSelect = (_id) => {
    setInput("");
    setResult([]);
    setSearchOpen(false);
    navigate(`/trade/${_id}`);
  };

  const renderInput = (params) => {
    return (
      <TextField
        {...params}
        sx={Styles.SearchTextField}
        label="Search"
        onKeyDown={(e) => handleKeyDown(e.key, e)}
      />
    );
  };

  const renderOptions = (props, option) => {
    return (
      <Box
        component="li"
        sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
        {...props}
        onClick={() => handleDropdownSelect(option._id)}
      >
        <Avatar
          loading="lazy"
          width="20"
          src={
            option?.profile_image
              ? `data:image/*;base64,${option?.profile_image}`
              : ""
          }
          sx={{ mr: 2 }}
          alt={option?.name}
        />
        {option.name}
      </Box>
    );
  };

  useEffect(() => {
    const fetchSurvivors = async (input) => {
      try {
        const response = await axios.get(process.env.REACT_APP_SURVIVOR_API, {
          params: {
            input,
            _id: auth._id,
          },
          headers: {
            "Content-Type": "application/json",
            token: auth.token,
          },
        });

        setResult(response.data.body);
      } catch (err) {}
    };

    input && fetchSurvivors(input);
  }, [input, auth]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_INVENTORY_API);

        const updatedInventory = response.data.updatedInventory.map(
          (inventory) => ({
            ...inventory,
            enabled: false,
          })
        );
        setInventory(updatedInventory);
      } catch (err) {}
    };

    fetchInventory();
  }, []);

  return (
    <>
      <IconButton
        aria-label="search"
        size="large"
        onClick={toggleSearchModal}
      >
        <SearchTwoToneIcon
          fontSize="large"
          style={{ color: "white" }}
        />
      </IconButton>

      <Modal
        open={searchOpen}
        onClose={toggleSearchModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={Styles.Modal}
          textAlign="center"
        >
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h1"
          >
            Search
          </Typography>
          <Button
            variant="contained"
            className="mx-auto"
            onClick={() => setSearchByUsername(!searchByUsername)}
          >
            Search by {searchByUsername ? "Inventory" : "Username"}
          </Button>
          {searchByUsername ? (
            <Autocomplete
              freeSolo
              sx={Styles.AutoComplete}
              options={result}
              autoHighlight
              inputValue={input}
              onInputChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e.key)}
              getOptionLabel={(option) => option?.name}
              renderOption={(props, option) => renderOptions(props, option)}
              renderInput={(params) => renderInput(params)}
            />
          ) : (
            <>
              <Grid
                container
                mt={3}
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
                      xs={1}
                    >
                      <Checkbox
                        checked={item.enabled}
                        onChange={() => handleEnabledChange(index)}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={5}
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
                      disabled={!item.enabled}
                    />
                  </Grid>
                ))}
              </Grid>

              <Button
                variant="contained"
                className="d-flex mt-4 mx-auto"
                onClick={handleResourceSearch}
              >
                Search
              </Button>
              <div
                className="d-flex flex-wrap"
                style={{ marginTop: 30, gap: "2rem" }}
              >
                {result.map((item) => (
                  <Card
                    sx={{ maxWidth: 200 }}
                    key={item._id}
                    onClick={() => handleDropdownSelect(item._id)}
                  >
                    <CardActionArea>
                      <Avatar
                        loading="lazy"
                        src={
                          item?.profile_image
                            ? `data:image/*;base64,${item?.profile_image}`
                            : ""
                        }
                        sx={{
                          mr: 2,
                          margin: "auto",
                          objectFit: "contain",
                        }}
                        alt={item?.name}
                      />
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="div"
                        >
                          {item.name}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))}
              </div>
            </>
          )}
          <Button
            variant="contained"
            className="d-flex mt-4 mx-auto"
            onClick={toggleSearchModal}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default memo(Search);
