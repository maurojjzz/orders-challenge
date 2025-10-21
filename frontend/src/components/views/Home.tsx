import { Box } from "@mui/material";
import OrdersTable from "../orders-table/OrdersTable";

const Home = () => {
  return (
    <Box
        sx={{
            display:"flex",
            flexDirection:"column",
            flexGrow:"1",
            alignItems:"center",
        }}
    >
      <OrdersTable />
    </Box>
  )
}

export default Home
