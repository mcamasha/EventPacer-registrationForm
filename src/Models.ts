export interface IRegistrationRequest {
  email?: string;
  phone?: string;
  site?: string;
  facebook?: string;
  telegram?: string;
  name?: string;
  logo?: File;
  description?: string;
}

export type TRegistrationRequestRequiredFields = Pick<
  IRegistrationRequest,
  "email" | "phone" | "name"
>;
