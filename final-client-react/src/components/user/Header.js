import AppBar from '@material-ui/core/AppBar';
// import {Link} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { checkLogin } from "../../actions/auth.action";
import UserPortal from "./UserPortal";

function SingupLink(props) {
    const user = useSelector(state => state.user);

    if(!user) {
        return <Link style={{color: "grey"}} to="/signup">Sign Up</Link>
    } else {
        return <span></span>;
    }
}

function Header(props) {

    const classes = useStyles();
    // const user = useSelector(state => state.user);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        // get something before
        if(user === null) {
            dispatch(checkLogin());
        }
    }, [user]);

    return (
        <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <Typography variant="h6" color="inherit" noWrap>
                    Burn!
                </Typography>
                <Box flexGrow={1} ml={4}>
                    <nav>
                        <Link color="textPrimary" to="/home" className={classes.link}>Home</Link>
                        
                        <Link color="textPrimary" to="/classes" className={classes.link}>Classes</Link>

                        <Link color="textPrimary" to="/pricing" className={classes.link}>Pricings</Link>
                        
                        <Link color="textPrimary" to="/location" className={classes.link}>Location</Link>

                        {user && checkAdmin(user) && (<Link color="textPrimary" to="/dashboard" className={classes.link}>Dashboard</Link>)}
                    </nav>
                </Box>
                <SingupLink />
                <UserPortal user={user} />
            </Toolbar>
        </AppBar>
    );
}

function checkAdmin(user) {
  const idx = user.profiles.findIndex((elem) => elem.type==="ROLE_ADMIN");
  if(idx < 0) return false;
  else return true;
}

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
    link: {
        margin: theme.spacing(1, 1.5), // top bottom, left-right
        color: "grey", 
        textDecoration: 'none'
    }
}));

export default Header;
