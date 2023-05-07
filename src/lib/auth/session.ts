/**
 * かなりHackyなのでなんとかしたい
 * @link https://github.com/nextauthjs/next-auth/issues/596#issuecomment-943453568
 */
export const reloadSession = () => {
  const event = new Event("visibilitychange");
  document.dispatchEvent(event);
};
