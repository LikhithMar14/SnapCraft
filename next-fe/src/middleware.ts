import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export default auth((req) => {
    const isLoginPage = req.nextUrl.pathname.startsWith("/login");
    const isAuthUser = !!req.auth;

    if (isLoginPage) {
        if (isAuthUser) {
            return NextResponse.redirect(new URL("/", req.url));
        }
        return;
    }

    if (!isAuthUser) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return;
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
