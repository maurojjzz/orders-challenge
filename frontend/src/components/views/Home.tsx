import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import OrdersTable from "../orders-table/OrdersTable";
import { CiCirclePlus } from "react-icons/ci";

const Home = () => {

  const navigate = useNavigate();

  return (
    <Box
        sx={{
            display:"flex",
            flexDirection:"column",
            flexGrow:"1",
            alignItems:"center",
        }}
    >
      <Box
        sx={{
          width:"100%",
          display:"flex",
          flexDirection:"row",
          my:4,
          maxWidth: "900px",
        }}
      >
        <Typography variant="h4" sx={{fontSize: "2.3rem"}} >Orders Management</Typography>
        <Button 
          variant="contained" 
          sx={{
            marginLeft:"auto",
            display:"flex",
            flexDirection:"row",
            alignItems:"center",
            gap:1,
            borderRadius:5,
          }} 
          onClick={() => navigate("/orders")}
        >
          <CiCirclePlus style={{fontSize:"30px", fontWeight:"bold"}}/>
          <Typography variant="button" fontSize={18} >New Order</Typography>
        </Button>
      </Box>
      <OrdersTable />
    </Box>
  )
}

export default Home
