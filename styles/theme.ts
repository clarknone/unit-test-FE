import { createTheme, ThemeOptions } from "@mui/material";

// declare module ThemeOptions {
//   interface ThemeOptions {
//     palette: {
//       accent: PaletteColorOptions;
//     };
//   }
// }

const theme: ThemeOptions = {
  palette: {
    primary: {
      main: "#a41623",
    },
    secondary: {
      main: "#f85e00",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
};

export default createTheme(theme);