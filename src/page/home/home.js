import React from "react";
import SideBar from "../../components/SideBar";
import { Switch, Route } from "react-router-dom";

import Users from "../user";
import Regional from "../regional";

function Home() {
  return (
    <div>
      <SideBar />
      <Switch>
        <Route path="/home/users">
          <Users />
        </Route>
        <Route path="/home/regional">
          <Regional />
        </Route>
      </Switch>
    </div>
  );
}

export default Home;
