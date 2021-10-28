import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./page/login";
import Home from "./page/home";

export default function AppNavigator(props) {
  // const ProtectedRoute = (params) => {
  //   return UserProfile.getCredential() ? (
  //     <Route {...params} render={() => <params.component />} />
  //   ) : (
  //     <Redirect to={alterPath("/login")} />
  //   );
  // };

  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  );
}
