import * as React from "react";
import { Box, Typography } from "@material-ui/core";
import { ERegistrationFormTab } from "../Enums";

/**
 * @prop {ERegistrationFormTab} selectedTab Выбранный таб.
 * @prop {ERegistrationFormTab} index Индекс данного таба.
 */
interface IProps {
  selectedTab: ERegistrationFormTab;
  index: ERegistrationFormTab;
}

/**
 * Панель табов секций формы регистрации.
 */
export const TabPanel: React.SFC<IProps> = (props) => {
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
