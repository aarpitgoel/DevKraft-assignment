import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Details from "./Details";
import App from "./App";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={App} exact path="/" />
        <Route component={Details} path="/:id" />
      </Switch>
    </BrowserRouter>
  );
}
export default Router;
