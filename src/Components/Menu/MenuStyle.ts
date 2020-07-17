import { createStyles, Theme } from "@material-ui/core";

/**
 * Стили для меню.
 *
 * @param {Theme} theme Тема приложения.
 */
export const styles = (theme: Theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: theme.spacing(30),
    },
  });
