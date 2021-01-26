import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Home from "./components/Home";
import Result from "./components/Result";

export default function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/result/:keyWord" exact component={Result} />
        </Switch>
      </Router>
    </div>
  );
}
