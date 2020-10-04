import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import PaymentForm from './PaymenForm';
import Review from './Review';
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../../../actions/cart.action";
import { fetchUserInfo } from "../../../actions/user.action";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
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
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Payment details', 'Review your order'];

export default function Checkout() {
  const classes = useStyles();
  const cart = useSelector(store => store.cart);
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = React.useState(0);
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardDate, setCardDate] = useState("");
  const [cardCVV, setCardCVV] = useState("");

  const handleNext = () => {
    if(activeStep === 1) { // need to dispatch
      dispatch(placeOrder(cart, alert("order placed")));
      dispatch(fetchUserInfo());
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number has been submitted. You can check it at user center.
                </Typography>
              </React.Fragment>
            ) : (
                <React.Fragment>
                  {activeStep === 0 && <PaymentForm
                    cardName={cardName}
                    setCardName={setCardName}
                    cardNumber={cardNumber}
                    setCardNumber={setCardNumber}
                    cardDate={cardDate}
                    setCardDate={setCardDate}
                    cardCVV={cardCVV}
                    setCardCVV={setCardCVV}
                  />}
                  {
                    activeStep === 1 && <Review
                      cardName={cardName}
                      cardNumber={cardNumber}
                      cardDate={cardDate}
                      cardCVV={cardCVV}
                    />
                  }
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} className={classes.button}>
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                    </Button>
                  </div>
                </React.Fragment>
              )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}