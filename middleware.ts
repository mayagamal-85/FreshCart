export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/cart",
    "/wishlist",
    "/checkout/:path*",
    "/orders",
    "/profile/:path*",
  ],
};