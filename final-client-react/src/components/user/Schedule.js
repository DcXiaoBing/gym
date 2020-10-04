import React, { useEffect } from "react";
import { Container, Grid, Typography, List, Divider, Card, CardContent, Button, ListItem, ListItemText } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { cancelScheduledClass, fetchScheduledClass } from "../../actions/schedule.action";
import { getTodayDate } from "../../utils/tools";

export default function (props) {

  const dispatch = useDispatch();
  const scheduledClasses = useSelector(store => store.scheduledClasses);

  useEffect(() => {
    dispatch(fetchScheduledClass());
  }, [])

  return (
    <Container maxWidth="sm">
      <Grid container justify="center" alignItems="center" >
        <Grid item sm={12}>
          <br></br>
          <Typography component="h1" variant="h5" align="center" >
            Registered Classes
          </Typography>
          <br></br>
        </Grid>
      </Grid>

      <br></br>
      <Divider />
      <br></br>

      {(scheduledClasses && scheduledClasses.length === 0) && (<Typography variant="h5" align="center">No reserved class.</Typography>)}
      {
        scheduledClasses && scheduledClasses.length > 0 && scheduledClasses.map((single) => {
          return (
            <Card variant="outlined" key={single.id}>
              <List disablePadding >
                <ListItem >
                  <ListItemText primary={single.name} secondary={single.description} />
                  <ListItemText primary={single.date} secondary={single.startTime.substring(0, 5) + "-" + single.endTime.substring(0, 5)} />
                  {console.log(new Date(single.date).getTime(), getTodayDate().getTime() - getTodayDate().getTimezoneOffset() * 1000 * 60)}
                  {new Date(single.date).getTime() >= (getTodayDate().getTime() - getTodayDate().getTimezoneOffset() * 1000 * 60) && (<Button variant="contained" color="primary" onClick={(e) => { dispatch(cancelScheduledClass(single)); dispatch(fetchScheduledClass()) }}>cancel</Button>)}
                </ListItem>
              </List>
            </Card>
          )
        })
      }
    </Container>
  );
}