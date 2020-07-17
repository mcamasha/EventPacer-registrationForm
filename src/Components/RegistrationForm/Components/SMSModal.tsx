import * as React from "react";
import {
  Modal,
  TextField,
  WithStyles,
  Box,
  Button,
  Grid,
  Link,
  CircularProgress,
} from "@material-ui/core";
import { styles } from "../RegistrationFormStyle";
import { IActions } from "../../../Actions/Actions";
import { IRequestSendSMSCodeResponse } from "../../../Models";
import { getPhoneForServer } from "../Utils/Utils";

/**
 * @prop {boolean} isOpen Флаг отображения модального окна.
 * @prop {Function} onClose Обработчик закрытия модального окна.
 * @prop {Function} onOpenSuccessRegistrationModal Обработчик открытия модального окна успешной регистрации.
 * @prop {number} remainingSecondsForSMS Общее количество секунд, которые нужно подождать для повторного вызова сервиса получения SMS-кода.
 * @prop {IActions} actions Действия.
 * @prop {string} phone Телефон.
 */
interface IProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSuccessRegistrationModal: () => void;
  remainingSecondsForSMS: number;
  actions: IActions;
  phone: string;
}

/**
 * Состояние компонента.
 *
 * @prop {string} smsCode SMS-код, введеный пользователем.
 * @prop {number} remainingSeconds Количество секунд, которые осталось подождать до вызова для повторного вызова сервиса получения SMS-кода.
 * @prop {boolean} isLoaderSendCodeButtonVisible Флаг отображения спиннера для кнопки отправить SMS-код.
 */
interface IState {
  smsCode: string;
  remainingSeconds: number;
  isLoaderSendCodeButtonVisible: boolean;
}

type TProps = IProps & WithStyles<typeof styles>;

/**
 * Модальное окно для верификации SMS-кода.
 */
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

  /**
   * Обработчик запроса нового SMS-кода.
   *
   */
  handleRequestNewSMSCode = () => {
    const { actions, phone } = this.props;
    const phoneForServer = getPhoneForServer(phone);

    actions
      .sendRequestToGetSMSCode(phoneForServer)
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

  /**
   * Обработчик изменения SMS-кода.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e Событие ввода смс-кода.
   */
  handleChangeSMSCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ smsCode: e.target.value });
  };

  /**
   * Задать интервал для уменьшения отсавшегося количества секунд на 1.
   */
  setSendCodeInterval = () => {
    this.smsCodeTimerId = setInterval(() => {
      let remainingSeconds = this.state.remainingSeconds;

      if (!remainingSeconds) {
        clearInterval(this.smsCodeTimerId);
        return;
      }

      this.setState({ remainingSeconds: --remainingSeconds });
    }, 1000);
  };

  /**
   * Обработчик отправки SMS-кода для верификации.
   */
  handleSendSMSCode = (): void => {
    const {
      actions,
      phone,
      onOpenSuccessRegistrationModal,
      onClose,
    } = this.props;
    const { smsCode } = this.state;
    const phoneForServer: string = getPhoneForServer(phone);

    this.setState({ isLoaderSendCodeButtonVisible: true });
    actions
      .registrationUser(phoneForServer, smsCode)
      .then(() => {
        onOpenSuccessRegistrationModal();
        onClose();
      })
      .finally(() => {
        this.setState({ isLoaderSendCodeButtonVisible: false });
      });
  };

  /**
   * Рендер тела модального окна.
   */
  renderModalBody() {
    const { classes } = this.props;
    const {
      smsCode,
      remainingSeconds,
      isLoaderSendCodeButtonVisible,
    } = this.state;

    return (
      <div className={classes.SMSModal}>
        <Box className={classes.SMSModalBody}>
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
                  <CircularProgress size="1em" />
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
