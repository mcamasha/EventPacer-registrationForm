import * as React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import { HeaderButton } from "./HeaderButton";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { hasUserAuth } from "../../Utils/AuthUtils";
import { styles } from "./HeaderStyle";
import { Actions, IActions } from "../../Actions/Actions";
import { Services } from "../../Services/Services";
import { noop } from "lodash";

type TProps = WithStyles<typeof styles> & RouteComponentProps;

class Header extends React.Component<TProps> {
  actions: IActions = new Actions(new Services(), noop, this.props.history);

  handleExitButtonClick = () => {
    this.actions.exit();
  };

  handleRegistrationtButtonClick = () => {
    this.props.history.push("/registration");
  };

  render() {
    const { classes } = this.props;
    const hasAuth: boolean = hasUserAuth();

    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Eventpacer
          </Typography>
          {!hasAuth && (
            <HeaderButton onClick={this.handleRegistrationtButtonClick}>
              Регистрация
            </HeaderButton>
          )}
          {hasAuth && (
            <HeaderButton onClick={this.handleExitButtonClick}>
              Выйти
            </HeaderButton>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

const HeaderWithRouter = withRouter(Header);

const HeaderWithStyles = withStyles(styles, {
  withTheme: true,
})(HeaderWithRouter);

export default HeaderWithStyles;
