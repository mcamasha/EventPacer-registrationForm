import axios from "axios";
import { IRequestSendSMSCodeResponse, IRegistrationResponse } from "../Models";

export interface IServices {
  sendRequestToGetSMSCode: (
    phone?: string
  ) => Promise<IRequestSendSMSCodeResponse>;

  registrationUser: (
    phone?: string,
    code?: string
  ) => Promise<IRegistrationResponse>;
}

export class Services implements IServices {
  sendRequestToGetSMSCode(
    phone?: string
  ): Promise<IRequestSendSMSCodeResponse> {
    return axios.post(
      `https://eventpacerstage.azurewebsites.net/api/auth/requestCode?phone=${phone}`
    );
  }

  registrationUser(
    phone?: string,
    code?: string
  ): Promise<IRegistrationResponse> {
    return axios.post(
      "https://eventpacerstage.azurewebsites.net/api/auth/login",
      {
        phone,
        code
      }
    );
  }
}
