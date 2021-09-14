import * as React from "react";
import { withFirebase } from "../Firebase";

import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function EditActivity(props) {
  const classes = useStyles();

  const {
    authUser,
    firebase,
    activity,
    activityKey,
    setEditing,
    setOpenSnackbar,
    setSnackbarMsg,
  } = props;
  const uid = authUser.uid;

  // Set default activity object
  const defaultActivity = {
    name: activity.name,
    type: activity.type,
    duration: activity.duration,
    date: activity.date,
  };

  const [newActivity, setNewActivity] = React.useState(defaultActivity);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewActivity({
      ...newActivity,
      [name]: value,
    });
  };

  const handleSlider = (e, value) => {
    const duration = value.toString();
    setNewActivity({ ...newActivity, duration });
  };

  const isValid = newActivity.name === "";

  // Add the activity to firebase via the API made in this app
  const handleSubmit = (action) => {
    if (authUser) {
      firebase.updateActivity(uid, newActivity, activityKey);
      setEditing(false);
      // Show alert and hide after 3sec
      setOpenSnackbar(true);
      setSnackbarMsg("Updated activity");
      setTimeout(() => {
        setOpenSnackbar(false);
      }, 3000);
    }
  };

  return (
    <form noValidate onSubmit={(e) => e.preventDefault()}>
      <FormControl className={classes.formControl}>
        <TextField
          style={{ marginTop: "5px" }}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={newActivity.name}
          label="Activity name"
          name="name"
          onChange={handleChange}
        />
        <div style={{ marginTop: "20px", marginBottom: "30px" }}>
          <Typography id="discrete-slider" gutterBottom>
            Type
          </Typography>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={newActivity.type}
            style={{ minWidth: "100%" }}
            name="type"
            onChange={handleChange}
          >
            <MenuItem value={1}>Exercise</MenuItem>
            <MenuItem value={2}>Nutrition</MenuItem>
            <MenuItem value={3}>Sleep</MenuItem>
          </Select>
        </div>
        <Typography id="discrete-slider" gutterBottom>
          Duration
        </Typography>
        <Slider
          key={`slider-${newActivity.duration}`}
          defaultValue={parseInt(newActivity.duration)}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={1}
          min={0}
          max={100}
          name="duration"
          onChangeCommitted={handleSlider}
          style={{ marginBottom: "20px" }}
        />
      </FormControl>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={() => handleSubmit("add")}
        disabled={isValid}
      >
        Save activity
      </Button>
    </form>
  );
}

export default withFirebase(EditActivity);
