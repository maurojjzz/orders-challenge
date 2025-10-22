import {
  Box,
  useTheme,
  Tooltip,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
  TextField,
  Button,
} from "@mui/material";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import type { OrderStatus } from "../../types/order.types.ts";
import type { SelectChangeEvent } from "@mui/material/Select";

const Form = () => {
  const [status, setStatus] = useState<OrderStatus>("pending");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const theme = useTheme();

  console.log("Form component, id:", id);

  const getMenuItemStyles = (colorType: "warning" | "success" | "error") => ({
    backgroundColor: theme.palette[colorType].main,
    color: theme.palette[colorType].contrastText,
    "&:hover": {
      backgroundColor: theme.palette[colorType].dark,
    },
    "&.Mui-selected": {
      backgroundColor: theme.palette[colorType].dark,
      "&:hover": {
        backgroundColor: theme.palette[colorType].dark,
      },
    },
  });

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as OrderStatus);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Box
      sx={{
        border: "1px solid red",
        flexGrow: "1",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loading ? (
        <CircularProgress size={260} color="success" sx={{ display: "block" }}/>
      ) : (
        <Box
          component={"form"}
          sx={{
            boxShadow: 5,
            maxWidth: "500px",
            minWidth: "290px",
            width: "95%",
            minHeight: "500px",
            borderRadius: 2,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Tooltip title="Go back">
            <IoMdArrowRoundBack
              onClick={() => {
                navigate("/");
              }}
              style={{ fontSize: "50px", position: "absolute", top: "10px", left: "10px", cursor: "pointer" }}
            />
          </Tooltip>

          <Typography variant="h4" textAlign={"center"} mt={6}>
            {id ? `Edit Order` : "New Order"}
          </Typography>

          <FormControl sx={{ mt: 2, width: "90%" }}>
            <InputLabel id="select-status" sx={{ backgroundColor: "#ffffff" }}>
              Status
            </InputLabel>
            <Select labelId="select-status" value={status} onChange={handleStatusChange} size="small">
              <MenuItem value={"pending"} sx={getMenuItemStyles("warning")}>
                Pending
              </MenuItem>
              <MenuItem value={"completed"} sx={getMenuItemStyles("success")}>
                Completed
              </MenuItem>
              <MenuItem value={"cancelled"} sx={getMenuItemStyles("error")}>
                Cancelled
              </MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Customer Name"
            variant="outlined"
            size="small"
            sx={{ mt: 4, width: "90%" }}
          />

          <TextField
            label="Item Name"
            variant="outlined"
            size="small"
            sx={{ mt: 4, width: "90%" }}
          />

          <TextField
            label="Quantity"
            variant="outlined"
            size="small"
            type="number"
            sx={{ mt: 4, width: "90%" }}
          />

          <Box
          sx={{
            mt:4,
            display:"flex",
            flexDirection:"row",
            justifyContent:"space-evenly",
            width:"90%",
          }}
          >
            <Button
              variant="contained"
              color="success"
              sx={{ width: "120px"}}
            >
              Submit
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                navigate("/");
              }}
              sx={{width: "120px"}}
            >
              Cancel
            </Button>
          </Box>

        </Box>
      )}
    </Box>
  );
};

export default Form;
