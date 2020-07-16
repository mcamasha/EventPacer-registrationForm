import React from "react";
import { Button } from "@material-ui/core";

interface IProps {
  className?: string;
  onClick?: () => void;
}

export const HeaderButton: React.SFC<IProps> = ({
  className,
  children,
  onClick,
}) => {
  return (
    <Button onClick={onClick} className={className} color="inherit">
      {children}
    </Button>
  );
};
