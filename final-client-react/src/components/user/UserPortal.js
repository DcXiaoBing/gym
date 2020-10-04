import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Link, withRouter } from "react-router-dom";
import { logout } from "../../actions/auth.action";

function RenderMenu(props) {
  // const user = useSelector(getUser);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    console.log(props.user);
  }, [props.user])

  return (
    <Box>
      <Button style={{ color: "grey" }} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Hi, {props.user.username} <ArrowDropDownIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem><Link to="/user-center" style={{ color: "black", textDecoration: "none" }}>User Center</Link></MenuItem>
        <MenuItem><Link to="/cart" style={{ color: "black", textDecoration: "none" }}>My Cart</Link></MenuItem>
        <MenuItem style={{ color: red[700] }} onClick={() => {
          dispatch(logout((res) => {

          }))
        }}>Sign Out</MenuItem>
      </Menu>
    </Box>
  )
}

function UserPortal(props) {
  // const user = useSelector(state => state.user);

  // self invoke function could work in parent component
  // or we should warp it to a component

  if (props.user) {
    return (<RenderMenu user={props.user} />)
  } else {
    return (<Link className="nav-link" to="/login" style={{ color: "black", textDecoration: "none" }}>Sign In</Link>)
  }
}

export default withRouter(UserPortal);