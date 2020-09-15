import React from "react";
import "./index.css";
import BackpackData from "./pack/BackpackData";
import Homepage from "./homepage/index";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Homepage />
        </Route>
        <Route path="/pack">
          <BackpackData />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
