import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import dayjs from "dayjs";
import Title from './Title';
import url from '../../url';
import { UserContext } from '../../../StackContext';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  const [data, setData] = React.useState();
  const [date, setDate] = React.useState(dayjs(new Date(Date.now() - 86400000 )).format('DD/MM/YYYY'));
  const {user, setUser} = React.useContext(UserContext)
  React.useEffect(() => {
    const savedToken = localStorage.getItem("token");
    console.log(date)
    axios
      .get(
        url + "/rest/api/customer/order/getSalesForYesterday",
        {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
          params: {
            operatorEmail: user.sub
          }
        }
      )
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      });
  }, []);
  return (
    <React.Fragment>
      <Title>Yesterday Sales</Title>
      <Typography component="p" variant="h4">
        {data} LEI
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {date}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View details
        </Link>
      </div>
    </React.Fragment>
  );
}