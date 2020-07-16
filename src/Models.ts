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

export type TRegistrationRequestRequiredFields = Pick<
  IRegistrationRequest,
  "email" | "phone" | "name" | "password"
>;

export interface IRequestSendSMSCodeResponse {
  result: string;
  smsSessionParameters: ISMSSessionParameters;
  traceId: string;
}

interface ISMSSessionParameters {
  remainCheckCount: number;
  codeExpiresAfterSec: number;
  nextSendAfterSec: number;
}

export interface IRegistrationResponse {
  newUserCreated: boolean;
  tokens: ITokens;
}

interface ITokens {
  accessToken: string;
  refreshToken: string;
}
