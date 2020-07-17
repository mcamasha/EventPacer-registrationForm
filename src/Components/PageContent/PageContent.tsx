import * as React from "react";
import { Switch } from "react-router-dom";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import { PrivateRoute } from "../PrivateRouter/PrivateRouter";
import Home from "../Home/Home";
import { hasUserAuth } from "../../Utils/AuthUtils";

/**
 * Контент страницы.
 */
export function PageContent() {
  return (
    <Switch>
      <PrivateRoute path="/registration" enabled={!hasUserAuth()}>
        <RegistrationForm />
      </PrivateRoute>
      <PrivateRoute path="/" exact enabled={hasUserAuth()}>
        <Home />
      </PrivateRoute>
    </Switch>
  );
}
