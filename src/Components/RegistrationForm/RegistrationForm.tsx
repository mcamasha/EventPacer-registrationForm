import * as React from "react";
import { isEmpty } from "lodash";
import {
  Typography,
  withStyles,
  WithStyles,
  Container,
  Tabs,
  Tab,
  Paper,
  Box,
} from "@material-ui/core";
import { styles } from "./RegistrationFormStyle";
import { TabPanel } from "./Components/TabPanel";
import { WelcomeSection } from "./Components/WelcomeSection";
import { GeneralInformationSection } from "./Components/GeneralInformationSection";
import { SuccessRegistrationModal } from "./Components/SuccessRegistrationModal";
import { ContactsSection } from "./Components/ContactsSection";
import { SMSModal } from "./Components/SMSModal";
import { ERegistrationFormTab } from "./Enums";
import {
  IRegistrationRequest,
  TRegistrationRequestRequiredFields,
  IRequestSendSMSCodeResponse,
} from "../../Models";
import { REGISTRATION_FORM_REQUIRED_FIELDS } from "../../Consts/RegistrationFormConsts";
import { Actions, IActions } from "../../Actions/Actions";
import { Services } from "../../Services/Services";
import { withSnackbar, ProviderContext } from "notistack";
import { getPhoneForServer } from "./Utils/Utils";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { anchorOrigin } from "../../Consts/NotificationConsts";
import { REGISTRATION_FORM_VALIDATION_ERRORS } from "./Consts";

type TProps = WithStyles<typeof styles> & ProviderContext & RouteComponentProps;

/**
 * Состояние компонента.
 *
 * @prop {ERegistrationFormTab} selectedTab Выбранная вкладка.
 * @prop {IRegistrationRequest} form Форма.
 * @prop {boolean} isOpenSMSModal Флаг открыта ли модалка для ввода SMS-кода.
 * @prop {string[]} validationErrors Ошибки валидации.
 * @prop {number} remainingSecondsForSMS remainingSecondsForSMS Общее количество секунд, которые нужно подождать для повторного вызова сервиса получения SMS-кода.
 * @prop {boolean} isSendSMSRequestInProgress Флаг нахождения запроса на получение SMS-кода в состоянии прогресса.
 * @prop {boolean} isOpenSuccessRegistrationModal Флаг отображения модального окна успешной регистрации.
 */
interface IState {
  selectedTab: ERegistrationFormTab;
  form: IRegistrationRequest;
  isOpenSMSModal: boolean;
  validationErrors: string[];
  remainingSecondsForSMS: number;
  isSendSMSRequestInProgress: boolean;
  isOpenSuccessRegistrationModal: boolean;
}

/**
 * Форма регистрации.
 */
class RegistrationForm extends React.Component<TProps, IState> {
  state: IState = {
    selectedTab: ERegistrationFormTab.WELCOME,
    form: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
    isOpenSMSModal: false,
    isOpenSuccessRegistrationModal: false,
    validationErrors: [],
    remainingSecondsForSMS: 0,
    isSendSMSRequestInProgress: false,
  };

  actions: IActions = new Actions(
    new Services(),
    this.props.enqueueSnackbar,
    this.props.history
  );

  /**
   * Проверка необходимо ли показывать UI валидацию для данного поля.
   *
   * @param {keyof TRegistrationRequestRequiredFields} fieldName Наименование поля.
   */
  isErrorVisible = (
    fieldName: keyof TRegistrationRequestRequiredFields
  ): boolean => {
    return this.state.validationErrors.includes(fieldName);
  };

