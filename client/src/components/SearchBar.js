import { useEffect, useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import { Autocomplete, TextField, Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import axios from "axios";

import Styles from "../styles/Styles";
import useAuth from "../hooks/useAuth";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState([]);
  const { auth } = useAuth();
  const navigate = useNavigate();

  const handleKeyDown = (key, e) => {
    key === "Backspace" && setInput(input.slice(0, -1));
    key === "Enter" && e.stopPropagation();
  };

  const handleDropdownSelect = (_id) => {
    setInput("");
    setResult([]);
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
        const response = await axios.get(
          "http://localhost:3001/api/v1/survivor/",
          {
            params: {
              input,
              _id: auth._id,
            },
            headers: {
              "Content-Type": "application/json",
              token: auth.token,
            },
          }
        );

        setResult(response.data.body);
      } catch (err) {}
    };

    input && fetchSurvivors(input);
  }, [input, auth]);

  return (
    <>
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
    </>
  );
};

export default memo(SearchBar);
