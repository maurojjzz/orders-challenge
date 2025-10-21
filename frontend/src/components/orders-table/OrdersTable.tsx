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
} from "@mui/material";
import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const rows = [
  { id: 1, order: "Notebook", customer: "Juan Pérez", status: "pending" },
  { id: 2, order: "Tablet", customer: "María García", status: "completed" },
  { id: 3, order: "Fridge", customer: "Carlos López", status: "pending" },
  { id: 4, order: "Washing Machine", customer: "Ana Martínez", status: "completed" },
  { id: 5, order: "Microwave", customer: "Luis Rodríguez", status: "cancelled" },
  { id: 1, order: "Notebook", customer: "Juan Pérez", status: "pending" },
  { id: 2, order: "Tablet", customer: "María García", status: "completed" },
  { id: 3, order: "Fridge", customer: "Carlos López", status: "pending" },
  { id: 4, order: "Washing Machine", customer: "Ana Martínez", status: "completed" },
  { id: 5, order: "Microwave", customer: "Luis Rodríguez", status: "cancelled" },
  { id: 1, order: "Notebook", customer: "Juan Pérez", status: "pending" },
  { id: 2, order: "Tablet", customer: "María García", status: "completed" },
  { id: 3, order: "Fridge", customer: "Carlos López", status: "pending" },
  { id: 4, order: "Washing Machine", customer: "Ana Martínez", status: "completed" },
  { id: 5, order: "Microwave", customer: "Luis Rodríguez", status: "cancelled" },
  { id: 1, order: "Notebook", customer: "Juan Pérez", status: "pending" },
  { id: 2, order: "Tablet", customer: "María García", status: "completed" },
  { id: 3, order: "Fridge", customer: "Carlos López", status: "pending" },
  { id: 4, order: "Washing Machine", customer: "Ana Martínez", status: "completed" },
  { id: 5, order: "Microwave", customer: "Luis Rodríguez", status: "cancelled" },
];

const OrdersTable = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Calcular las filas que se muestran en la página actual
  const paginatedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
          <TableBody>
            {paginatedRows.map((row, index) => (
              <TableRow key={`${row.id}-${index}`} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>{row.customer}</TableCell>
                <TableCell component="th" scope="row">
                  {row.order}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    "@media (max-width:584px)": { display: "none" },
                  }}
                >
                  4
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
                    }}
                  >
                    {row.status}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit Order">
                    <MdEdit style={{ cursor: "pointer", fontSize: 20 }} />
                  </Tooltip>
                  <Tooltip title="Delete Order">
                    <MdDelete style={{ cursor: "pointer", marginLeft: 10, fontSize: 20 }} />
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 25, 40]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default OrdersTable;
