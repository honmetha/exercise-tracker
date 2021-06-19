import * as React from "react";
import { withAuthentication } from "../Session";
import moment from "moment";

import Grid from "@material-ui/core/Grid";

import CalendarBody from "./calendar-body";
import CalendarHead from "./calendar-head";

function Calendar(props) {
  // const { firebase, authUser } = props;

  /* HOOKS */
  const [dateObject, setdateObject] = React.useState(moment());
  const [showMonthTable, setShowMonthTable] = React.useState(false);

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
        <CalendarBody />
      </Grid>
    </Grid>
  );
}

export default withAuthentication(Calendar);
