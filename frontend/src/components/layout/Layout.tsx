import { Box } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../views/Home";

const Layout = () => {
  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: "auto",
        minHeight: "100dvh",
        px: 2,
        display: "flex",
        flexDirection: "column",
        flexGrow: 1
      }}
    >
      <Box sx={{
        border:"1px solid red",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
      }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/orders/:id?" element={<h2>Order Details</h2>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default Layout;
