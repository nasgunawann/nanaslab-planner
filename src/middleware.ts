// src/middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // arahkan user belum login ke /login
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/settings/:path*",
    "/content/:path*",
    "/calendar/:path*",
    "/chatbot/:path*",
    "/uploads/:path*",
  ],
};
