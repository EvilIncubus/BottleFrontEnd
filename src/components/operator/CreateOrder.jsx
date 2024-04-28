import React, { useContext } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Button, Paper } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import axios from "axios";
import { Box } from "@mui/material";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { ProductList } from "./ProductList";
import url from "../url";
import {
  NumberOfPosition,
  OrderDetails,
  OrderId,
  UserContext,
} from "../../StackContext";
import CreateOrderColapse from "./createOrderComponent/CreateOrderColapse";
import CreateOrderForm from "./createOrderComponent/CreateOrderForm";
import CreateOrderFilter from "./createOrderComponent/CreateOrderFilter";

export default function CreateOrder() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(9);
  const [dataT, setDataT] = React.useState([]);
  const [count, setCount] = React.useState([]);
  const [price, setPrice] = React.useState([7, 50]);
  const [minPrice, setMinPrice] = React.useState(7);
  const [maxPrice, setMaxPrice] = React.useState(50);
  const [packaging, setPackaging] = React.useState({
    Plastic: false,
    Paper: false,
    Glass: false,
    Can: false,
  });
  const [volume, setVolume] = React.useState([]);
  const [categories, setCategories] = React.useState({
    Mineral: false,
    Soda: false,
    Juice: false,
    Energy: false,
  });
  const [sugar, setSugar] = React.useState();

  const [companies, setCompanies] = React.useState([]);
  const [company, setCompany] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [openOk, setOpenOk] = React.useState(false);
  const [selectCustomer, setSelectCustomer] = React.useState();
  const { numberOfPosition, setNumberOfPosition } =
    useContext(NumberOfPosition);
  const { user, setUser } = React.useContext(UserContext);
  const { orderDetails, setOrderDetails } = useContext(OrderDetails);
  const { orderId, setOrderId } = React.useContext(OrderId);

  const handleClickOpen = () => {
    const savedToken = localStorage.getItem("token");
    axios
      .get(url + "/rest/api/user/getListOfCustomersForOperator", {
        headers: {
          Authorization: `Bearer ${savedToken}`,
        },
      })
      .then((response) => {
        setCompanies(response.data);
        console.log(response.data);
      });
    setCompany(companies.map(({ company }) => ({ label: company })));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreated = () => {
    setOpenOk(true);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log(value);
    const savedToken = localStorage.getItem("token");
    axios
      .get(url + "/rest/api/user/getSearchListOfCustomersForOperator", {
        headers: {
          Authorization: `Bearer ${savedToken}`,
        },
        params: {
          search: value,
        },
      })
      .then((response) => {
        console.log(response.data);
        setCompanies(response.data)
        setCompany(
          response.data.map(({ company }) => ({
            label: company,
          }))
        );
      });
  };

  const hanldeCreateOrder = async () => {
    const customer = companies.find((customer) => {
      return customer.company === selectCustomer;
    });
    console.log(customer)
    console.log(companies)
    const savedToken = localStorage.getItem("token");
    const createStatus = "Created";
    console.log(user);
    axios
      .post(
        url + "/rest/api/customer/order/createOrder",
        {
          profileId: customer.profileId,
          address: customer.address,
          status: createStatus,
          operatorEmail: user.sub,
        },
        {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        }
      )
      .then((response) => {
        setOrderId(response.data.orderId);
        setOrderDetails(response.data);
        setNumberOfPosition(0);
        console.log(response.data);
        handleCreated();
      })
      .catch((err) => {
        setOpenError(true);
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePrice = (event) => {
    const {
      target: { value },
    } = event;
    setPrice(typeof value === "string" ? value.split(",") : value);
    setMinPrice(event.target.value?.[0]);
    setMaxPrice(event.target.value?.[1]);
    console.log(minPrice);
    console.log(maxPrice);
  };

  const handleChangeVolume = (event) => {
    const {
      target: { value },
    } = event;
    setVolume(typeof value === "string" ? value.split(",") : value);
    console.log(volume);
  };

  const handleChangeCategories = (event) => {
    const {
      target: { value },
    } = event;
    setCategories({ ...categories, [value]: !categories[value] });
    console.log(categories);
  };

  const handleChangePackaging = (event) => {
    const {
      target: { value },
    } = event;
    setPackaging({ ...packaging, [value]: !packaging[value] });
    console.log(packaging);
  };

  const handleChangeSugar = (event) => {
    const {
      target: { value },
    } = event;
    console.log(event);
    setSugar(value);
    console.log(sugar);
  };

  React.useEffect(() => {
    console.log(categories);
    const savedToken = localStorage.getItem("token");
    const categoriesQuery = Object.keys(categories).filter(
      (key, index) => Object.values(categories)[index]
    );
    const packagingQuery = Object.keys(packaging).filter(
      (key, index) => Object.values(packaging)[index]
    );
    console.log(url);
    axios
      .post(
        url + "/rest/api/bottles/getListOfFilterBottles",
        {
          categories: categoriesQuery,
          minPrice,
          maxPrice,
          packaging: packagingQuery,
          sugar,
          page: page + 1,
          size: rowsPerPage,
        },
        {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        }
      )
      .then((response) => {
        setDataT(response.data.content);
        setCount(response.data);
        console.log(response.data.content);
      });
  }, [categories, packaging, minPrice, maxPrice, sugar, page, rowsPerPage]);

  const handleSearch = async (event) => {
    const {
      target: { value },
    } = event;
    console.log(value);
    const savedToken = localStorage.getItem("token");
    axios
      .get(url + "/rest/api/bottles/getSearchBottleByBrand", {
        headers: {
          Authorization: `Bearer ${savedToken}`,
        },
        params: {
          search: value,
          page: page + 1,
          size: rowsPerPage,
        },
      })
      .then((response) => {
        setDataT(response.data.content);
        setCount(response.data);
        console.log(response.data.content);
      });
  };

  return (
    <>
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
          <Paper
            sx={{
              paddingTop: 2,
              paddingBottom: 2,
              mb: 2,
            }}
          >
            <Grid
              sx={{
                ml: 5,
                mt: 1,
                mb: 1,
                mr: 5,
              }}
            >
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={handleClickOpen}
              >
                Create Order
              </Button>
              <CreateOrderColapse
                openOk={openOk}
                setOpenOk={setOpenOk}
                openAdd={openAdd}
                setOpenAdd={setOpenAdd}
                openError={openError}
                setOpenError={setOpenError}
              />
              <CreateOrderForm
                open={open}
                handleClose={handleClose}
                company={company}
                setSelectCustomer={setSelectCustomer}
                handleChange={handleChange}
                hanldeCreateOrder={hanldeCreateOrder}
              />
            </Grid>
          </Paper>
          <CreateOrderFilter
            handleChangeCategories={handleChangeCategories}
            handleChangePackaging={handleChangePackaging}
            handleChangePrice={handleChangePrice}
            handleChangeSugar={handleChangeSugar}
            handleChangeVolume={handleChangeVolume}
            price={price}
            volume={volume}
          />
        </Box>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Paper
            sx={{
              paddingTop: 2,
              paddingBottom: 2,
            }}
          >
            <Container>
              <Grid
                sx={{
                  ml: 5,
                  mt: 1,
                  mb: 1,
                  mr: 5,
                  paddingBottom: 2,
                }}
              >
                <TextField
                  fullWidth
                  label="Search"
                  id="search"
                  onChange={handleSearch}
                />
              </Grid>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                {dataT.map((bottle) => (
                  <ProductList
                    key={bottle.bottleId}
                    bottle={bottle}
                    setNumberOfPosition={setNumberOfPosition}
                    setOpenAdd={setOpenAdd}
                    handleClickOpen={handleClickOpen}
                  />
                ))}
              </Grid>
              <TablePagination
                rowsPerPageOptions={[9, 18, 36]}
                component="div"
                count={count.totalElements}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Container>
          </Paper>
        </Container>
      </Stack>
    </>
  );
}
