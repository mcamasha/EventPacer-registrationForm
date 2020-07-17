import * as React from "react";
import {
  Container,
  WithStyles,
  Box,
  Button,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { styles } from "../RegistrationFormStyle";
import { PhoneInput } from "./PhoneInput";
import { validateEmail } from "../Utils/Utils";
import { ISectionProps } from "../Models";

type TProps = ISectionProps & WithStyles<typeof styles>;

/**
 * Состояние компонента.
 *
 * @prop {string} passwordConfirmation Подтверждение пароля.
 */
interface IState {
  passwordConfirmation: string;
}

/**
 * Секция "Контакты".
 */
export class ContactsSection extends React.Component<TProps, IState> {
  state: IState = {
    passwordConfirmation: "",
  };

  /**
   * Обработчик изменения поля "электронная почта".
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange({ email: e.target.value });
  };

  /**
   * Обработчик изменения поля "телефон".
   *
   * @param {string} phone Телефон.
   */
  handleChangePhone = (phone: string) => {
    this.props.onChange({ phone });
  };

  /**
   * Обработчик изменения поля "Пароль".
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange({ password: e.target.value });
  };

  /**
   * Обработчик изменения поля "Пароль для подтверждения".
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  handleChangePasswordConfirmation = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({ passwordConfirmation: e.target.value });
  };

  render() {
    const {
      classes,
      onNextButtonClick,
      form: { email, facebook, telegram, password },
      isErrorVisible,
      isActionInProgress,
    } = this.props;
    const { passwordConfirmation } = this.state;

    const isEmptyEmailErrorVisible = isErrorVisible("email") && !email;
    const isPasswordConfirmationErrorVisible =
      !!passwordConfirmation && !!password && password !== passwordConfirmation;
    const isPasswordErrorVisible = isErrorVisible("password") && !password;
    const isEmailFormatErrorVisible = !!email && !validateEmail(email);

    return (
      <Container maxWidth="md" className={classes.container}>
        <Box className={classes.generalInfoFieldsContainer}>
          <Box className={classes.formColomn}>
            <Box className={classes.formRow}>
              <TextField
                label="Электронная почта"
                value={email}
                fullWidth
                error={isEmptyEmailErrorVisible || isEmailFormatErrorVisible}
                helperText={
                  isEmptyEmailErrorVisible
                    ? "Не указана электронная почта"
                    : isEmailFormatErrorVisible
                    ? "Неверный формат электронной почты"
                    : null
                }
                onChange={this.handleChangeEmail}
              />
            </Box>
            <Box className={classes.formRow}>
              <TextField
                type="password"
                label="Пароль"
                value={password}
                fullWidth
                onChange={this.handleChangePassword}
                error={isPasswordErrorVisible}
                helperText={isPasswordErrorVisible && "Не указан пароль"}
              />
            </Box>
            <Box className={classes.formRow}>
              <TextField
                type="password"
                label="Подтвердите пароль"
                value={passwordConfirmation}
                fullWidth
                error={
                  isPasswordErrorVisible || isPasswordConfirmationErrorVisible
                }
                onChange={this.handleChangePasswordConfirmation}
                helperText={
                  isPasswordErrorVisible
                    ? "Не указан пароль"
                    : isPasswordConfirmationErrorVisible
                    ? "Не совпадают пароли"
                    : ""
                }
              />
            </Box>
            <Box className={classes.formRow}>
              <PhoneInput
                isErrorVisible={isErrorVisible}
                classes={classes}
                onChange={this.handleChangePhone}
              />
            </Box>
            <Box className={classes.formRow}>
              <TextField label="Facebook" value={facebook} fullWidth />
            </Box>
            <Box className={classes.formRow}>
              <TextField label="Telegram" value={telegram} fullWidth />
            </Box>
          </Box>
        </Box>
        <Box className={classes.sectionFooter}>
          <Button
            onClick={onNextButtonClick}
            variant="contained"
            color="secondary"
            endIcon={!isActionInProgress && <ArrowForwardIosIcon />}
            disabled={isActionInProgress}
            className={classes.generalInfoNextButton}
          >
            {isActionInProgress ? (
              <CircularProgress size="1rem" />
            ) : (
              "Выслать SMS-код"
            )}
          </Button>
        </Box>
      </Container>
    );
  }
}
