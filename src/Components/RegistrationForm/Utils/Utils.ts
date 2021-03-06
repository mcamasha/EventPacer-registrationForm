/**
 * Возвращает телефон, отформатированный для отправки на сервер.
 * Заменяет "+" на URL-код "%2b"
 *
 * @param {string} phone Телефон.
 */
export function getPhoneForServer(phone: string) {
  return phone.replace("+", "%2b");
}

/**
 * Функция валидации Email.
 *
 * @param {string} email Электронная почта.
 */
export function validateEmail(email: string): boolean {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
