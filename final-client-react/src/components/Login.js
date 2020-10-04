// import React, {Component} from 'react';
// import {login} from '../actions/auth.action';
// import {connect} from 'react-redux';
// import {Field, reduxForm} from "redux-form";

// class Login extends Component {

//   onSubmit = (user) => {
//     this.props.login(user, (res) => {
//       if (res.data.success) {
//         this.props.history.push('/home');
//       }
//     });
//   }

//   renderField({input, label, type}) {
//     return (
//       <div className="form-group">
//         <label>
//           {label}
//           <input
//             type={type}
//             name={input.name}
//             className="form-control"
//             {...input}
//           />
//         </label>
//       </div>
//     )
//   }

//   render() {
//     return (
//       <div>
//         <h2>Login</h2>
//         <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
//           <Field
//             name="username"
//             label="Username"
//             type="text"
//             component={this.renderField}
//           />
//           <Field
//             name="password"
//             label="Password"
//             type="password"
//             component={this.renderField}
//           />
//           <button className="btn btn-primary" type="submit">Submit</button>
//         </form>
//       </div>
//     );
//   }

// }

// function mapStateToProps(state) {
//   return {
//     initialValues: {
//       username: 'admin',
//       password: 'adminpass'
//     }
//   }
// }

// export default connect(mapStateToProps, {login})(
//   reduxForm({
//     form: 'LoginForm'
//   })(Login)
// );



import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../actions/auth.action";


// import { render } from "@testing-library/react";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" to="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

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

export default function SignIn(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassowrd] = useState("");
    const [remember, setRemember] = useState(false);

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(login({ username: username, password: password, "remember-me": remember }, (res) => {
            console.log(res);
            if (res && res.data.success) {
                props.history.push("/home");
            }
        }, () => {alert("username or password is wrong")}));
        // console.log({ username: username, password: password, "remember-me": remember });
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={onSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(event) => { setUsername(event.target.value) }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(event) => { setPassowrd(event.target.value) }}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" onChange={() => { setRemember(!remember) }} />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
                        <Grid item>
                            <Link to="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
    // return (
    //     <form>
    //         <input type="text" onChange={(event) => {setUsername(event.target.value)}} />
    //         <input type="text" onChange={(event) => {setPassowrd(event.target.value)}} />
    //         <button onClick={(event) => {
    //             event.preventDefault();
    //             dispatch(login({username: username, password: password}, (res) => {
    //                 console.log(res);
    //             }))
    //         }}>submit</button>
    //     </form>
    // )
}