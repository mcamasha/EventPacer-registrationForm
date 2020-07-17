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
import { styles } from "./MenuStyle";
import { MENU_ITEMS_CONFIGS } from "./Consts";
import { hasUserAuth } from "../../Utils/AuthUtils";

type TProps = WithStyles<typeof styles>;

/**
 * Компонент меню.
 */
class Menu extends React.Component<TProps> {
  /**
   * Рендер меню.
   */
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
      <nav hidden={!hasUserAuth()}>
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

const MenuWithStyles = withStyles(styles, {
  withTheme: true,
})(Menu);

export { MenuWithStyles as Menu };
