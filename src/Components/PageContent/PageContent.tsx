import * as React from "react";
import { Route, Switch, RouteProps, Redirect } from "react-router-dom";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import Home from "../Home/Home";
import { hasUserAuth } from "../../Utils/AuthUtils";

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

interface IProps extends RouteProps {
  enabled: boolean;
}

function PrivateRoute({ children, enabled, ...rest }: IProps) {
  return <Route {...rest} render={() => (enabled ? children : null)} />;
}
