export enum ERequestToGetSMSCodeResult {
  INVALID_PHONE_NUMBER = "InvalidPhoneNumber",
  OK = "Ok",
  WAIT_BEFORE_SEND = "WaitBeforeSend",
}

export enum ERegistrationUserResult {
  NEW_CODE_REQUIRED = "NewCodeRequired",
  INVALID_CODE = "InvalidCode",
}
