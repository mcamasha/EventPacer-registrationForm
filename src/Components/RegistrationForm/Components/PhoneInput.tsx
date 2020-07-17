import * as React from "react";
import {
  FormControl,
  InputLabel,
  WithStyles,
  Select,
  MenuItem,
  TextField,
  FormHelperText,
  Box,
} from "@material-ui/core";
import { styles } from "../RegistrationFormStyle";
import { EPhonePrefix } from "../Enums";
import { TRegistrationRequestRequiredFields } from "../../../Models";

/**
 * @prop {Function} onChange Обработчик изменения значения телефона.
 * @prop {Function} isErrorVisible Метод для проверки нужно ли отображать ошибку UI-валидации.
 */
interface IProps {
  onChange: (phone: string) => void;
  isErrorVisible: (
    fieldName: keyof TRegistrationRequestRequiredFields
  ) => boolean;
}

/**
 * Состояние компонента.
 *
 * @prop {EPhonePrefix} prefix Префикс телефона.
 * @prop {string} phone Номер телефона (без префикса).
 */
interface IState {
  prefix: EPhonePrefix;
  phone: string;
}

type TProps = IProps & WithStyles<typeof styles>;

/**
 * Компонент ввода номера телефона.
 */
export class PhoneInput extends React.Component<TProps, IState> {
  state: IState = {
    prefix: EPhonePrefix["+7"],
    phone: "",
  };

  /**
   * Опции для выпадающего списка префикса номера телефона.
   */
  options: string[] = Object.keys(EPhonePrefix);

  /**
   * Обработчик изменения префикса телефона.
   *
   * @prop {any} event Событие выбора префикса.
   */
  handleChangePrefix = (event: any) => {
    this.setState({ prefix: event.target.value as EPhonePrefix });
  };

  /**
   * Обработчик изменения телефона.
   *
   * @prop {React.ChangeEvent<HTMLInputElement>} event Событие выбора телефона.
   */
  handleChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPhoneValue: string = event.target.value;

    this.setState({ phone: newPhoneValue }, () => {
      const phone = newPhoneValue ? `${this.state.prefix}${newPhoneValue}` : "";
      this.props.onChange(phone);
    });
  };

  /**
   * Рендер опций для выпадающего списка префиксов.
   *
   */
  renderOptions() {
    return this.options.map((prefix: string) => {
      return <MenuItem value={prefix}>{prefix}</MenuItem>;
    });
  }

  render() {
    const { prefix, phone } = this.state;
    const { classes, isErrorVisible } = this.props;
    const isPhoneErrorVisible = isErrorVisible("phone") && !phone;

    return (
      <FormControl className={classes.contactsPhoneContainer}>
        <Box className={classes.contactsPhone}>
          <InputLabel error={isPhoneErrorVisible} shrink>
            Префикс
          </InputLabel>
          <Select
            labelId="demo-simple-select-placeholder-label-label"
            id="demo-simple-select-placeholder-label"
            value={prefix}
            onChange={this.handleChangePrefix}
            displayEmpty
            className={classes.contactsPrefixSelect}
            error={isPhoneErrorVisible}
          >
            {this.renderOptions()}
          </Select>
          <TextField
            label="Телефон"
            value={phone}
            fullWidth
            onChange={this.handleChangePhone}
            error={isPhoneErrorVisible}
            type="number"
          />
        </Box>
        {isPhoneErrorVisible && (
          <Box>
            <FormHelperText error>Не указан телефон.</FormHelperText>
          </Box>
        )}
      </FormControl>
    );
  }
}
