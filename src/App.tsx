import * as React from "react";
import { Header } from "./Components/Header/Header";
import { PageContent } from "./Components/PageContent/PageContent";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { theme } from "./Consts/Theme";
import { getAppStyles } from "./Styles/Styles";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles.css";

export default function App() {
  const classes = getAppStyles();

  return (
    <div className={`App ${classes.root}`}>
      <Router>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <Header />
          <PageContent />
        </ThemeProvider>
      </Router>
    </div>
  );
}
