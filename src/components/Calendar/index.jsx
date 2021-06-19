import * as React from "react";
import { withAuthentication } from "../Session";
import moment from "moment";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";

import CalendarBody from "./calendar-body";
import CalendarHead from "./calendar-head";
import AddActivity from "../AddActivity";
import ActivityList from "../ActivityList";

function Calendar(props) {
  const { firebase, authUser } = props;
  const defaultSelectedDay = {
    day: moment().format("D"),
    month: moment().month(),
  };

  /* HOOKS */
  const [dateObject, setdateObject] = React.useState(moment());
  const [showMonthTable, setShowMonthTable] = React.useState(false);
  const [selectedDay, setSelected] = React.useState(defaultSelectedDay);
  // Later add hook for active days from database

  /*** ADDING AN ACTIVITY ***/
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMsg, setSnackbarMsg] = React.useState(null);

  /*** ACTIVITY LIST ***/
  const [activities, setActivities] = React.useState(true);
  const [loading, setLoading] = React.useState(true);

  /* CALENDAR HEAD */
  const allMonths = moment.months();
  const currentMonth = () => dateObject.format("MMMM");
  const currentYear = () => dateObject.format("YYYY");

  const setMonth = (month) => {
    let monthNo = allMonths.indexOf(month);
    let newDateObject = Object.assign({}, dateObject);
    newDateObject = moment(dateObject).set("month", monthNo);
    setdateObject(newDateObject);
    setShowMonthTable(false);
  };

  const toggleMonthSelect = () => setShowMonthTable(!showMonthTable);

  /*** CALENDAR BODY ***/
  const setSelectedDay = (day) => {
    setSelected({
      day,
      month: currentMonthNum(),
    });
    // Later refresh data
  };

  const currentMonthNum = () => dateObject.month();
  const daysInMonth = () => dateObject.daysInMonth();
  const currentDay = () => dateObject.format("D");
  const actualMonth = () => moment().format("MMMM");

  const firstDayOfMonth = () => moment(dateObject).startOf("month").format("d");

  const retrieveData = () => {
    let queryDate = `${selectedDay.day}-${selectedDay.month}-${selectedDay.year}`;

    let ref = firebase.db.ref().child(`users/${authUser.uid}/activities`);
    ref
      .orderByChild("date")
      .equalTo(queryDate)
      .on("value", (snapshot) => {
        let data = snapshot.val();
        setActivities(data);
        setLoading(false);
      });
  };

  // Remove eslint later
  React.useEffect(() => {
    retrieveData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDay]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8} lg={9}>
        <CalendarHead
          allMonths={allMonths}
          currentMonth={currentMonth}
          currentYear={currentYear}
          setMonth={setMonth}
          showMonthTable={showMonthTable}
          toggleMonthSelect={toggleMonthSelect}
        />
        <CalendarBody
          firstDayOfMonth={firstDayOfMonth}
          daysInMonth={daysInMonth}
          currentDay={currentDay}
          currentMonth={currentMonth}
          currentMonthNum={currentMonthNum}
          selectedDay={selectedDay}
          // activeDays={activeDays}
          setSelectedDay={setSelectedDay}
          actualMonth={actualMonth}
          weekdays={moment.weekdays()}
        />
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={openSnackbar}
          message={snackbarMsg}
        />
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper className="paper">
          <>
            <h3>
              Add activity on {selectedDay.day}-{selectedDay.month + 1}{" "}
            </h3>
            <AddActivity
              selectedDay={selectedDay}
              authUser={props.authUser}
              setOpenSnackbar={setOpenSnackbar}
              setSnackbarMsg={setSnackbarMsg}
            />
          </>
        </Paper>
      </Grid>
      <Grid item xs={12} md={7}>
        <Paper className="paper">
          <h3>
            Activities on {selectedDay.day}-{selectedDay.month + 1}
          </h3>
          <ActivityList
            loading={loading}
            activities={activities}
            authUser={props.authUser}
            setOpenSnackbar={setOpenSnackbar}
            setSnackbarMsg={setSnackbarMsg}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default withAuthentication(Calendar);
