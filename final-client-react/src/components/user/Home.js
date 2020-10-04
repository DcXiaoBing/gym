import Button from '@material-ui/core/Button';
import Container from "@material-ui/core/Container";
import Grid from '@material-ui/core/Grid';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import React from "react";
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Link } from "react-router-dom";
import { Divider } from "@material-ui/core";




const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    label: "We Fit You",
    imgPath:
      'https://images.squarespace-cdn.com/content/v1/55bd9324e4b07309dc583e18/1509936697289-EDUH2ZNV93K10GJOTWG9/ke17ZwdGBToddI8pDm48kDTmNHf-upX446UL-p605zt7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0g9xiYCO_4ze-uEG5pWlE5O37x2XSRAjWkjl3oGyYzvs8V8EzbhRT4AXAoI4twnT3Q/fullsizeoutput_7c5.jpeg?format=1000w',
  },
  {
    label: "Leading-Edge Boutique Fitness Studio",
    imgPath:
      'https://images.squarespace-cdn.com/content/v1/55bd9324e4b07309dc583e18/1473921104152-DNR1REFU2ASGE6O1J4E2/ke17ZwdGBToddI8pDm48kCSMUsACXd0oMtMzjmSpvY4UqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcYL7-wfV5YUecZv2YZZ3ozIZ5pefWLBJCgBCA1t6ffIORy8nJEYUWoIrpw3xQISkZ/burn+fitness+pounds+and+watts.jpg?format=1000w',
  },
  {
    label: "Personal Training",

    imgPath:
      'https://images.squarespace-cdn.com/content/v1/55bd9324e4b07309dc583e18/1473921007889-GSW1IUEQNZZPIT86SWP8/ke17ZwdGBToddI8pDm48kN6TAH0UfJlM_oZSRNKJS-4UqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcxytrnpdITk-AsGjf6vXpLjaehQUUIOKvdHpnUkJBNK9L-FrXxQDrUH9a-HjDsCAr/436e20_89b0ad7f35404395be0424ece2b9347c.jpg?format=1000w',
  },
  {
    label: "We've Got Class",
    imgPath:
      'https://images.squarespace-cdn.com/content/v1/55bd9324e4b07309dc583e18/1474221761032-QG020RGZKB8LFVSTKZZV/ke17ZwdGBToddI8pDm48kDHPSfPanjkWqhH6pl6g5ph7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0mwONMR1ELp49Lyc52iWr5dNb1QJw9casjKdtTg1_-y4jz4ptJBmI9gQmbjSQnNGng/IMG_5586.JPG?format=1000w',
  },
  {
    label: "Personalized Attetntion",
    imgPath:
      'https://images.squarespace-cdn.com/content/v1/55bd9324e4b07309dc583e18/1473941449360-4IIKD8UU6JCVACV8I5IT/ke17ZwdGBToddI8pDm48kIcAgu34aJPpDUE6G1ujdgMUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKc7UxvrLTJU6DXn4wpBUXfWKLnkRzHkHUHNqc7Lwsx5_450b-ozoKnU-e4xA05X6Hp/436e20_65a3648ad567298f315927b533ba9412.jpg?format=1000w',
  },
  {
    label: "Burn Fat & Build Muscle",
    imgPath:
      'https://images.squarespace-cdn.com/content/v1/55bd9324e4b07309dc583e18/1473926205927-S79K5J44GSNQCWDEPZ2O/ke17ZwdGBToddI8pDm48kOvSl7uZBiJvhHNx8kGuj7N7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UQJVLCXI9FCYomYbws-y-45T4YLCF5qkYPw7Lwwtgtn6_Pu309TggK9CQbI7GxGOBQ/436e20_5f9855e1b180c66ef7429946502f0100.jpg?format=1000w',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    display: 'block',
    overflow: 'hidden',
    height: 390,
    width: "100%"
  },
}));
function CarouselImageStepper() {
  const theme = useTheme();
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep - 1 + maxSteps) % maxSteps);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    < div className={classes.root} >
      <Paper square elevation={0} className={classes.header}>
        <Container>
          <Typography variant="h4" align="center">{tutorialSteps[activeStep].label}</Typography>
        </Container>
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {tutorialSteps.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img className={classes.img} src={step.imgPath} alt={step.label} />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        variant="dots"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        className={classes.root}
        nextButton={
          <Button size="small" onClick={handleNext}>
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
    </div >
  );
}

function RenderUserHome() {
  return (
    <Container component="main" maxWidth="md" >
      <Grid container alignItems="center" justify="center">
        <Grid item md={10}>
          <CarouselImageStepper />
        </Grid>
        <Grid item md={12}>
          <Typography variant="h4" align="center">
            BRUN FITNESS STUDIOS
                    </Typography>
                    <br></br>
        </Grid>
        <Grid item md={12}>
          <Typography>
            We are a boutique fitness studio located in the South End of Boston, offering a wide variety of specialty group fitness classes and private personal training sessions
                    </Typography>
                    <Divider />
                    <br></br>
        </Grid>
        <Grid container display="flex" justify="space-around">
          <Grid item md={3}>
            <Button fullWidth variant="contained" color="primary"><Link to="/classes" style={{ color: "white" }}>Class Schedule</Link></Button>
          </Grid>
        </Grid>

      </Grid>
    </Container>
  );
}



export default function Home() {
  // const classes = useStyles();
  return (
    <React.Fragment>
      <RenderUserHome />

    </React.Fragment>
  );
}