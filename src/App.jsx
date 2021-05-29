import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectUserEmail } from "features/userSlice";

import HomeScreen from "screens/HomeScreen";
import LoginScreen from "screens/LoginScreen";

const App = () => {
  const userEmail = useSelector(selectUserEmail);
  return (
    <Router>
      {!userEmail ? (
        <LoginScreen />
      ) : (
        <Switch>
          <Route path="/">
            <HomeScreen />
          </Route>
        </Switch>
      )}
    </Router>
  );
};

export default App;
