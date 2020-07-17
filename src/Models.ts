import { ERequestToGetSMSCodeResult } from "./Enums";

/**
 * Модель формы регистрации аккаунта.
 *
 * @prop {string} email Электронная почта.
 * @prop {string} phone Телефон.
 * @prop {string} [site] Web-сайт организации.
 * @prop {string} [facebook] Facebook-страница организации/пользователя.
 * @prop {string} [telegram] Телеграмм.
 * @prop {string} name Наименование организации.
 * @prop {File} [logo] Логотип.
 * @prop {string} [description] Описание организации.
 * @prop {string} password Пароль.
 */
export interface IRegistrationRequest {
  email: string;
  phone: string;
  site?: string;
  facebook?: string;
  telegram?: string;
  name: string;
  logo?: File;
  description?: string;
  password: string;
}

/**
 * Набор полей формы регистрации, необходимые для обязательного заполнения.
 */
export type TRegistrationRequestRequiredFields = Pick<
  IRegistrationRequest,
  "email" | "phone" | "name" | "password"
>;

/**
 * Ответ от сервиса запроса отправки SMS-кода.
 *
 * @prop {string} result Результат выполнения.
 * @prop {ISMSSessionParameters} smsSessionParameters Параметры сессии SMS-кода.
 * @prop {string} traceId ID для дебагга сервиса.
 */
export interface IRequestSendSMSCodeResponse {
  result: string;
  smsSessionParameters: ISMSSessionParameters;
  traceId: string;
}

/**
 * Модель параметров сессии СМС-кода.
 *
 * @prop {number} remainCheckCount Оставшееся количество попыток проверки SMS-кода.
 * @prop {number} codeExpiresAfterSec Количество секунд, через которое SMS-код станет недействительным.
 * @prop {number} nextSendAfterSec Количество секунд до следующей возможности отправки SMS-кода.
 */
interface ISMSSessionParameters {
  remainCheckCount: number;
  codeExpiresAfterSec: number;
  nextSendAfterSec: number;
}

/**
 * Ответ от сервиса регистрации аккаунта.
 *
 * @prop {boolean} newUserCreated Признак создания нового юзера.
 * @prop {ITokens} tokens Токены.
 */
export interface IRegistrationResponse {
  newUserCreated: boolean;
  tokens: ITokens;
}

/**
 * Модель токенов.
 *
 * @prop {string} accessToken Токен доступности функционала.
 * @prop {string} refreshToken Токен для обновления токена доступа.
 */
interface ITokens {
  accessToken: string;
  refreshToken: string;
}
