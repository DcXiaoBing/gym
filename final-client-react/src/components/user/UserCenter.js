import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import UserDetail from "./UserDetail";
import OrderHistory from "./OrderHistory";
import Schedule from "./Schedule";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      justify="center"
      {...other}
      style={{width: "80vw"}}
    >
      {value === index && (
        <Box p={12}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: "100vh",
    flexGrow: 1
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.init ? props.init : 0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="View Profile" {...a11yProps(0)} />
        <Tab label="Balance & Orders" {...a11yProps(1)} />
        <Tab label="Classes" {...a11yProps(2)} />
      </Tabs>
      <TabPanel component="span" value={value} index={0}>
        <UserDetail />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <OrderHistory />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Schedule />
      </TabPanel>
    </Box>
  );
}
