import { JWT } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// export default withAuth(function middleware(req: NextRequest) {
//   const requestHeaders = new Headers(req.headers);
//   requestHeaders.set("Authorization", `Bearer 1111111`);
//   return NextResponse.next({
//     request: {
//       headers: requestHeaders,
//     },
//   });
// });

export { default } from "next-auth/middleware";
export const config = {
  matcher: ["/profile", "/manager", "/ticket", "/groups", "/api"],
};
