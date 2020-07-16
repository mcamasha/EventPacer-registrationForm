import * as React from "react";
import {
  withStyles,
  WithStyles,
  Drawer,
  ListItem,
  List,
  Divider,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { styles } from "./HomeStyle";
import { MENU_ITEMS_CONFIGS } from "./Consts";

type TProps = WithStyles<typeof styles>;

interface IState {}

class Home extends React.Component<TProps, IState> {
  renderDrawerBody() {
    return (
      <div>
        <div className={this.props.classes.toolbar} />
        <Divider />
        <List>
          {MENU_ITEMS_CONFIGS.map(({ label, icon }) => (
            <ListItem button key={label}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <nav>
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {this.renderDrawerBody()}
        </Drawer>
      </nav>
    );
  }
}

const HomeWithStyles = withStyles(styles, {
  withTheme: true,
})(Home);

export { HomeWithStyles as Home };
