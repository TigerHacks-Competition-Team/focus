import React, { useEffect } from "react";
import logo from "./logo.svg";
import Amplify, { Auth } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui/dist/style.css";
import awsconfig from "./aws-exports";
import HomePage from "./Pages/HomePage";
import TimerPage from "./Pages/TimerPage";

Amplify.configure(awsconfig);
Auth.configure(awsconfig);

const App = ({ signOut, user }) => {
  return (
    <div className="App">
      <TimerPage />
    </div>
  );
};

export default withAuthenticator(App);
