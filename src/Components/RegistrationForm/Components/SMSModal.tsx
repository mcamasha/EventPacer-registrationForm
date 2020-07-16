import * as React from "react";
import {
  Modal,
  TextField,
  WithStyles,
  Box,
  Button,
  InputAdornment,
  Grid,
  Link,
  CircularProgress,
} from "@material-ui/core";
import { styles } from "../RegistrationFormStyle";
import CloseIcon from "@material-ui/icons/Close";
import { IActions } from "../../../Actions/Actions";
import { IRequestSendSMSCodeResponse } from "../../../Models";
import { getPhoneForServer } from "../Utils/Utils";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  remainingSecondsForSMS: number;
  actions: IActions;
  phone: string;
}

interface IState {
  smsCode: string;
  remainingSeconds: number;
  isLoaderSendCodeButtonVisible: boolean;
}

type TProps = IProps & WithStyles<typeof styles>;

export class SMSModal extends React.Component<TProps, IState> {
  state: IState = {
    smsCode: "",
    remainingSeconds: 0,
    isLoaderSendCodeButtonVisible: false,
  };

  smsCodeTimerId: any;

  componentDidMount() {
    this.setState(
      { remainingSeconds: this.props.remainingSecondsForSMS },
      this.setSendCodeInterval
    );
  }

  handleRequestNewSMSCode = (event: React.SyntheticEvent) => {
    const { actions, phone } = this.props;

    actions
      .sendRequestToGetSMSCode(phone)
      .then((data: IRequestSendSMSCodeResponse | undefined) => {
        const remainingSeconds = data?.smsSessionParameters.nextSendAfterSec;

        this.setState(
          {
            remainingSeconds: !!remainingSeconds ? remainingSeconds : 0,
          },
          () => {
            clearInterval(this.smsCodeTimerId);
            this.setSendCodeInterval();
          }
        );
      });
  };

  componentWillUnmount() {
    clearInterval(this.smsCodeTimerId);
  }

  handleChangeSMSCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ smsCode: e.target.value });
  };

  setSendCodeInterval = () => {
    this.smsCodeTimerId = setInterval(() => {
      this.setState({ remainingSeconds: --this.state.remainingSeconds });
    }, 1000);
  };

  handleSendSMSCode = (): void => {
    const { actions, phone } = this.props;
    const { smsCode } = this.state;
    const phoneForServer = getPhoneForServer(phone);

    this.setState({ isLoaderSendCodeButtonVisible: true });
    actions.registrationUser(phoneForServer, smsCode).finally(() => {
      this.setState({ isLoaderSendCodeButtonVisible: false });
    });
  };

  renderModalBody() {
    const { classes, onClose } = this.props;
    const {
      smsCode,
      remainingSeconds,
      isLoaderSendCodeButtonVisible,
    } = this.state;

    return (
      <div className={classes.SMSModal}>
        <Box className={classes.SMSModalBody}>
          <CloseIcon className={classes.SMSModalCloseIcon} onClick={onClose} />
          <h2>Введите SMS-код для окончания регистрации</h2>
          <p>
            Повторно&nbsp;
            <Link href="#" onClick={this.handleRequestNewSMSCode}>
              запросить
            </Link>
            &nbsp;код можно через: {remainingSeconds} секунд.
          </p>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <TextField
                value={smsCode}
                label="SMS-код"
                onChange={this.handleChangeSMSCode}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.handleSendSMSCode}
                disabled={!smsCode || isLoaderSendCodeButtonVisible}
                className={classes.SMSModalSendCodeButton}
              >
                {isLoaderSendCodeButtonVisible ? (
                  <CircularProgress size="2rem" />
                ) : (
                  "Отправить"
                )}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  }

  render() {
    const { isOpen, onClose } = this.props;

    return (
      <Modal
        disableBackdropClick
        open={isOpen}
        disableEscapeKeyDown
        onClose={onClose}
      >
        {this.renderModalBody()}
      </Modal>
    );
  }
}
