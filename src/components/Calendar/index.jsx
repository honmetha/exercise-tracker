import { withAuthentication } from "../Session";
// import moment from "moment";

import Grid from "@material-ui/core/Grid";

import CalendarBody from "./calendar-body";
import CalendarHead from "./calendar-head";

function Calendar(props) {
  // const { firebase, authUser } = props;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8} lg={9}>
        <CalendarHead />
        <CalendarBody />
      </Grid>
    </Grid>
  );
}

export default withAuthentication(Calendar);
