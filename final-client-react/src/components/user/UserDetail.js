import Avatar from '@material-ui/core/Avatar';
import { Button, Container, CssBaseline, Grid, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { updateUserDetail, fetchUserInfo } from "../../actions/user.action";
import { getCurrentDate } from "../../utils/tools"
import { withRouter } from 'react-router-dom';
import { checkLogin } from "../../actions/auth.action";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function UserDetail(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    
    const { userDetail, user } = useSelector((store) => {
        return { userDetail: store.userDetail, user: store.user };
    });
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        // get something before
        if (user === null) {
            dispatch(checkLogin());
        } // check user is logged in
        if (userDetail === null) {
            dispatch(fetchUserInfo((res) => { }));
        }
        console.log("fethch", userDetail);
    }, [userDetail]);

    return (
        <Container maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AccountBoxIcon />
                </Avatar>
                {!edit && <RenderViewForm edit={edit} setEdit={setEdit} />}
                {edit && <RenderEditForm edit={edit} setEdit={setEdit} />}
            </div>

        </Container>
    );
}

function RenderViewForm(props) {

    const classes = useStyles();
    const userDetail = useSelector(store => store.userDetail);

    return (
        <React.Fragment>
            <Typography component="h1" variant="h5">
                View Profile
            </Typography>
            <div>
                <TextField
                    margin="normal" fullWidth variant="standard"
                    id="name" label="Your Name"
                    value={userDetail && userDetail.name ? userDetail.name : ""} disabled
                />
                <TextField
                    margin="normal" fullWidth variant="standard"
                    id="phone" name="phone" label="You phone number"
                    value={userDetail &&userDetail.phone ? userDetail.phone : ""} disabled
                />
                <TextField
                    margin="normal" fullWidth variant="standard"
                    id="birthday" name="birthday" label="You Birthday" type="date"
                    value={userDetail && userDetail.birthday ? userDetail.birthday : getCurrentDate("-")} disabled
                />
                <TextField
                    margin="normal" fullWidth variant="standard"
                    id="email" name="email" label="You email"
                    value={userDetail && userDetail.email ? userDetail.email : ""} disabled
                />
                <TextField
                    margin="normal" fullWidth variant="standard"
                    id="address" name="address" label="You street address"
                    value={userDetail && userDetail.address ? userDetail.address : ""} disabled
                />
                <Grid container justify="space-between">
                    <Grid item xs={3}>
                        <TextField
                            margin="normal" variant="standard"
                            id="city" name="city" label="City"
                            value={userDetail && userDetail.city? userDetail.city : ""} disabled
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            margin="normal" xm={3} variant="standard"
                            id="state" name="state" label="State"
                            value={userDetail && userDetail.state? userDetail.state : ""} disabled
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            margin="normal" xm={3} variant="standard"
                            id="zip" name="zip" label="Zip Code"
                            value={userDetail && userDetail.zip? userDetail.zip : ""} disabled
                        />
                    </Grid>
                </Grid>

                <Grid container justify="space-around" spacing={2}>
                    <Grid item xs={6}>
                        <Button type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={(e) => { props.setEdit(!props.edit) }}
                        >
                            Edit
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    );
}

function RenderEditForm(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { register, handleSubmit, errors } = useForm();
    const userDetail = useSelector(store => store.userDetail);

    function submit(data, e) {
        e.preventDefault();
        console.log("data", data);
        console.log("userDetail", props.userDetail);
        // console.log(getCurrentDate("/"));
        dispatch(checkLogin());
        dispatch(updateUserDetail(data, () => {alert("success")}));
        props.setEdit(!props.edit); // exit edit mode
    }

    return (
        <React.Fragment>
            <Typography component="h1" variant="h5">
                Edit Profile
            </Typography>

            <form className={classes.form}
                noValidate
                onSubmit={handleSubmit(submit)}
            >
                <TextField
                    margin="normal" fullWidth variant="outlined"
                    id="name" label="Your Name" helperText="Input your full name"
                    name="name" autoComplete="name" autoFocus
                    inputRef={register} required
                    defaultValue={userDetail && userDetail.name? userDetail.name : ""}
                />
                <TextField
                    margin="normal" fullWidth variant="outlined"
                    id="phone" name="phone" label="You phone number"
                    inputRef={register} required
                    defaultValue={userDetail && userDetail.phone? userDetail.phone : ""}
                />
                <TextField
                    margin="normal" fullWidth variant="outlined"
                    id="birthday" name="birthday" label="You Birthday" type="date"
                    inputRef={register} required
                    defaultValue={userDetail && userDetail.birthday? userDetail.birthday : getCurrentDate("-")}
                />
                <TextField
                    margin="normal" fullWidth variant="outlined"
                    id="email" name="email" label="You email"
                    inputRef={register} required
                    defaultValue={userDetail && userDetail.email? userDetail.email : ""}
                />
                <TextField
                    margin="normal" fullWidth variant="outlined"
                    id="address" name="address" label="You street address"
                    inputRef={register} required
                    defaultValue={userDetail && userDetail.address? userDetail.address : ""}
                />
                <Grid container justify="space-between">
                    <Grid item xs={3}>
                        <TextField
                            margin="normal" variant="outlined"
                            id="city" name="city" label="City"
                            inputRef={register} required
                            defaultValue={userDetail && userDetail.city? userDetail.city : ""}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            margin="normal" xm={3} variant="outlined"
                            id="state" name="state" label="State"
                            inputRef={register} required
                            defaultValue={userDetail && userDetail.state? userDetail.state : ""}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            margin="normal" xm={3} variant="outlined"
                            id="zip" name="zip" label="Zip Code"
                            inputRef={register} required
                            defaultValue={userDetail && userDetail.zip? userDetail.zip : ""}
                        />
                    </Grid>
                </Grid>
                <Grid container justify="space-around" spacing={2}>
                    <Grid item xs={4}>
                        <Button type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Submit
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button type="submit"
                            fullWidth
                            variant="contained"
                            color="default"
                            onClick={(e) => {props.setEdit(!props.edit)}}
                        >
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </React.Fragment>
    );
}

export default withRouter(UserDetail);