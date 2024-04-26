import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Container } from "@mui/material";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import Button from "@mui/material/Button";
import { ShipperCurrentOrderProductList } from "./ShipperCurrentOrderProductList";
import url from "../url";
import { NumberOfPosition, OrderDetails, OrderId } from "../../StackContext";

const TAX_RATE = 0.07;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function subtotal(products) {
  let total = 0;
  products.forEach((product) => {
    total += product.amountBottle * product.price;
  });
  return total;
}

const columns = [
  { id: "bottleId", label: "Bottle Id", minWidth: 120, align: "center" },
  { id: "nameBottle", label: "Name Bottle", minWidth: 100 },
  {
    id: "producer",
    label: "Producer",
    minWidth: 120,
  },
  {
    id: "amountBottle",
    label: "Bottle Amount",
    minWidth: 100,
    align: "right",
  },
  {
    id: "price",
    label: "Price Per Bottle",
    minWidth: 100,
    align: "right",
  },
  {
    id: "totalPrice",
    label: "Total Price",
    minWidth: 100,
    align: "right",
  },
];

export default function ShipperCurrentOrder() {
  const [bottles, setBottles] = React.useState([]);
  const [data, setData] = React.useState([]);

  const { numberOfPosition, setNumberOfPosition } =
    React.useContext(NumberOfPosition);
  const { orderId, setOrderId } = React.useContext(OrderId);
  const { orderDetails, setOrderDetails } = React.useContext(OrderDetails);

  const invoiceSubtotal = subtotal(bottles);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  React.useEffect(() => {
    const savedToken = localStorage.getItem("token");
    axios
      .get(url + "/rest/api/customer/order/getOrderById", {
        headers: {
          Authorization: `Bearer ${savedToken}`,
        },
        params: { orderId },
      })
      .then((response) => {
        console.log(response);
        console.log(response.data);
        console.log(response.data.bottleListDtoList);
        setData(response.data);
        setBottles(response.data.bottleListDtoList);
        console.log(data);
        console.log(bottles);
        setOrderDetails(response.data);
        setNumberOfPosition(response.data.bottleListDtoList.length);
      });
  }, []);

  const hanldeSubmitOrder = async () => {
    const newStatus = "ReadyForPickUp";
    const savedToken = localStorage.getItem("token");
    axios
      .get(url + "/rest/api/customer/order/submitOrderStatus", {
        headers: {
          Authorization: `Bearer ${savedToken}`,
        },
        params: {
          orderId,
          status: newStatus,
        },
      })
      .then((response) => {
        console.log(response);
      });
  };

  const hanldeRejectOrder = async () => {
    const newStatus = "OrderRejectedByShipper";
    const savedToken = localStorage.getItem("token");
    axios
      .get(url + "/rest/api/customer/order/submitOrderStatus", {
        headers: {
          Authorization: `Bearer ${savedToken}`,
        },
        params: {
          orderId,
          status: newStatus,
        },
      })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        mt: 4,
      }}
    >
      <Box
        m="left"
        sx={{
          width: 300,
          ml: 4,
        }}
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 100 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ typography: "body1" }}>
                  Customer Details
                </TableCell>
                <TableCell align="right">
                  <Avatar
                    src={data.profilePhotoPath}
                    style={{
                      margin: "10px",
                      width: "60px",
                      height: "60px",
                    }}
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  First Name
                </TableCell>
                <TableCell align="right">{data.firstName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Last Name
                </TableCell>
                <TableCell align="right">{data.lastName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Phone Number
                </TableCell>
                <TableCell align="right">{data.phoneNumber}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Company
                </TableCell>
                <TableCell align="right">{data.company}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ typography: "body1" }}
                >
                  Order Details
                </TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Order Id
                </TableCell>
                <TableCell align="right">{data.orderId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Order Created Date
                </TableCell>
                <TableCell align="right">{data.createdDate}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Order Status
                </TableCell>
                <TableCell align="right">{data.status}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>
                  <Button
                    onClick={() => {
                      hanldeSubmitOrder();
                    }}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 1, mb: 1 }}
                  >
                    Submit Order
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>
                  <Button
                    onClick={() => {
                      hanldeRejectOrder();
                    }}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 1, mb: 1 }}
                  >
                    Reject Order
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Container>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={5}>
                  Product List
                </TableCell>
                <TableCell align="left" colSpan={2}>
                  Price
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Bottle Photo</TableCell>
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
              {bottles.map((bottle) => (
                <ShipperCurrentOrderProductList
                  key={bottle.bottleId}
                  bottle={bottle}
                  orderStatus={data.status}
                />
              ))}
              <TableRow>
                <TableCell rowSpan={3} colSpan={4} />
                <TableCell colSpan={2}>Subtotal</TableCell>
                <TableCell align="right">
                  {ccyFormat(invoiceSubtotal)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tax</TableCell>
                <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                  0
                )} %`}</TableCell>
                <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Stack>
  );
}
