import { createTheme } from "@mui/material";


const appTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
          main: '#151516',
          light: '#29d824',
        },
        secondary: {
          main: '#0E80BF',
        },
        error: {
          main: '#EF5050',
        },
        success: {
            main: '#98E37E',
          },
      },
}) 

export default appTheme