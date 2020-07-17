/**
 * Функция проверки залогинен ли юзер (через проверку наличия токена в localStorage).
 */
export function hasUserAuth(): boolean {
  return !!localStorage.getItem("accessToken");
}
