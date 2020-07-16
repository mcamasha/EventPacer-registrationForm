import axios, { AxiosPromise } from "axios";
import { IRequestSendSMSCodeResponse, IRegistrationResponse } from "../Models";
import { IS_REST_ACTIVE, REST_URL } from "../Consts/ServicesConsts";
import sendRequestToGetSMSCode from "../assets/mocks/sendRequestToGetSMSCode.json";
import registrationSuccess from "../assets/mocks/registration_success.json";

export interface IServices {
  sendRequestToGetSMSCode: (
    phone: string
  ) => AxiosPromise<IRequestSendSMSCodeResponse>;

  registrationUser: (
    phone: string,
    code: string
  ) => AxiosPromise<IRegistrationResponse>;
}

export class Services implements IServices {
  sendRequestToGetSMSCode(
    phone: string
  ): AxiosPromise<IRequestSendSMSCodeResponse> {
    return IS_REST_ACTIVE
      ? axios.post(`${REST_URL}/auth/requestCode?phone=${phone}`)
      : Promise.resolve(sendRequestToGetSMSCode);
  }

  registrationUser(
    phone: string,
    code?: string
  ): AxiosPromise<IRegistrationResponse> {
    return IS_REST_ACTIVE
      ? axios.post(`${REST_URL}/auth/login?phone=${phone}&code=${code}`)
      : Promise.reject(registrationSuccess);
  }
}
