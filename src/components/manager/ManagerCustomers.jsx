import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Copyright } from '../Copyright'; 
import Container from "@mui/material/Container"; 
import 'reactjs-popup/dist/index.css';
import CustoemrManagerPanel from './CustomerManagerPanel';
import AddCustomer from './AddCustomer';

export default function ManagerCustomers() {

    return( 
        <Container component="main">
        <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <CustoemrManagerPanel />
          </Paper>
        </Grid>
      </Grid>
      <AddCustomer />
      <Copyright sx={{ pt: 4 }} />
      </Container>
        );
}