  /**
   * Функция валидации формы.
   *
   * @param {(keyof TRegistrationRequestRequiredFields)[]} fieldNames Массив наименовани полей, которые необходимо провалидировать.
   * @param {Function} callback Коллбек, вызываемый после валидации, в случае успеха.
   */
  validateForm(
    fieldNames: (keyof TRegistrationRequestRequiredFields)[],
    callback: () => void
  ) {
    const { form, validationErrors } = this.state;
    const { enqueueSnackbar } = this.props;
    let newValidationErrors = [...validationErrors];

    fieldNames.forEach((key: keyof TRegistrationRequestRequiredFields) => {
      if (REGISTRATION_FORM_REQUIRED_FIELDS.includes(key)) {
        if (isEmpty(form[key])) {
          !newValidationErrors.includes(key) && newValidationErrors.push(key);
        } else {
          if (newValidationErrors.includes(key)) {
            newValidationErrors = newValidationErrors.filter(
              (error) => error !== key
            );
          }
        }
      }
    });

    const sectionErrors = newValidationErrors.filter((key: string) =>
      fieldNames.includes(key as keyof TRegistrationRequestRequiredFields)
    );

    if (!isEmpty(newValidationErrors)) {
      sectionErrors.forEach((keyError) => {
        enqueueSnackbar(REGISTRATION_FORM_VALIDATION_ERRORS[keyError], {
          anchorOrigin,
          variant: "error",
        });
      });
    }

    this.setState(
      { validationErrors: newValidationErrors },
      !isEmpty(sectionErrors) ? undefined : callback
    );
  }

  /**
   * Обработчик выбора вкладки.
   *
   * @param {ERegistrationFormTab} selectedTab Выбранная вкладка.
   */
  handleChangeSelectedTab = (selectedTab: ERegistrationFormTab) => (): void => {
    this.setState({ selectedTab });
  };

  /**
   * Обработчик выбора вкладки.
   *
   * @param {React.ChangeEvent<{}>} _event Событие.
   * @param {ERegistrationFormTab} selectedTab Выбранная вкладка.
   */
  handleSelectTab = (
    _event: React.ChangeEvent<{}>,
    selectedTab: ERegistrationFormTab
  ) => {
    this.handleChangeSelectedTab(selectedTab)();
  };

  /**
   * Обработчик изменения формы.
   *
   * @param {Partial<IRegistrationRequest>} partial Набор полей из формы, которые необходимо обновить.
   */
  handleChangeForm = (partial: Partial<IRegistrationRequest>) => {
    this.setState((prevState) => ({
      form: { ...prevState.form, ...partial },
    }));
  };

  /**
   * Обработчик закрытия модалки с SMS-кодом.
   *
   */
  handleCloseSMSModal = () => {
    this.setState({ isOpenSMSModal: false });
  };

  /**
   * Обработчик открытия модалки с SMS-кодом.
   */
  handleOpenSMSModal = () => {
    this.setState({ isOpenSMSModal: true });
  };

  /**
   * Обработчик отправки запроса на получение SMS-кода.
   */
  handleSendSMSCode = () => {
    this.setState({ isSendSMSRequestInProgress: true });
    const phone = this.state.form.phone;
    const phoneForServer = getPhoneForServer(phone);

    this.actions
      .sendRequestToGetSMSCode(phoneForServer)
      .then((data: IRequestSendSMSCodeResponse | undefined) => {
        const remainingSeconds = data?.smsSessionParameters.nextSendAfterSec;

        this.setState(
          {
            remainingSecondsForSMS: !!remainingSeconds ? remainingSeconds : 0,
          },
          this.handleOpenSMSModal
        );
      })
      .finally(() => {
        this.setState({ isSendSMSRequestInProgress: false });
      });
  };

  /**
   * Обработчик нажатия на кнопку перехода к следующему действию.
   *
   * @prop {ERegistrationFormTab} section Секция
   */
  handleNextButtonClick = (section: ERegistrationFormTab) => () => {
    switch (section) {
      case ERegistrationFormTab.WELCOME: {
        this.handleChangeSelectedTab(
          ERegistrationFormTab.GENERAL_INFORMATION
        )();
        break;
      }
      case ERegistrationFormTab.GENERAL_INFORMATION: {
        this.validateForm(
          ["name"],
          this.handleChangeSelectedTab(ERegistrationFormTab.CONTACTS)
        );
        break;
      }
      case ERegistrationFormTab.CONTACTS: {
        this.validateForm(
          ["email", "phone", "password", "name"],
          this.handleSendSMSCode
        );
        break;
      }
    }
  };

