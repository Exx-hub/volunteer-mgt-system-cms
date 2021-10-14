import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./page/login";
import Home from "./page/home";

export default function Navigator() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
