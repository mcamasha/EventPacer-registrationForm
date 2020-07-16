import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { RegistrationForm } from "../RegistrationForm/RegistrationForm";

export function PageContent() {
  return (
    <Switch>
      <Route path="/registration">
        <RegistrationForm />
      </Route>
      {/* <Route path="/topics">
        <Topics />
      </Route>
      <Route path="/">
        <Home />
      </Route> */}
    </Switch>
  );
}
