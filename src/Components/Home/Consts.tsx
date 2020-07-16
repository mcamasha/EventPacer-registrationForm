import AccountBoxIcon from "@material-ui/icons/AccountBox";
import * as React from "react";
import DateRangeIcon from "@material-ui/icons/DateRange";
import StarIcon from "@material-ui/icons/Star";
import { IMenuItemConfig } from "./Models";

export const MENU_ITEMS_CONFIGS: IMenuItemConfig[] = [
  {
    label: "Мероприятия",
    icon: <DateRangeIcon />,
  },
  {
    label: "Подписчики",
    icon: <StarIcon />,
  },
  {
    label: "Аккаунт",
    icon: <AccountBoxIcon />,
  },
];
