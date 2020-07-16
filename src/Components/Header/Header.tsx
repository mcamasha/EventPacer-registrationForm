import * as React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { getHeaderStyles } from "./HeaderStyle";
import { HeaderButton } from "./HeaderButton";
import { Link } from "react-router-dom";
import { hasUserAuth } from "../../Utils/AuthUtils";

export function Header() {
  const classes = getHeaderStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          hidden={!hasUserAuth()}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Eventpacer
        </Typography>
        <Link
          className={classes.linkItem}
          to="/registration"
          hidden={hasUserAuth()}
        >
          <HeaderButton>Регистрация</HeaderButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
