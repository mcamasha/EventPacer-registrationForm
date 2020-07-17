import React from "react";
import { Button } from "@material-ui/core";

/**
 * @prop {string} className Класс CSS.
 * @prop {Function} onClick Обработчик клика по кнопке.
 */
interface IProps {
  className?: string;
  onClick?: () => void;
}

/**
 * Кнопка в хедере.
 */
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