  /**
   * Обработчик открытия модалки об успешном завершении регистрации.
   *
   */
  handleOpenSuccessRegistrationModal = () => {
    this.setState({ isOpenSuccessRegistrationModal: true });
  };

  /**
   * Обработчик закрытия модалки об успешном завершении регистрации.
   *
   */
  handleCloseSuccessRegistrationModal = () => {
    this.setState({ isOpenSuccessRegistrationModal: false }, () => {
      this.props.history.push({
        pathname: "/",
      });
    });
  };

  render() {
    const {
      selectedTab,
      form,
      form: { phone },
      isOpenSMSModal,
      remainingSecondsForSMS,
      isSendSMSRequestInProgress,
      isOpenSuccessRegistrationModal,
    } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <Container maxWidth="lg" className={classes.container}>
          <Box>
            <Typography variant="h4" className={classes.header}>
              Регистрация
            </Typography>
          </Box>
          <Paper square className={classes.registrationForm}>
            <Tabs
              value={selectedTab}
              indicatorColor="primary"
              textColor="primary"
              onChange={this.handleSelectTab}
            >
              <Tab value={ERegistrationFormTab.WELCOME} label="Приветствие" />
              <Tab
                value={ERegistrationFormTab.GENERAL_INFORMATION}
                label="Общая информация"
              />
              <Tab value={ERegistrationFormTab.CONTACTS} label="Контакты" />
            </Tabs>
            <TabPanel
              selectedTab={selectedTab}
              index={ERegistrationFormTab.WELCOME}
            >
              <WelcomeSection
                onNextButtonClick={this.handleNextButtonClick(
                  ERegistrationFormTab.WELCOME
                )}
                classes={classes}
              />
            </TabPanel>
            <TabPanel
              selectedTab={selectedTab}
              index={ERegistrationFormTab.GENERAL_INFORMATION}
            >
              <GeneralInformationSection
                onNextButtonClick={this.handleNextButtonClick(
                  ERegistrationFormTab.GENERAL_INFORMATION
                )}
                onChange={this.handleChangeForm}
                classes={classes}
                form={form}
                isErrorVisible={this.isErrorVisible}
              />
            </TabPanel>
            <TabPanel
              selectedTab={selectedTab}
              index={ERegistrationFormTab.CONTACTS}
            >
              <ContactsSection
                onNextButtonClick={this.handleNextButtonClick(
                  ERegistrationFormTab.CONTACTS
                )}
                onChange={this.handleChangeForm}
                classes={classes}
                form={form}
                isErrorVisible={this.isErrorVisible}
                isActionInProgress={isSendSMSRequestInProgress}
              />
            </TabPanel>
          </Paper>
        </Container>
        {isOpenSMSModal && (
          <SMSModal
            classes={classes}
            isOpen={isOpenSMSModal}
            onClose={this.handleCloseSMSModal}
            remainingSecondsForSMS={remainingSecondsForSMS}
            phone={phone}
            actions={this.actions}
            onOpenSuccessRegistrationModal={
              this.handleOpenSuccessRegistrationModal
            }
          />
        )}
        {isOpenSuccessRegistrationModal && (
          <SuccessRegistrationModal
            classes={classes}
            isOpen={isOpenSuccessRegistrationModal}
            onClose={this.handleCloseSuccessRegistrationModal}
          />
        )}
      </div>
    );
  }
}

const RegistrationFormWithRouter = withRouter(RegistrationForm);

const RegistrationFormWithSnackbar = withSnackbar(RegistrationFormWithRouter);

const RegistrationFormWithStyles = withStyles(styles, {
  withTheme: true,
})(RegistrationFormWithSnackbar);

export default RegistrationFormWithStyles;
