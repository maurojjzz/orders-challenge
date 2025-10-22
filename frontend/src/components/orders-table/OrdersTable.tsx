import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
  Tooltip,
  Typography,
  TablePagination,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { getOrders, deleteOrder } from "../../services/orders.service.ts";
import type { PaginatedResponse, Order } from "../../types/order.types.ts";
import Modal from "../modal/Modal.tsx";
import ConfirmDeleteModal from "../modal/ConfirmDeleteModal.tsx";
import { useNavigate } from "react-router-dom";

const OrdersTable = () => {
  
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<Order | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);
  const [data, setData] = useState<PaginatedResponse<Order>>({
    message: "",
    data: [],
    pagination: { page: 1, page_size: 10, total_items: 0, total_pages: 0, has_next: false, has_previous: false },
  });

  const theme = useTheme();
  const navigate = useNavigate();

  const pageIndex = Math.max(0, (data.pagination.page || 1) - 1);
  const rowsPerPage = data.pagination.page_size || 10;
  const totalItems = data.pagination.total_items || 0;

  const fetchOrdersPage = async (page: number, pageSize: number) => {
    try {
      setLoading(true);
      setError(null);
      const resData = await getOrders(page, pageSize);
      setData(resData);
    } catch (e: unknown) {
      const err = e as { message?: string };
      setError(err?.message ?? "Error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (_event: unknown, newPageIndex: number) => {
    const newPage = newPageIndex + 1;
    fetchOrdersPage(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(event.target.value, 10);
    fetchOrdersPage(1, newSize);
  };

  const handleDeleteClick = (order: Order) => {
    setOrderToDelete(order);
    setOpenDeleteModal(true);
  };


  const deleteOrderSelected = async (orderId: string): Promise<Order | undefined> => {
    try {
      setLoading(true);
      const result = await deleteOrder(orderId);
      setData((prevData) => ({
        ...prevData,
        data: prevData.data.filter((order) => order.id !== orderId),
      }));
      return result;
    } catch (error) {
      console.error("Error deleting order:", error);
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDelete = () => {
    if (orderToDelete) {
      console.log("Deleting order:", orderToDelete);
      deleteOrderSelected(orderToDelete.id);
      setOpenDeleteModal(false);
      setOrderToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setOpenDeleteModal(false);
    setOrderToDelete(null);
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const resData = await getOrders();
        setData(resData);
      } catch (e: unknown) {
        const err = e as { message?: string };
        setError(err?.message ?? "Error fetching orders");
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      }
    })();
  }, []);

  console.log("data", data);

  return (
    <Paper sx={{ marginTop: 2, maxWidth: "890px", width: "100%", boxShadow: 5 }}>
      <TableContainer sx={{ height: "650px" }}>
        <Table stickyHeader aria-label="orders table">
          <TableHead>
            <TableRow>
              <TableCell>Customer Name</TableCell>
              <TableCell>Item</TableCell>
              <TableCell
                align="center"
                sx={{
                  "@media (max-width:584px)": { display: "none" },
                }}
              >
                Quantity
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  "@media (max-width:454px)": { display: "none" },
                }}
              >
                Status
              </TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ backgroundColor: "#f0f1f5" }}>
            {error && (
              <TableRow>
                <TableCell colSpan={5} sx={{ color: "error.main" }}>
                  {error}
                </TableCell>
              </TableRow>
            )}
            {loading && (
              <TableRow>
                <TableCell sx={{ height: "550px" }} colSpan={5}>
                  <CircularProgress size={260} color="success" sx={{ mx: "auto", display: "block" }} />
                </TableCell>
              </TableRow>
            )}
            {!loading && data.data.length === 0 && (
              <TableRow>
                <TableCell colSpan={5}>No orders found</TableCell>
              </TableRow>
            )}
            {!loading &&
              data.data.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 }, cursor: "pointer" }}
                  onClick={() => {
                    setInfo(row);
                    setOpenModal(true);
                  }}
                >
                  <TableCell>{row.customer_name}</TableCell>
                  <TableCell component="th" scope="row">
                    {row.item}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      "@media (max-width:584px)": { display: "none" },
                    }}
                  >
                    {row.quantity}
                  </TableCell>
                  <TableCell
                    sx={{
                      "@media (max-width:454px)": { display: "none" },
                    }}
                    align="center"
                  >
                    <Typography
                      variant="body2"
                      textAlign={"center"}
                      sx={{
                        borderRadius: "8px",
                        backgroundColor:
                          row.status === "completed"
                            ? theme.palette.success.main
                            : row.status === "cancelled"
                            ? theme.palette.error.main
                            : row.status === "pending"
                            ? theme.palette.warning.main
                            : theme.palette.background.default,
                        color:
                          row.status === "completed"
                            ? theme.palette.success.contrastText
                            : row.status === "cancelled"
                            ? theme.palette.error.contrastText
                            : row.status === "pending"
                            ? theme.palette.warning.contrastText
                            : theme.palette.text.primary,
                        fontWeight: 500,
                        py: "2px",
                        textTransform: "capitalize",
                      }}
                    >
                      {row.status}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit Order">
                      <MdEdit
                        style={{ cursor: "pointer", fontSize: 20 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/orders/${row.id}`);
                        }}
                      />
                    </Tooltip>
                    <Tooltip title="Delete Order">
                      <MdDelete
                        style={{ cursor: "pointer", marginLeft: 10, fontSize: 20 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClick(row);
                        }}
                      />
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        count={totalItems}
        rowsPerPageOptions={[5, 10, 15, 25, 40]}
        component="div"
        rowsPerPage={rowsPerPage}
        page={pageIndex}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Items:"
        sx={{
          borderTop: `1px solid ${theme.palette.divider}`,
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      />
      {openModal && info && <Modal info={info} setOpenModal={setOpenModal} onDeleteClick={handleDeleteClick} />}
      <ConfirmDeleteModal
        open={openDeleteModal}
        order={orderToDelete}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </Paper>
  );
};

export default OrdersTable;
