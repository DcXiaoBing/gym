import React, { useEffect } from "react";
import { Container, Typography, Grid, Divider, List, ListItem, ListItemText, Card } from "@material-ui/core";
import { fetchUserInfo } from "../../actions/user.action";
import { useSelector, useDispatch } from "react-redux";
import { checkLogin } from "../../actions/auth.action";
import { fetchOrders } from "../../actions/order.action";

function Balance(props) {
  const dispatch = useDispatch();
  const { userDetail, user } = useSelector((store) => {
    return { userDetail: store.userDetail, user: store.user };
  });

  useEffect(() => {
    // get something before
    if (user === null) {
      dispatch(checkLogin());
    } // check user is logged in
    if (userDetail === null) {
      dispatch(fetchUserInfo((res) => { }));
    }
  }, [userDetail]);

  return (
    <Grid container justify="center">
      <Grid item sm={12}>
        <Typography align="left">
          Membership End At: {!userDetail || !userDetail.membershipEnd ? "No membership" : userDetail.membershipEnd}
        </Typography>
      </Grid>
      <Grid item sm={4}>
        <Typography>
          Ticket Count: {userDetail ? userDetail.ticketCount : 0}
        </Typography>
      </Grid>
      <Grid item sm={4}>
        <Typography>
          Class Count: {userDetail ? userDetail.classCount : 0}
        </Typography>
      </Grid>
      <Grid item sm={4}>
        <Typography>
          Training Count: {userDetail ? userDetail.trainingCount : 0}
        </Typography>
      </Grid>
    </Grid>
  );
}

function Orders(props) {
  const dispatch = useDispatch();
  const orders = useSelector(store => store.orders);

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchUserInfo());
  }, []);

  return (
    <div style={{borderSpacing:"5px 1rem"}}>
      {
        orders.map(order => {
          return (
            <React.Fragment key={order.id}>
            <Card variant="outlined">
              <Order order={order} />
            </Card>
            <br></br>
            </React.Fragment>
          )
        })
      }
      {
        (!orders || orders.length === 0) && (
          <Typography>No Orders</Typography>
        )
      }
    </div>
  );
}

function Order(props) {
  return (
    <List disablePadding>
      <ListItem>
        <ListItemText primary={"Order Id:" + props.order.id} secondary={"Date: " + props.order.purchase_date} />
      </ListItem>
      {
        props.order.purchases.map(purchase => {
          return (
            <ListItem key={purchase.product.name}>
              <ListItemText primary={purchase.product.name} secondary={purchase.product.description} />
              <Typography variant="body2">
                {`$ ${purchase.product.price} * ${purchase.quantity}`}
              </Typography>
            </ListItem>
          );
        })
      }
    </List>
  );
}

export default function (props) {
  return (
    <Container maxWidth="sm">
        <Typography component="h1" variant="h5" align="center">
          Balance & Order History
        </Typography>
        <Divider />
        <br></br>
        <Balance />
        <Divider />
        <br></br>
        <Orders />
    </Container>
  )
}