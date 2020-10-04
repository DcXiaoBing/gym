import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Typography, CssBaseline, Paper, Button, Divider, TextField, Container, Grid } from "@material-ui/core";
import { emptyCart, setProductCount, cancelItem } from "../../actions/cart.action";
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

function RenderCart(props) {

  const classes = useStyles();
  const cart = useSelector(store => store.cart);
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      {cart.map((purchase) => {
        return (
          <ListItem className={classes.listItem} key={purchase.product.name}>
            <ListItemText primary={purchase.product.name} secondary={purchase.product.description} />
            <Typography variant="body2">{"$" + purchase.product.price + " * "} </Typography>
            <TextField variant="outlined" size="small" type="number"
              style={{ width: "60px", borderSpacing: "1 3 1 1" }}
              value={purchase.quantity}
              onChange={(e) => {
                if(+e.target.value < 0) {
                  alert("Count cannot be negative");
                  return ;
                }
                dispatch(setProductCount(purchase.product, +e.target.value));
              }}
            >
            
              
            </TextField>
            <ClearIcon onClick={(e) => {dispatch(cancelItem(purchase.product))}}/>
          </ListItem>
        )
      })}
      <Divider />
      <ListItem className={classes.listItem}>
        <ListItemText primary="Total" />
        <Typography variant="subtitle1" className={classes.total}>
          {"$" + cart.reduce((pre, cur) => {
            return pre + cur.product.price * cur.quantity
          }, 0)}
        </Typography>
      </ListItem>
      <br />
      <div className={classes.buttons}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
        >
          <Link to="/checkout" style={{ color: "white" }}>CheckOut</Link>
        </Button>
        <Button
          variant="contained"
          color="default"
          className={classes.button}
          onClick={(e) => { dispatch(emptyCart()) }}
        >
          Empty Cart
        </Button>
      </div>
    </React.Fragment>
  )

}

function RenderEmpty(Props) {

  const classes = useStyles();

  return (
    <React.Fragment>
      <br />
      <Typography component="p" align="center">
        Cart is Empty. <Link to="/pricing">Go to product page.</Link>
      </Typography>
    </React.Fragment>
  );
}

export default function (props) {

  const classes = useStyles();
  const cart = useSelector(store => store.cart);

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            My Cart
          </Typography>
          <React.Fragment>
            {cart.length > 0 && <RenderCart />}
            {cart.length === 0 && <RenderEmpty />}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}