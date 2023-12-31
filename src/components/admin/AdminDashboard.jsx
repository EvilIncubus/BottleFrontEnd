import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import UsersAdminPanel from "./UsersAdminPanel";
import { Copyright } from "../Copyright";
import Box from "@mui/material/Box";
import AddUser from "./AddUser";

export default function AdminDashboard() {
  return (
    <Box  m='auto' sx={{
      width: 1300 
    }}>
      <Grid container spacing={2}>
        <Grid item xs={20}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <UsersAdminPanel />
          </Paper>
        </Grid>
      </Grid>
        <AddUser />
      <Copyright sx={{ pt: 4 }} />
      </Box>
  );
}
