// middleware.ts
export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/settings/:path*",
    "/content/:path*",
    "/calendar/:path*",
    "/chatbot/:path*",
  ],
};
