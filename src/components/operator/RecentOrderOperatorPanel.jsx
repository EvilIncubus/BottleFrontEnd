import * as React from 'react';
import Paper from '@mui/material/Paper';
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './dashboardElements/Title';
import TablePagination from '@mui/material/TablePagination';
import { DashboardOrderRow } from './DashboardOrderRow';
import { UserContext } from '../../StackContext';
import url from '../url';

const columns = [
  { id: 'orderId', label: 'Order Id', minWidth: 120 },
  { id: 'company', label: 'Customer', minWidth: 120 },
  { id: 'createdDate', label: 'Created Date', minWidth: 120 },
  { id: 'deliveryAddress', label: 'Delivery Address', minWidth: 100 },
  { id: 'status', label: 'Order Status', minWidth: 120},
  { id: 'viewDetails', label: 'View Details', minWidth: 120},
];

export default function RecentOrderManagerPanel() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [data, setData] = React.useState([]);
  const [count, setCount] = React.useState([]);
  const {user, setUser} = React.useContext(UserContext)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    const savedToken = localStorage.getItem("token");
    console.log(user)
    axios
      .post((url+"/rest/api/customer/order/getListOfOrdersForOperator"),{
        email: user.sub,
        size: rowsPerPage, 
        page: page + 1
      },
       {
        headers: {
          Authorization: `Bearer ${savedToken}`,
        },
      })
      .then((response) => {
        console.log(response.data.content)
        setData(response.data.content);
        setCount(response.data);
      });
  }, [page, rowsPerPage]);

  return (
    <>
    <Title>Recent Orders</Title>
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
            </TableRow>
          </TableHead>
          <TableBody>
          {data.map((order) => <DashboardOrderRow key={order.orderId} order={order}/>)}
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
    </>
  );
}