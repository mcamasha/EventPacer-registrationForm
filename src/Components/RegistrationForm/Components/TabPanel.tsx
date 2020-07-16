import * as React from "react";
import { Box, Typography } from "@material-ui/core";
import { ERegistrationFormTab } from "../Enums";

interface IProps {
  selectedTab: ERegistrationFormTab;
  index: ERegistrationFormTab;
}

export const TabPanel: React.SFC<IProps> = props => {
  const { children, selectedTab, index } = props;

  return (
    <div role="tabpanel" hidden={selectedTab !== index}>
      {selectedTab === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};
