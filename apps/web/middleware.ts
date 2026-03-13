import { authMiddleware } from "@monocloud/auth-nextjs";

export default authMiddleware({
  protectedRoutes: (req) => {
    return !req.nextUrl.pathname || req.nextUrl.pathname !== "/";
  },
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
