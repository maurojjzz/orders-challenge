import { Box, useTheme, Typography, Button } from "@mui/material";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { ImCross } from "react-icons/im";
import type { Order } from "../../types/order.types.ts";
import { useNavigate } from "react-router-dom";

type ModalProps = {
  info: Order;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  onDeleteClick: (order: Order) => void;
};

const Modal = ({ info, setOpenModal, onDeleteClick }: ModalProps) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleDelete = () => {
    setOpenModal(false);
    onDeleteClick(info);
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "0",
        left: "0",
        backgroundColor: "rgba(0, 0, 0, 0.46)",
        zIndex: 10,
        width: "100dvw",
        height: "100dvh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          height: "500px",
          maxWidth: "450px",
          width: "97%",
          backgroundColor: theme.palette.background.paper,
          display: "flex",
          flexDirection: "column",
          padding: 1,
          borderRadius: 2,
          position: "relative",
        }}
      >
        <Box sx={{ position: "absolute", top: "15px", right: "0", mr: "15px" }}>
          <ImCross
            onClick={() => {
              setOpenModal(false);
            }}
            style={{ fontSize: "25px", cursor: "pointer" }}
          />
        </Box>
        <Typography variant="h4" color="initial" mt={4}>
          Order
        </Typography>
        <Typography variant="body1" fontSize={14} mb={5} color="text.secondary">
          <Typography component={"span"} fontWeight={700} mr={1} color="black">
            ID:
          </Typography>
          {info?.id}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 3 }}>
          <Typography variant="body1" fontWeight={700} fontSize={20} mr={2}>
            Status:
          </Typography>
          <Typography
            variant="body1"
            sx={{
              py: "5px",
              px: "10px",
              borderRadius: 4,
              backgroundColor:
                info?.status === "completed"
                  ? theme.palette.success.main
                  : info?.status === "cancelled"
                  ? theme.palette.error.main
                  : info?.status === "pending"
                  ? theme.palette.warning.main
                  : theme.palette.background.default,
              color:
                info?.status === "completed"
                  ? theme.palette.success.contrastText
                  : info?.status === "cancelled"
                  ? theme.palette.error.contrastText
                  : info?.status === "pending"
                  ? theme.palette.warning.contrastText
                  : theme.palette.text.primary,
            }}
          >
            {info?.status}
          </Typography>
        </Box>

        <Typography variant="body1" mb={2} textAlign={"center"}>
          <Typography component={"span"} fontWeight={700} mr={1}>
            Customer Name:
          </Typography>
          {info?.customer_name}
        </Typography>

        <Typography variant="body1" mb={2} textAlign={"center"}>
          <Typography component={"span"} fontWeight={700} mr={1}>
            Item:
          </Typography>
          {info?.item}
        </Typography>

        <Typography variant="body1" mb={2} textAlign={"center"}>
          <Typography component={"span"} fontWeight={700} mr={1}>
            Quantity:
          </Typography>
          {info?.quantity}
        </Typography>

        <Button
          onClick={() => navigate(`/orders/${info?.id}`)}
          color="success"
          variant="outlined"
          sx={{ mt: "auto", display: "flex", alignItems: "center", gap: 1, outlineWidth: 3 }}
        >
          <Typography variant="body1" fontWeight={500} fontSize={22}>
            Edit
          </Typography>
          <MdEdit fontSize="large" />
        </Button>

        <Button
          onClick={handleDelete}
          color="error"
          variant="contained"
          sx={{ mt: "15px", mb: 2, display: "flex", alignItems: "center", gap: 1 }}
        >
          <Typography variant="body1" fontWeight={500} fontSize={22}>
            Delete
          </Typography>
          <MdDelete fontSize="large" />
        </Button>
      </Box>
    </Box>
  );
};

export default Modal;
