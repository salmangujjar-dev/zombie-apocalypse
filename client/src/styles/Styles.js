const Styles = {
  Modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    width: 500,
    pt: 2,
    px: 4,
    pb: 3,
  },
  SearchTextField: {
    mr: 3,
    "& label": {
      color: "white",
    },
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiOutlinedInput-root": {
      color: "white",
      "&.Mui-focused fieldset": {
        border: "1px solid white",
      },
      fieldset: {
        border: "1px solid white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
    },
  },
  AutoComplete: {
    "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
      color: "white",
    },
    "& .MuiAutocomplete-endAdornment .MuiSvgIcon-root": {
      color: "white",
    },
  },
};

export default Styles;
