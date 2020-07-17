import { createStyles, Theme } from "@material-ui/core";

/**
 * Стили для хедера.
 *
 * @param {Theme} theme Тема приложения.
 */
export const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    linkItem: {
      textDecoration: "none",
      color: "inherit",
    },
  });
