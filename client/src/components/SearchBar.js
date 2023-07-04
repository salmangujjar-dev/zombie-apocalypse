import { useEffect, useState } from "react";
import React from "react";
import { Autocomplete, TextField, Box } from "@mui/material";
import axios from "axios";
import Styles from "../styles/Styles";
import useAuth from "../hooks/useAuth";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState([]);
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSurvivors = async (input) => {
      try {
        const data = { token: auth.token, input, _id: auth._id };
        const response = await axios.post(
          "http://localhost:3001/api/v1/fetchSurvivors",
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setResult(response.data.body);
      } catch (err) {}
    };

    input && fetchSurvivors(input);
  }, [input, auth._id, auth.token]);

  return (
    <>
      <Autocomplete
        freeSolo
        sx={Styles.AutoComplete}
        options={result}
        autoHighlight
        inputValue={input}
        onInputChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          e.key === "Backspace" && setInput(input.slice(0, -1));
        }}
        getOptionLabel={(option) => option?.name}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
            onClick={(e) => {
              setInput("");
              setResult([]);
              navigate(`/trade/${option._id}`);
            }}
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
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={Styles.SearchTextField}
            label="Search"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.stopPropagation();
              }
            }}
          />
        )}
      />
    </>
  );
};

export default React.memo(SearchBar);
