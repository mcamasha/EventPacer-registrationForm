import { IRequestSendSMSCodeResponse, IRegistrationResponse } from "../Models";
import { IServices } from "../Services/Services";
import { anchorOrigin } from "../Consts/NotificationConsts";
import { ERequestToGetSMSCodeResult, ERegistrationUserResult } from "../Enums";
import { BrowserHistory } from "history";

/**
 * Интерфейс для экшенов.
 */
export interface IActions {
  /**
   * Отправить запрос на получение SMS-кода на мобильный телефон.
   *
   * @param {string} phone Телефон.
   */
  sendRequestToGetSMSCode: (
    phone: string
  ) => Promise<IRequestSendSMSCodeResponse | undefined>;

  /**
   * Регистрация пользователя.
   *
   * @param {string} phone Телефон.
   * @param {string} code SMS-код введёный юзером.
   */
  registrationUser: (
    phone: string,
    code: string
  ) => Promise<IRegistrationResponse>;

  /**
   * Выйти из приложения.
   */
  exit: () => void;
}

export class Actions implements IActions {
  constructor(
    private service: IServices,
    private enqueueSnackbar: Function,
    private history: BrowserHistory
  ) {}

  /**
   * @inheritdoc
   */
  async sendRequestToGetSMSCode(
    phone: string
  ): Promise<IRequestSendSMSCodeResponse | undefined> {
    try {
      const response = await this.service.sendRequestToGetSMSCode(phone);
      const data: IRequestSendSMSCodeResponse = response?.data;

      switch (data?.result) {
        case ERequestToGetSMSCodeResult.OK: {
          this.enqueueSnackbar("СМС код был отправлен на указанный телефон.", {
            anchorOrigin,
            variant: "success",
          });

          return Promise.resolve(data);
        }
        case ERequestToGetSMSCodeResult.INVALID_PHONE_NUMBER: {
          this.enqueueSnackbar("Указан неверный номер телефона.", {
            anchorOrigin,
            variant: "error",
          });

          return Promise.reject();
        }
        case ERequestToGetSMSCodeResult.WAIT_BEFORE_SEND: {
          const remainingSeconds: number =
            data.smsSessionParameters.nextSendAfterSec;

          const minutes = Math.floor(remainingSeconds / 60);
          const seconds = remainingSeconds % 60;

          this.enqueueSnackbar(
            `Повторная отправка СМС-кода доступна через ${
              !!minutes ? `${minutes} минут и` : ""
            } ${seconds} секунд`,
            {
              anchorOrigin,
              variant: "warning",
            }
          );

          return Promise.reject();
        }
        default: {
          this.enqueueSnackbar("Произошла неизвестная ошибка", {
            anchorOrigin,
            variant: "error",
          });

          return Promise.reject();
        }
      }
    } catch (error) {
      const errorMessage: string = error?.response?.data;

      if (errorMessage) {
        this.enqueueSnackbar(errorMessage, { anchorOrigin, variant: "error" });
      }
    }
  }

  /**
   * @inheritdoc
   */
  async registrationUser(
    phone: string,
    code: string
  ): Promise<IRegistrationResponse> {
    try {
      const response = await this.service.registrationUser(phone, code);

      localStorage.setItem("accessToken", response.data.tokens.accessToken);
      localStorage.setItem("refreshToken", response.data.tokens.refreshToken);

      return Promise.resolve(response.data);
    } catch (error) {
      const data = error?.response?.data;

      switch (data?.result) {
        case ERegistrationUserResult.NEW_CODE_REQUIRED: {
          this.enqueueSnackbar(
            "Введёный SMS-код более неактивен. Необходимо запросить новый.",
            {
              anchorOrigin,
              variant: "error",
            }
          );
          break;
        }
        case ERegistrationUserResult.INVALID_CODE: {
          this.enqueueSnackbar("Введённый SMS-код неверен.", {
            anchorOrigin,
            variant: "error",
          });
          break;
        }
        default: {
          this.enqueueSnackbar("Произошла неизвестная ошибка", {
            anchorOrigin,
            variant: "error",
          });
        }
      }

      return Promise.reject();
    }
  }

  /**
   * @inheritdoc
   */
  exit() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    this.history.push("/");
  }
}
