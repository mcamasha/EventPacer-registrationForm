import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { RegistrationForm } from "../RegistrationForm/RegistrationForm";
import { Home } from "../Home/Home";
import { hasUserAuth } from "../../Utils/AuthUtils";

export function PageContent() {
  return (
    <Switch>
      <Route
        path="/registration"
        render={() => (!hasUserAuth() ? <RegistrationForm /> : null)}
      />
      <Route path="/" exact render={() => (hasUserAuth() ? <Home /> : null)} />
    </Switch>
  );
}
