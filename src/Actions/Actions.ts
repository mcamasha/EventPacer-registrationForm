import { IRequestSendSMSCodeResponse, IRegistrationResponse } from "../Models";
import { IServices } from "../Services/Services";

export interface IActions {
  sendRequestToGetSMSCode: (
    phone?: string
  ) => Promise<IRequestSendSMSCodeResponse>;

  registrationUser: (
    phone?: string,
    code?: string
  ) => Promise<IRegistrationResponse>;
}

export class Actions implements IActions {
  constructor(private service: IServices) {}

  async sendRequestToGetSMSCode(phone?: string): Promise<any> {
    try {
      const response = await this.service.sendRequestToGetSMSCode(phone);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async registrationUser(
    phone?: string,
    code?: string
  ): Promise<IRegistrationResponse> {
    try {
      const response = await this.service.registrationUser(phone, code);
      return Promise.resolve(response);
    } catch (error) {
      console.log(error);
    }
  }
}
