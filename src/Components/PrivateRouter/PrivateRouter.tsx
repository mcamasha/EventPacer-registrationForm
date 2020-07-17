import * as React from "react";
import { Route, RouteProps } from "react-router-dom";

/**
 * @prop {boolean} enabled Доступен ли роут.
 */
interface IProps extends RouteProps {
  enabled: boolean;
}

/**
 * Компонент роута доступного по наличию условия.
 */
export const PrivateRoute: React.SFC<IProps> = ({
  children,
  enabled,
  ...rest
}) => {
  return <Route {...rest} render={() => (enabled ? children : null)} />;
};
