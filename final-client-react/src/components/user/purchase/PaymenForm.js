import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

export default function PaymentForm(props) {

  

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField required id="cardName" label="Name on card" fullWidth autoComplete="cc-name" value={props.cardName} onChange={(e) => {props.setCardName(e.target.value)}} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            value={props.cardNumber}
            onChange={(e) => {props.setCardNumber(e.target.value)}}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="expDate" label="Expiry date" helperText="mm/yy" fullWidth autoComplete="cc-exp" value={props.cardDate} onChange={e => props.setCardDate(e.target.value)} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            value={props.cardCVV}
            onChange={(e) => {props.setCardCVV(e.target.value)}}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}