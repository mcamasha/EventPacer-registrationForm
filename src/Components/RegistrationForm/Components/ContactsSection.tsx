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
import {
  IRegistrationRequest,
  TRegistrationRequestRequiredFields,
} from "../../../Models";
import { PhoneInput } from "./PhoneInput";
import { validateEmail } from "../Utils/Utils";

interface IProps {
  onNextButtonClick: () => void;
  onChange: (partial: Partial<IRegistrationRequest>) => void;
  form: IRegistrationRequest;
  isErrorVisible: (
    fieldName: keyof TRegistrationRequestRequiredFields
  ) => boolean;
  isActionInProgress?: boolean;
}

type TProps = IProps & WithStyles<typeof styles>;

interface IState {
  passwordConfirmation: string;
}

export class ContactsSection extends React.Component<TProps, IState> {
  state: IState = {
    passwordConfirmation: "",
  };

  handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange({ email: e.target.value });
  };

  handleChangePhone = (phone: string) => {
    this.props.onChange({ phone });
  };

  handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange({ password: e.target.value });
  };

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
