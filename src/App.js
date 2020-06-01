import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Images } from "./images";
import { GamePage } from "./game";
import { Home } from "./home";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/images">Images</Link>
            </li>
            {/* <li>
              <Link to="/game">Users</Link>
            </li> */}
          </ul>
        </nav>
        <Switch>
          <Route path="/images">
            <Images />
          </Route>
          <Route path="/game">
            <GamePage />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
