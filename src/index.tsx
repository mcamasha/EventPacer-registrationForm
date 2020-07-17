import * as React from "react";
import { render } from "react-dom";
import App from "./App";
import { SnackbarProvider } from "notistack";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import { theme } from "./Consts/Theme";

const rootElement = document.getElementById("root");

render(
  <SnackbarProvider>
    <BrowserRouter>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </SnackbarProvider>,
  rootElement
);
