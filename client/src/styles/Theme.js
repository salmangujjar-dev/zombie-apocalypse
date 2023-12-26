import { createTheme } from "@mui/material/styles";
import { indigo } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: indigo[700],
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
            color: indigo[700],
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
              borderColor: indigo[700],
              borderSize: 2,
            },
            "&:hover fieldset": {
              borderColor: indigo[700],
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
          backgroundColor: indigo[700],
          color: "#fff",
          fontWeight: "bold",
        },
      },
    },
  },
});
