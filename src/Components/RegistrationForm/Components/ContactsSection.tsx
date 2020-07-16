import * as React from "react";
import {
  Container,
  WithStyles,
  Box,
  Button,
  TextField
} from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { styles } from "../RegistrationFormStyle";
import {
  IRegistrationRequest,
  TRegistrationRequestRequiredFields
} from "../../../Models";
import { PhoneInput } from "./PhoneInput";

interface IProps {
  onNextButtonClick: () => void;
  onChange: (partial: Partial<IRegistrationRequest>) => void;
  form: IRegistrationRequest;
  isErrorVisible: (
    fieldName: keyof TRegistrationRequestRequiredFields
  ) => boolean;
}

type TProps = IProps & WithStyles<typeof styles>;

export class ContactsSection extends React.Component<TProps> {
  handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange({ email: e.target.value });
  };

  handleChangePhone = (phone: string) => {
    this.props.onChange({ phone });
  };

  render() {
    const {
      classes,
      onNextButtonClick,
      form: { email, phone, facebook, telegram },
      isErrorVisible
    } = this.props;
    const isEmailErrorVisible = isErrorVisible("email") && !email;

    return (
      <Container maxWidth="md" className={classes.container}>
        <Box className={classes.generalInfoFieldsContainer}>
          <Box className={classes.formColomn}>
            <Box className={classes.formRow}>
              <TextField
                label="Электронная почта"
                value={email}
                fullWidth
                error={isEmailErrorVisible}
                helperText={
                  isEmailErrorVisible && "Не указана электронная почта."
                }
                onChange={this.handleChangeEmail}
              />
            </Box>
            <Box className={classes.formRow}>
              <TextField
                type="password"
                label="Пароль"
                value={null}
                fullWidth
              />
            </Box>
            <Box className={classes.formRow}>
              <TextField
                type="password"
                label="Подтвердите пароль"
                value={null}
                fullWidth
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
            endIcon={<ArrowForwardIosIcon />}
          >
            Далее
          </Button>
        </Box>
      </Container>
    );
  }
}
