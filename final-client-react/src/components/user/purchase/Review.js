import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Grid, Divider} from '@material-ui/core';
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review(props) {
  const classes = useStyles();
  const cart = useSelector(store => store.cart);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cart.map((purchase) => (
          <ListItem className={classes.listItem} key={purchase.product.name}>
            <ListItemText primary={purchase.product.name} secondary={purchase.product.description} />
            <Typography variant="body2">{"$" + purchase.product.price + " * " + purchase.quantity}</Typography>
          </ListItem>
        ))}
        <Divider />
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {"$" + cart.reduce((pre, cur) => {
              return pre + cur.product.price * cur.quantity
            }, 0)}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <Typography gutterBottom>Card Holder</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{props.cardName}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>Card Number</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{props.cardNumber}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>Expire Date</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{props.cardDate}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}