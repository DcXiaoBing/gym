import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, List, Divider, Card, CardContent,Button, ListItem, ListItemText } from "@material-ui/core";
import Calendar from 'react-calendar';
import { useDispatch, useSelector } from "react-redux";
import { fetchClasses, registerClass } from "../../actions/class.action";

export default function (props) {

  const classes = useSelector(store => store.classes);
  const dispatch = useDispatch();
  const [date, setDate] = useState(null);

  useEffect(() => {

    if (classes === null) {
      const temp = new Date();
      temp.setHours(0);
      temp.setMinutes(0);
      temp.setSeconds(0);
      temp.setMilliseconds(0);
      dispatch(fetchClasses(temp.getTime()));
    }
    
    if (date === null) {
      const temp = new Date();
      temp.setHours(0);
      temp.setMinutes(0);
      temp.setSeconds(0);
      temp.setMilliseconds(0);
      setDate(temp);
    } else {
      dispatch(fetchClasses(date.getTime()));
    }
    
  }, [date])

  return (
    <Container maxWidth="sm" >

      <Grid container justify="center" alignItems="center" >
        <Grid item sm={12}>
          <br></br>
          <Typography component="h1" variant="h5" align="center" >
            Class Schedule
          </Typography>
          <br></br>
        </Grid>
        <Grid item>
          <Calendar
            onChange={(dd) => { console.log(date); setDate(dd); console.log(dd); }}
            value={date}
          />
        </Grid>
      </Grid>

      <br></br>
      <Divider />
      <br></br>

      {classes && classes.length === 0 && (<Typography variant="h5" align="center">No class today. Try another date.</Typography>)}

      {
        classes && classes.map((single) => {
          return (
            <Card variant="outlined" key={single.id}>
              <List disablePadding >
                <ListItem >
                  <ListItemText primary={single.name} secondary={single.description} />
                  <ListItemText primary={single.date} secondary={single.startTime.substring(0,5) + "-" + single.endTime.substring(0,5)} />
                  <Button variant="contained" color="primary" onClick={(e) => {dispatch(registerClass(single))}}>reserve</Button>
                </ListItem>
              </List>
            </Card>
          )
        })
      }


    </Container>
  )
}