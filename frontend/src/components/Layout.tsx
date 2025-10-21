import { Box, Typography } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";

const Layout = () => {
  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: "auto",
        minHeight: "100dvh",
        px: 2,
        border: "1px solid red",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1
      }}
    >
      <Typography variant="h2" gutterBottom>
        Orders
      </Typography>
      <Box sx={{
        border:"1px solid red",
        flexGrow: 1,
      }}>
        <Routes>
          <Route path="/" element={<h2>Order List</h2>} />
          <Route path="/:id" element={<h2>Order Details</h2>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default Layout;
