import { createStyles, Theme } from "@material-ui/core";

/**
 * Стили для компонента App.
 *
 * @param {Theme} theme Тема приложения.
 */
export const appStyles = (theme: Theme) => {
  return createStyles({
    root: {
      flexGrow: 1,
    },
  });
};
