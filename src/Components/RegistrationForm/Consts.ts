import { IRegistrationFormValidationError } from "./Models";

/**
 * Массив текстовок для ошибок валидации на форме регистрации.
 */
export const REGISTRATION_FORM_VALIDATION_ERRORS: IRegistrationFormValidationError = {
  name: "Не указано наименование организации",
  email: "Не указана электронная почта",
  password: "Не указан пароль",
  phone: "Не указан телефон",
};
