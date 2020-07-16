import * as React from "react";
import { SnackbarProvider } from "notistack";
import { Header } from "./Components/Header/Header";
import { PageContent } from "./Components/PageContent/PageContent";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { theme } from "./Consts/Theme";
import { getAppStyles } from "./Styles/Styles";
import { Router } from "react-router";
import { createBrowserHistory } from "history";

import "./styles.css";

export const history = createBrowserHistory();

export default function App() {
  const classes = getAppStyles();

  return (
    <div className={`App ${classes.root}`}>
      <SnackbarProvider>
        <Router history={history}>
          <CssBaseline />
          <ThemeProvider theme={theme}>
            <Header />
            <PageContent />
          </ThemeProvider>
        </Router>
      </SnackbarProvider>
    </div>
  );
}
