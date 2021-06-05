import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          Signin
        </Route>
        <Route path="/sign-up">Signup</Route>
      </Switch>
    </Router>
  );
}

export default App;
