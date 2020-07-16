import * as React from "react";
import {
  withStyles,
  WithStyles,
  Container,
  Tabs,
  Tab,
  Paper,
} from "@material-ui/core";
import { styles } from "./HomeStyle";
import { EHomeTab } from "./Enums";

type TProps = WithStyles<typeof styles>;

interface IState {
  selectedTab: EHomeTab;
}

class Home extends React.Component<TProps, IState> {
  state: IState = {
    selectedTab: EHomeTab.LIST,
  };

  handleChangeSelectedTab = (selectedTab: EHomeTab) => (): void => {
    this.setState({ selectedTab });
  };

  handleSelectTab = (_event: React.ChangeEvent<{}>, selectedTab: EHomeTab) => {
    this.handleChangeSelectedTab(selectedTab)();
  };

  render() {
    const { selectedTab } = this.state;
    const { classes } = this.props;

    return (
      <Paper square>
        <Tabs
          value={selectedTab}
          indicatorColor="primary"
          textColor="primary"
          onChange={this.handleSelectTab}
          classes={{
            flexContainer: classes.tabContainer,
          }}
        >
          <Tab value={EHomeTab.LIST} label="Список" />
          <Tab value={EHomeTab.ARCHIVE} label="Архив" />
          <Tab value={EHomeTab.STATISTICS} label="Статистика" />
        </Tabs>
      </Paper>
    );
  }
}

const HomeWithStyles = withStyles(styles, {
  withTheme: true,
})(Home);

export { HomeWithStyles as Home };
