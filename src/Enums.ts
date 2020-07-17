/**
 * Перечисление всех возможных статусов результата вызова сервиса запроса получения SMS-кода.
 *
 * INVALID_PHONE_NUMBER - Невалидный номер телефона.
 * OK - Успех.
 * WAIT_BEFORE_SEND - Необходимо подождать N-ое количество секунд.
 */
export enum ERequestToGetSMSCodeResult {
  INVALID_PHONE_NUMBER = "InvalidPhoneNumber",
  OK = "Ok",
  WAIT_BEFORE_SEND = "WaitBeforeSend",
}

/**
 * Перечисление ошибок при вызове сервиса регистрации юзера.
 *
 * NEW_CODE_REQUIRED - Необходимо сгенерировать новый SMS-код.
 * INVALID_CODE - Не валидный SMS-код.
 */
export enum ERegistrationUserResult {
  NEW_CODE_REQUIRED = "NewCodeRequired",
  INVALID_CODE = "InvalidCode",
}
