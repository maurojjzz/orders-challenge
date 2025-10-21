import {
  Modal,
  Box,
  Typography,
  Button,
  useTheme,
} from "@mui/material";
import { MdWarning } from "react-icons/md";
import type { Order } from "../../types/order.types.ts";

type ConfirmDeleteModalProps = {
  open: boolean;
  order: Order | null;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmDeleteModal = ({open, order, onConfirm, onCancel}: ConfirmDeleteModalProps) => {
  const theme = useTheme();

  return (
    <Modal
      open={open}
      onClose={onCancel}
      aria-labelledby="confirm-delete-modal"
      aria-describedby="confirm-delete-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 400 },
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <MdWarning
            style={{
              fontSize: "64px",
              color: theme.palette.warning.main,
            }}
          />

          <Typography
            id="confirm-delete-modal"
            variant="h5"
            component="h2"
            fontWeight={600}
            textAlign="center"
          >
            Delete Order
          </Typography>

          <Typography
            id="confirm-delete-description"
            variant="body1"
            textAlign="center"
            color="text.secondary"
          >
            You are about to delete this order. This action cannot be undone.
          </Typography>

          {order && (
            <Box
              sx={{
                width: "100%",
                p: 2,
                bgcolor: theme.palette.grey[100],
                borderRadius: 1,
                mt: 1,
              }}
            >
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                <Typography component="span" fontWeight={600}>
                  Customer:
                </Typography>{" "}
                {order.customer_name}
              </Typography>
              <Typography variant="body2">
                <Typography component="span" fontWeight={600}>
                  Item:
                </Typography>{" "}
                {order.item}
              </Typography>
            </Box>
          )}

          <Box
            sx={{
              display: "flex",
              gap: 2,
              width: "100%",
              mt: 2,
            }}
          >
            <Button
              onClick={onCancel}
              variant="outlined"
              fullWidth
              sx={{ py: 1.5 }}
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              variant="contained"
              color="error"
              fullWidth
              sx={{ py: 1.5 }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmDeleteModal;
