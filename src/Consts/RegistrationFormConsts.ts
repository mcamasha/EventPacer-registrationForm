import { TRegistrationRequestRequiredFields } from "../Models";

/**
 * Массив набора полей регистрационной формы, которые являются обязательными для заполнения.
 */
export const REGISTRATION_FORM_REQUIRED_FIELDS: (keyof TRegistrationRequestRequiredFields)[] = [
  "name",
  "email",
  "phone",
  "password",
];
