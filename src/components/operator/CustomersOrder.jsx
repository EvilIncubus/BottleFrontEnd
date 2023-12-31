import * as React from 'react';
import Paper from '@mui/material/Paper';
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Container } from '@mui/material';
import { CustomersOrderRow } from './CustomersOrderRow';
import url from '../url';
import { ProfileId, UserContext } from '../../StackContext';

const columns = [
    { id: 'orderId', label: 'Order Id', minWidth: 120 },
    { id: 'createdDate', label: 'Created Date', minWidth: 120 },
    { id: 'deliveryAddress', label: 'Delivery Address', minWidth: 100 },
    { id: 'status', label: 'Order Status', minWidth: 120},
  ];

export default function CustomersOrder() {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [data, setData] = React.useState([])
  const [count, setCount] = React.useState([])
  const { user, setUser } = React.useContext(UserContext);
  const { profileId, setProfileId} = React.useContext(ProfileId);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(()=>{
    const savedToken = localStorage.getItem('token');
    console.log(profileId)
    axios.post(url+"/rest/api/customer/order/getListOfCustomersOrdersForOperator",  {
      profileId: profileId,
      operatorEmail: user.sub,
      size: rowsPerPage,
      page: page + 1
    },
    {
      headers: {
        Authorization: `Bearer ${savedToken}`,
      },
    }).then(response => {
                        setData(response.data.content);
                        setCount(response.data);
                        console.log(response.data.content)
                      }
    )
  },[page,rowsPerPage])

  return (
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
          {data.map((order) => <CustomersOrderRow key={order.orderId} order={order}/>)}
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
  )
  }