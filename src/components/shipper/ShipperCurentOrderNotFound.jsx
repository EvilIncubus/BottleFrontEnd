import * as React from "react";
import Button from "@mui/material/Button";
import { Header, OrderId } from "../../StackContext";
import { useNavigate } from "react-router-dom";
import { Container, Grid, Paper, Typography } from "@mui/material";

export const ShipperCurrentOrderNotFount = () => {
  const { orderId, setOrderId } = React.useContext(OrderId);
  const { header, setHeader } = React.useContext(Header);
  let navigate = useNavigate();

  return (
    <Container fullWidth>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
      <Paper>
      <Grid
              sx={{
                ml: 5,
                mt: 3,
                mb: 1,
                mr: 5,
              }}
            >
        <Typography sx={{ mt: 3, mb: 2 }}>
          Order Is not selected, please go to order and select one for view details
        </Typography>
        <Button
          onClick={() => {
            navigate("/ShipperPanel/ShipperCurrentOrderNotFound"),
              hanldeViewOrder(),
              handleSetHeader("Current Order");
          }}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2, mb: 3 }}
        >
          Go to Orders
        </Button>
        </Grid>
      </Paper>
      </div>
    </Container>
  );
};
