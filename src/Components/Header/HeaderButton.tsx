import React from "react";
import { Button } from "@material-ui/core";

interface IProps {
  className?: string;
}

export const HeaderButton: React.SFC<IProps> = props => {
  return (
    <Button className={props.className} color="inherit">
      {props.children}
    </Button>
  );
};
