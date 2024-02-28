import authConfig from "@/lib/auth/config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

const loggedOutRoutes = ["/"];

export default auth((req) => {
    const loggedIn = !!req.auth;

    if (loggedIn && loggedOutRoutes.includes(req.nextUrl.pathname)) {
        return Response.redirect(new URL("/dashboard", req.nextUrl));
    } else if (!loggedIn && !loggedOutRoutes.includes(req.nextUrl.pathname)) {
        return Response.redirect(new URL("/", req.nextUrl));
    }
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
