import * as React from "react";
import { withAuthentication } from "../Session";
import moment from "moment";

import Grid from "@material-ui/core/Grid";

import CalendarBody from "./calendar-body";
import CalendarHead from "./calendar-head";

function Calendar(props) {
  // const { firebase, authUser } = props;
  const defaultSelectedDay = {
    day: moment().format("D"),
    month: moment().month(),
  };

  /* HOOKS */
  const [dateObject, setdateObject] = React.useState(moment());
  const [showMonthTable, setShowMonthTable] = React.useState(false);
  const [selectedDay, setSelected] = React.useState(defaultSelectedDay);
  // Later add hook for active days from database

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
      </Grid>
    </Grid>
  );
}

export default withAuthentication(Calendar);
