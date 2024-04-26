import { Copyright } from "../components/Copyright";
import { LoginForm } from "../components/LoginForm";
import {
  Avatar,
  CssBaseline,
  Box,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import axios from "axios";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import jwt_decode from "jwt-decode";
import url from "../components/url";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../StackContext";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target?.[0].value;
    const password = event.target?.[2].value;
    axios
      .post(url + "/rest/api/auth/login", { email, password })
      .then((response) => {
        localStorage.setItem("token", response.data); 
        const redirect = jwt_decode(response.data);
        console.log(response.data);
        setUser(jwt_decode(response.data));
        const isUserAdmin = !!redirect?.role?.find(
          ({ authority }) => authority === "ADMIN"
        );

        const isUserOperator = !!redirect?.role?.find(
          ({ authority }) => authority === "OPERATOR"
        );

        const isUserManager = !!redirect?.role?.find(
          ({ authority }) => authority === "MANAGER"
        );

        const isUserStoreman = !!redirect?.role?.find(
          ({ authority }) => authority === "STOREMAN"
        );

        const isUserShipper = !!redirect?.role?.find(
          ({ authority }) => authority === "SHIPPER"
        );

        isUserAdmin && navigate("/AdminPanel");
        isUserOperator && navigate("/OperatorPanel");
        isUserManager && navigate("/ManagerPanel");
        isUserStoreman && navigate("/StoremanPanel");
        isUserShipper && navigate("/ShipperPanel")
      })

  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <LoginForm handleSubmit={(handleSubmit)}></LoginForm>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Grid>
    </Grid>
  );
};
