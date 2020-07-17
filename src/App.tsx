import * as React from "react";
import Header from "./Components/Header/Header";
import { PageContent } from "./Components/PageContent/PageContent";
import { Menu } from "./Components/Menu/Menu";
import { withStyles, WithStyles } from "@material-ui/core";
import { appStyles } from "./Styles/Styles";
import { withRouter, RouteComponentProps } from "react-router";
import "./styles.css";

type TProps = WithStyles<typeof appStyles> & RouteComponentProps;

/**
 * Компонент приложения.
 */
class App extends React.Component<TProps> {
  render() {
    return (
      <div className={`App ${this.props.classes.root}`}>
        <Header />
        <Menu />
        <PageContent />
      </div>
    );
  }
}

const AppWithStyles = withStyles(appStyles, { withTheme: true })(App);

export default withRouter(AppWithStyles);
