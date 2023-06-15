import { createTheme } from "@mui/material/styles";
import { yellow } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: yellow[700],
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
            color: yellow[700],
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
              borderColor: yellow[700],
              borderSize: 2,
            },
            "&:hover fieldset": {
              borderColor: yellow[700],
            },
          },
        },
      },
    },
    // MuiRadio: {
    //   styleOverrides: {
    //     root: {
    //       color: yellow[700],
    //       "&.Mui-checked": {
    //         color: yellow[700],
    //       },
    //     },
    //   },
    // },
    MuiToolbar: {
      styleOverrides: {
        customRoot: {
          padding: "10px",
          backgroundColor: yellow[700],
          color: "#fff",
          fontWeight: "bold",
        },
      },
    },
  },
});
