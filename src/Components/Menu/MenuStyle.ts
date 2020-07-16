import { createStyles, Theme } from "@material-ui/core";

export const styles = (theme: Theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: theme.spacing(30),
    },
  });
