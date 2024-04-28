import * as React from "react";
import { useEffect } from "react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import Badge from "@mui/material/Badge";
import axios from "axios";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useContext, useState } from "react";
import {
  Header,
  NumberOfPosition,
  OrderDetails,
  OrderId,
  UserContext,
} from "../../StackContext";
import url from "../../components/url";


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

export const ShipperPanel = () => {
  const { orderDetails, setOrderDetatils } = React.useContext(OrderDetails);
  const { header, setHeader } = React.useContext(Header);
  const { numberOfPosition, setNumberOfPosition } =
    React.useContext(NumberOfPosition);
    const { user, setUser } = useContext(UserContext);
  const { orderId, setOrderId } = React.useContext(OrderId);
  const [numberOfNotificaion, setNumberOfNotificaion] = React.useState();
  const savedToken = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
  };
  let navigate = useNavigate();

  const handleSetHeader = (value) => {
    console.log(value);
    setHeader(value);
  };

  useEffect(() => {
    let interval = setInterval(() => {
      axios
      .get(
        url + "/rest/api/notification/getNumberOfActiveNotification",
        {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
          params: {
            email: user.sub,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setNumberOfNotificaion(response.data);
      });
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    navigate("/ShipperPanel/ShipperDashboard");
    handleSetHeader("Shipper Dashboard");
  }, []);

  const handleOpenOrder = () => {
    console.log(orderId);
    if (orderId) {
      navigate("/ShipperPanel/ShipperCurrentOrder");
    } else {
      navigate("/ShipperPanel/ShipperCurrentOrderNotFound");
    }
    handleSetHeader("Current Order");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="absolute" open={false}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            {header}
          </Typography>
          <HtmlTooltip title="Notificaion">
            <IconButton
              color="inherit"
              onClick={() => {
                navigate("/ShipperPanel/ShipperNotification"),
                  handleSetHeader("Notificaion");
              }}
            >
              <Badge badgeContent={numberOfNotificaion} color="secondary">
              <NotificationsIcon />
              </Badge>
            </IconButton>
          </HtmlTooltip>
          <HtmlTooltip title="Shipper Dashboard">
            <IconButton
              color="inherit"
              onClick={() => {
                navigate("/ShipperPanel/SHipperDashboard"),
                  handleSetHeader("Shipper Dashboard");
              }}
            >
              <HomeIcon />
            </IconButton>
          </HtmlTooltip>
          <HtmlTooltip
            title={
              <React.Fragment>
                <div>
                  <Box>
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        Order ID : {orderDetails.orderId}
                      </Typography>
                      <Typography variant="h5" component="div">
                        Customer : {orderDetails.company}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Number of Position : {numberOfPosition}
                      </Typography>
                      <Typography variant="body2">
                        Order Created Date : {orderDetails.createdDate}
                      </Typography>
                    </CardContent>
                  </Box>
                </div>
              </React.Fragment>
            }
          >
            <IconButton
              color="inherit"
              onClick={() => {
                handleOpenOrder();
              }}
            >
              <Badge badgeContent={numberOfPosition} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </HtmlTooltip>
          <HtmlTooltip title="Log Out">
            <IconButton
              color="inherit"
              onClick={() => {
                navigate("/LoginPage"), handleLogout();
              }}
            >
              <LogoutIcon />
            </IconButton>
          </HtmlTooltip>
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};
