import { TRegistrationRequestRequiredFields } from "../Models";

export const REGISTRATION_FORM_REQUIRED_FIELDS: (keyof TRegistrationRequestRequiredFields)[] = [
  "name",
  "email",
  "phone"
];
