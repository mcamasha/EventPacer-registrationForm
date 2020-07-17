import {
  IRegistrationRequest,
  TRegistrationRequestRequiredFields,
} from "../../Models";

/**
 * Модель ошибок формы регистрации.
 *
 * @prop {string} key Наименование поля.
 */
export interface IRegistrationFormValidationError {
  [key: string]: string;
}

/**
 * Модель свойств для секций.
 *
 * @prop {Function} onNextButtonClick Обработчик нажатия на кнопку "Далее".
 * @prop {Function} onChange Обработчик изменения значения поля.
 * @prop {IRegistrationRequest} form Форма.
 * @prop {Function} isErrorVisible Проверка отображать ли ошибку для заданного поля.
 * @prop {boolean} [isActionInProgress] Флаг, отображающий что действие в прогрессе.
 */
export interface ISectionProps {
  onNextButtonClick: () => void;
  onChange: (partial: Partial<IRegistrationRequest>) => void;
  form: IRegistrationRequest;
  isErrorVisible: (
    fieldName: keyof TRegistrationRequestRequiredFields
  ) => boolean;
  isActionInProgress?: boolean;
}
