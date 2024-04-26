import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Paper } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker"

export default function ShipperDashboardFilter({
  handleChangeStatus,
  handleChangeFromDate,
  handleChangeToDate,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
}) {
  return (
    <>
      <Paper
        sx={{
          paddingTop: 2,
          paddingBottom: 2,
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
          <Typography gutterBottom variant="h5" component="div">
            Select Status
          </Typography>
          <FormGroup onChange={handleChangeStatus}>
            <FormControlLabel
              control={<Checkbox />}
              label="Approved By Customer"
              value="ApprovedByCustomer"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Created"
              value="Created"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Delivered"
              value="Delivered"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Processed By The Warehouse"
              value="ProcessedByTheWarehouse"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="On The Way"
              value="OnTheWay"
            />
          </FormGroup>
          <Typography gutterBottom variant="h5" component="div">
            Select Start Date
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                format="YYYY-MM-DD"
                value={fromDate}
                onChange={(newValue) => {
                  setFromDate(newValue), handleChangeFromDate(newValue);
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
          <Typography sx={{ mt: 3 }} gutterBottom variant="h5" component="div">
            Select End Date
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                format="YYYY-MM-DD"
                value={toDate}
                onChange={(newValue) => {
                  setToDate(newValue), handleChangeToDate(newValue);
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
      </Paper>
    </>
  );
}
