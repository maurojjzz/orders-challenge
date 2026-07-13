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
import { useForm, Controller } from "react-hook-form";
import { getOrderById, createOrder, updateOrder } from "../../services/orders.service.ts";
import { useNotification } from "../../context/NotificationContext.tsx";

type FormValues = {
  status: OrderStatus;
  customer_name: string;
  item: string;
  quantity: number | undefined;
};

const Form = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [order, setOrder] = useState<FormValues>({
    status: "pending",
    customer_name: "",
    item: "",
    quantity: undefined,
  });
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const theme = useTheme();
  const { showNotification } = useNotification();

  // console.log("Form component, id:", id);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    mode: "onBlur",
    defaultValues: order,
  });

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

  const onSubmit = async (values: FormValues) => {
    try {
      if (id) {
        await updateOrder(id, values);
        showNotification("Order updated successfully!", "success");
      } else {
        await createOrder({
          ...values,
          quantity: values.quantity!,
        });
        showNotification("Order created successfully!", "success");
      }
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error) {
      console.error("Error submitting form:", error);
      showNotification(
        id ? "Failed to update order. Please try again." : "Failed to create order. Please try again.",
        "error"
      );
      setTimeout(() => {
        navigate("/");
      }, 500);
    }
  };

  useEffect(() => {
    setLoading(true);
    (async () => {
      if (id) {
        try {
          const orderData = await getOrderById(id);
          const fetchedOrder = {
            status: orderData.status,
            customer_name: orderData.customer_name,
            item: orderData.item,
            quantity: orderData.quantity,
          };
          setOrder(fetchedOrder);
          reset(fetchedOrder);
        } catch (error) {
          console.error("Error fetching order data:", error);
          showNotification("Failed to load order data. Please try again.", "error");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } finally {
          setTimeout(() => {
            setLoading(false);
          }, 1500);
        }
      } else {
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      }
    })();
  }, [id, reset, showNotification, navigate]);

  return (
    <Box
      sx={{
        flexGrow: "1",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loading ? (
        <CircularProgress size={260} color="success" sx={{ display: "block" }} />
      ) : (
        <Box
          component={"form"}
          onSubmit={handleSubmit(onSubmit)}
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
            <Controller
              name="status"
              control={control}
              rules={{ required: "Status is required" }}
              render={({ field }) => (
                <Select labelId="select-status" size="small" {...field} value={field.value} label="Status">
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
              )}
            />
          </FormControl>

          <TextField
            label="Customer Name"
            variant="outlined"
            size="small"
            sx={{ mt: 4, width: "90%" }}
            {...register("customer_name", {
              required: "Customer Name is required",
              minLength: { value: 2, message: "Min 2 characters" },
              maxLength: { value: 60, message: "Max 60 characters" },
            })}
            error={!!errors.customer_name}
            helperText={errors.customer_name?.message}
          />

          <TextField
            label="Item Name"
            variant="outlined"
            size="small"
            sx={{ mt: 4, width: "90%" }}
            {...register("item", {
              required: "Item Name is required",
              minLength: { value: 2, message: "Min 2 characters" },
              maxLength: { value: 60, message: "Max 60 characters" },
            })}
            error={!!errors.item}
            helperText={errors.item?.message}
          />

          <TextField
            label="Quantity"
            variant="outlined"
            size="small"
            type="number"
            sx={{ mt: 4, width: "90%" }}
            {...register("quantity", {
              required: "Quantity is required",
              min: { value: 1, message: "Min 1" },
              max: { value: 100, message: "Max 100" },
            })}
            error={!!errors.quantity}
            helperText={errors.quantity?.message}
          />

          <Box
            sx={{
              mt: 4,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: "90%",
            }}
          >
            <Button type="submit" disabled={isSubmitting} variant="contained" color="success" sx={{ width: "120px" }}>
              {isSubmitting ? "Saving..." : "Submit"}
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                navigate("/");
              }}
              sx={{ width: "120px" }}
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
