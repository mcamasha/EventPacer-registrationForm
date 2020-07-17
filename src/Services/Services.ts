import axios, { AxiosPromise } from "axios";
import { IRequestSendSMSCodeResponse, IRegistrationResponse } from "../Models";
import { IS_REST_ACTIVE, REST_URL } from "../Consts/ServicesConsts";
import sendRequestToGetSMSCode from "../assets/mocks/sendRequestToGetSMSCode.json";
import registrationSuccess from "../assets/mocks/registration_success.json";

/**
 * Модель сервисов.
 */
export interface IServices {
  /**
   * Рест отправки запроса на получение SMS-кода на заданный номер телефона.
   */
  sendRequestToGetSMSCode: (
    phone: string
  ) => AxiosPromise<IRequestSendSMSCodeResponse>;

  /**
   * Рест для регистрации юзера.
   */
  registrationUser: (
    phone: string,
    code: string
  ) => AxiosPromise<IRegistrationResponse>;
}

/**
 * Сервисы приложения.
 */
export class Services implements IServices {
  /**
   * @inheritdoc
   */
  sendRequestToGetSMSCode(
    phone: string
  ): AxiosPromise<IRequestSendSMSCodeResponse> {
    return IS_REST_ACTIVE
      ? axios.post(`${REST_URL}/auth/requestCode?phone=${phone}`)
      : Promise.resolve(sendRequestToGetSMSCode);
  }

  /**
   * @inheritdoc
   */
  registrationUser(
    phone: string,
    code?: string
  ): AxiosPromise<IRegistrationResponse> {
    return IS_REST_ACTIVE
      ? axios.post(`${REST_URL}/auth/login?phone=${phone}&code=${code}`)
      : Promise.reject(registrationSuccess);
  }
}
