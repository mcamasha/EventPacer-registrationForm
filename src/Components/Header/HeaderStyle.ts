import { makeStyles } from "@material-ui/core";

export const getHeaderStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  linkItem: {
    textDecoration: "none",
    color: "inherit"
  }
}));
