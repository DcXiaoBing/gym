import Button from '@material-ui/core/Button';
import { Card } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/StarBorder';
import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../actions/product.action";
import { addProduct } from "../../actions/cart.action";

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const tiers = [
  {
    title: 'One Time Traning',
    price: '30',
    description: ['Pass for one personal traning'],
    buttonText: 'Buy',
    buttonVariant: 'outlined',
  },
  {
    title: 'Five Time Traning',
    price: '140',
    description: ['Pass for five personal traning'],
    buttonText: 'Buy',
    buttonVariant: 'outlined',
  },
  {
    title: 'One Time Ticket',
    price: '10',
    description: ['Ticket for entering the gym'],
    buttonText: 'Buy',
    buttonVariant: 'outlined',
  },
  {
    title: 'Monthly Pass Ticket',
    price: '280',
    description: ['Unlimit pass', 'In a natural month'],
    buttonText: 'Buy',
    buttonVariant: 'outlined',
  }
];

export default function Pricing() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const products = useSelector(store => store.products);

  useEffect(() => {
    if(products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [products]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Pricing
                </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          You can purchase entrance tickets, classes tickets, training tickets and membership here.
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {products.map((product) => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={product.name} xs={12} sm={6} md={4}>
              <Card>
                <CardHeader
                  title={product.name}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  action={product.title === 'Pro' ? <StarIcon /> : null}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography component="h2" variant="h3" color="textPrimary">
                      ${product.price}
                    </Typography>
                  </div>
                  <ul>
                    <Typography component="li" variant="subtitle1" align="center">
                      {product.description}
                    </Typography>
                  </ul>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="outlined" color="primary" onClick={(e) => {dispatch(addProduct(product))}}>
                    Add To Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>


    </React.Fragment>
  );
}