import { cookies, headers } from "next/headers";
import { getServerSession as originalGetServerSession } from "next-auth";
import { authOptions } from "~/app/api/auth/[...nextauth]/route";

/**
 * かなりHackyなのでなんとかしたい
 * @link https://github.com/nextauthjs/next-auth/issues/596#issuecomment-943453568
 */
export const reloadSession = () => {
  const event = new Event("visibilitychange");
  document.dispatchEvent(event);
};

export const getServerSession = async () => {
  const req = {
    headers: Object.fromEntries(headers() as Headers),
    cookies: Object.fromEntries(
      cookies()
        .getAll()
        .map((c) => [c.name, c.value])
    ),
  };
  const res = { getHeader() {}, setCookie() {}, setHeader() {} };

  // @ts-ignore - The type used in next-auth for the req object doesn't match, but it still works
  const session = await originalGetServerSession(req, res, authOptions);
  if (!session?.user.userInfoId) {
    throw new Error("Session not found");
  }
  return session;
};
