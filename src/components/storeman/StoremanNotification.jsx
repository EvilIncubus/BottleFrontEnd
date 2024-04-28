import * as React from "react";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { OrderRow } from "./OrderRow";
import url from "../url";
import { UserContext } from "../../StackContext";
import StoremanDashboardFilter from "./StoremanDashboardFilter";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import dayjs from "dayjs";

const columns = [
  { id: 'orderId', label: 'Order Id', minWidth: 120 },
  { id: 'company', label: 'Customer', minWidth: 120 },
  { id: 'createdDate', label: 'Created Date', minWidth: 120 },
  { id: 'deliveryAddress', label: 'Delivery Address', minWidth: 100 },
  { id: 'status', label: 'Order Status', minWidth: 120},
];

export default function StoremanNotification() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [data, setData] = React.useState([]);
  const [count, setCount] = React.useState([]);
  const now = new Date();
  const [fromDate, setFromDate] = React.useState(dayjs(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7).toLocaleString() + ""));
  const [toDate, setToDate] = React.useState(dayjs(new Date().toLocaleString() + ""));
  const [status, setStatus] = React.useState({
    ApprovedByCustomer: false,
    Created: false,
    Delivered: false,
    ProcessedByTheWarehouse: false,
    OnTheWay: false,
  });
  const {user, setUser} = React.useContext(UserContext)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangeStatus = (event) => {   
    const {
      target: { value },
    } = event;
    console.log(value)
    setStatus({ ...status, [value]: !status[value] });
    console.log(status);
  };

  const handleChangeFromDate = (newValue) => {
    console.log(newValue)
  };

  const handleChangeToDate = (newValue) => {
    console.log(newValue)
  };

  const handleSearch = async (event) => {
    const {
      target: { value },
    } = event;
    console.log(value);
    const savedToken = localStorage.getItem("token");
    axios
      .post(url + "/rest/api/customer/order/searchOrderForOperator",{
        company: value,
        operatorEmail: user.sub,
        page: page + 1,
        size: rowsPerPage,
      },
       {
        headers: {
          Authorization: `Bearer ${savedToken}`,
        },
      })
      .then((response) => {
        setData(response.data.content);
        setCount(response.data);
        console.log(response.data.content);
      });
  };

  React.useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const statusQuery = Object.keys(status).filter(
      (key, index) => Object.values(status)[index]
    );
    console.log(url);
    console.log(statusQuery)
    console.log(fromDate)
    console.log(toDate)
    axios
      .get(
        url + "/rest/api/notification/getNotificationOrders",
        {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
          params: {size: rowsPerPage, page: page + 1}
        }
      )
      .then((response) => {
        setData(response.data.content);
        setCount(response.data);
        console.log(response.data.content);
      });
  }, [toDate, fromDate, status, page, rowsPerPage]);

  return (
    <Stack
        direction="row"
        spacing={2}
        sx={{
          mt: 4,
        }}
      >
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>

      <TableContainer sx={{ maxHeight: 700, maxWidth: 1800 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow> 
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell>
                    View Details
                  </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {data.map((order) => <OrderRow key={order.orderId} order={order}/>)}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={count.totalElements}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </Container>
    </Stack>
  );
}
