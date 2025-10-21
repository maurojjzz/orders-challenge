import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#1976d2",
            contrastText: "#ffffff",
        },
        secondary: {
            main: "#6c757d",
            contrastText: "#ffffff",
        },
        success: {
            main: "#26bc72",
            contrastText: "#ffffff",
        },
        warning: {
            main: "#f3cd49",
            contrastText: "#000000",
        },
        error: {
            main: "#d9423b",
            contrastText: "#ffffff",
        },
        background: {
            default: "#f8f9fa",
            paper: "#ffffff",
        },
        text: {
            primary: "#212529",
            secondary: "#6c757d",
        },
        divider: "#dee2e6", 
    },
    typography: {
        fontFamily: 'Poppins, Roboto, sans-serif',
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
    },
});

export default theme;
