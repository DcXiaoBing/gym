import React, { useEffect, useState } from "react";
import { Container, Grid, Button, Table, TableHead, TableRow, TableCell, TableBody, Dialog, DialogTitle, TextField, DialogContent, DialogActions } from "@material-ui/core";
import Title from "./Title";
import { useDispatch, useSelector } from "react-redux";
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import { fetchFuthureClasses, addClass, deleteClass } from "../../actions/manageClass.action";
import { getTodayDate, getCurrentDate, getMilliseconds } from "../../utils/tools";
import { useForm } from "react-hook-form";

function EditDialog(props) {

  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();

  function submit(data) {
    data.startTime = getMilliseconds(data.startTime);
    data.endTime = getMilliseconds(data.endTime);
    dispatch(addClass(data));
    props.setOpen(false);
  }

  return (
    <Dialog open={props.open} aria-labelledby="edit-title">
      <DialogTitle id="edit-title">Edit</DialogTitle>

      <form noValidate onSubmit={handleSubmit(submit)}>
        <TextField fullWidth variant="outlined"
          id="name" name="name"
          margin="normal" label="name" inputRef={register}
          defaultValue={props.course ? props.course.name : ""}
        />
        <TextField fullWidth variant="outlined"
          id="description" name="description"
          margin="normal" label="description" inputRef={register}
          defaultValue={props.course ? props.course.description : ""}
        />
        <TextField fullWidth variant="outlined" type="date"
          id="date" name="date"
          margin="normal" label="class date" inputRef={register}
          defaultValue={props.course ? props.course.date : getCurrentDate("-")}
        />
        <TextField fullWidth variant="outlined" type="time"
          id="startTime" name="startTime"
          margin="normal" label="start time" inputRef={register}
          defaultValue={props.course ? props.course.startTime : "00:00"}
        />
        <TextField fullWidth variant="outlined" type="time"
          id="endTime" name="endTime"
          margin="normal" label="end time" inputRef={register}
          defaultValue={props.course ? props.course.endTime : "00:00"}
        />
        <DialogActions>
          <Button color="primary" type="submit">Submit</Button>
          <Button onClick={() => { props.setOpen(false) }}>Cancel</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

function NewDialog(props) {

  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  

  function submit(data) {
    data.startTime = getMilliseconds(data.startTime);
    data.endTime = getMilliseconds(data.endTime);
    dispatch(addClass(data));
    props.setOpen(false);
  }

  return (

    <Dialog open={props.open} aria-labelledby="edit-title">
      <DialogTitle id="edit-title">{props.name}</DialogTitle>

      <form noValidate onSubmit={handleSubmit(submit)}>
        <TextField fullWidth variant="outlined"
          id="name" name="name"
          margin="normal" label="name" inputRef={register}
        />
        <TextField fullWidth variant="outlined"
          id="description" name="description"
          margin="normal" label="description" inputRef={register}
        />
        <TextField fullWidth variant="outlined" type="date"
          id="date" name="date"
          margin="normal" label="class date" inputRef={register}
          defaultValue={getCurrentDate("-")}
        />
        <TextField fullWidth variant="outlined" type="time"
          id="startTime" name="startTime"
          margin="normal" label="start time" inputRef={register}
          defaultValue={"00:00"}
        />
        <TextField fullWidth variant="outlined" type="time"
          id="endTime" name="endTime"
          margin="normal" label="end time" inputRef={register}
          defaultValue={"00:00"}
        />
        <DialogActions>
          <Button color="primary" type="submit">Submit</Button>
          <Button onClick={() => { props.setOpen(false) }}>Cancel</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default function () {
  const dispatch = useDispatch();
  const todayClasses = useSelector(store => store.manageClasses);
  const [choosedCourse, setChoosedCourse] = useState(null);

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  useEffect(() => {
    dispatch(fetchFuthureClasses(getTodayDate().getTime()));
  }, []);

  return (
    <Container maxWidth="sm">
      <Grid container justify="space-between">
        <Grid item sm={11}>
          <Title>Upcoming Courses</Title>
        </Grid>
        <Grid item sm={1}>
          <AddBoxOutlinedIcon color="primary" fontSize="large" onClick={() => { setOpen1(true) }} />
          <NewDialog open={open1} setOpen={setOpen1} />
        </Grid>
      </Grid>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Operation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todayClasses && todayClasses.length > 0 && (
            todayClasses.map((course) => {
              return (
                <TableRow key={course.id}>
                  <TableCell>{course.id}</TableCell>
                  <TableCell>{course.name}</TableCell>
                  <TableCell>{course.date}</TableCell>
                  <TableCell>
                    <Button href="#text-buttons" color="primary" onClick={() => { setChoosedCourse(course); setOpen(true); }}>edit</Button>
                    <Button href="#text-buttons" color="primary"
                      onClick={() => {
                        dispatch(deleteClass(course));
                      }}
                    >delete</Button>
                  </TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>
      <EditDialog open={open} setOpen={setOpen} course={choosedCourse} />

    </Container>
  );
}