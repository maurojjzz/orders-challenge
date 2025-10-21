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
            main: "#4caf50",
            contrastText: "#ffffff",
        },
        warning: {
            main: "#ffb300",
            contrastText: "#000000",
        },
        error: {
            main: "#f44336",
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
});

export default theme;
