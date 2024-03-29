import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Home from "./components/Home/Home";
import Result from "./components/Result/Result";

export default function App() {
  console.log('test commit');
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
