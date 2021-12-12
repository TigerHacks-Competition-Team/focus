import React, { useEffect } from "react";
import logo from "./logo.svg";
import Amplify, { Auth } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui/dist/style.css";
import awsconfig from "./aws-exports";
import HomePage from "./Pages/HomePage";
import TimerPage from "./Pages/TimerPage";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = ({ signOut, user }) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/demo">
          <TimerPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
