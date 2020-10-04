import React from "react";
import ReactDOM from "react-dom";
import Map from "./Map";
import { Grid, Typography, Box, Container } from "@material-ui/core";

export default function () {
  return (
    <Container component="main" maxWidth="md">
      <Grid container justify="space-between">
        <Grid item xs={12} md={6}>
          <Typography variant="h5" align="start" color="textSecondary" component="p">
            Find Us
          </Typography>
          <ul>
            <Typography component="li" variant="subtitle1" align="start">
              29 Commonwealth Terrace
          </Typography>
            <Typography component="li" variant="subtitle1" align="start">
              Brighton, MA, 02135
          </Typography>

          </ul>
          <a href="https://www.google.com/maps/place/BURN+Fitness+Studios/@42.341886,-71.0828727,17z/data=!4m8!1m2!2m1!1sburn+fitness+studios!3m4!1s0x89e37a16b7a15929:0xfc0ab886fa05c573!8m2!3d42.3416029!4d-71.080891" target="_blank">Get Direction</a>
        </Grid>
        <Grid item xs={12} md={6}>
          <Map />
        </Grid>
      </Grid>
    </Container>

  );
}
