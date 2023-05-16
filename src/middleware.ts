export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/profile", "/manager", "/ticket", "/groups"],
};
