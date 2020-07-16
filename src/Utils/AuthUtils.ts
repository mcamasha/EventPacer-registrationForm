export function hasUserAuth(): boolean {
  return !!localStorage.getItem("accessToken");
}
