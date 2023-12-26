import { createTheme } from "@mui/material/styles";
import { purple } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: purple[700],
      dark: "#2e85d4",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          color: "#fff",
          fontWeight: "bold",
          "&:hover": {
            background: "#fff",
            color: purple[700],
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label.Mui-focused": {
            color: "black",
          },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: purple[700],
              borderSize: 2,
            },
            "&:hover fieldset": {
              borderColor: purple[700],
            },
          },
        },
      },
    },
    MuiTypography: {
      variants: [
        {
          props: { variant: "h5" },

          style: {
            color: "white",
          },
        },
      ],
    },
    MuiToolbar: {
      styleOverrides: {
        customRoot: {
          padding: "10px",
          backgroundColor: purple[700],
          color: "#fff",
          fontWeight: "bold",
        },
      },
    },
  },
});
