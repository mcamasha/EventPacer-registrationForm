/**
 * Возвращает телефон, отформатированный для отправки на сервер.
 * Заменяет "+" на URL-код "%2b"
 *
 * @param {string} phone
 */
export function getPhoneForServer(phone: string) {
  return phone.replace("+", "%2b");
}
