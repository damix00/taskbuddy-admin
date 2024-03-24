import authConfig from "@/lib/auth/config";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

const loggedOutRoutes = ["/"];

const disableCache = ["/dashboard/users", "/dashboard/users/:uuid/sessions/*"];

export default auth((req) => {
    const loggedIn = !!req.auth;

    if (loggedIn && loggedOutRoutes.includes(req.nextUrl.pathname)) {
        return Response.redirect(new URL("/dashboard", req.nextUrl));
    } else if (!loggedIn && !loggedOutRoutes.includes(req.nextUrl.pathname)) {
        return Response.redirect(new URL("/", req.nextUrl));
    }

    if (disableCache.some((route) => req.nextUrl.pathname.match(route))) {
        req.headers.set("x-middleware-cache", "no-cache");
    }
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
