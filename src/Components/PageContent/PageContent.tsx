import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { RegistrationForm } from "../RegistrationForm/RegistrationForm";
import { Home } from "../Home/Home";

export function PageContent() {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/registration">
        <RegistrationForm />
      </Route>
    </Switch>
  );
}
