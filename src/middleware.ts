import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname, origin } = req.nextUrl;
    const isAuth = !!req.nextauth.token;

    if (!isAuth && pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(
        new URL("/login?error=unauthorized", origin)
      );
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*"],
};
