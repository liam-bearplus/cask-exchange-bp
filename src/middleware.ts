import { NextRequest, NextResponse } from "next/server";
import { ROUTE_AUTH, ROUTE_PUBLIC } from "./lib/constants/route";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    const sessionToken = await getToken({ req });
    const isLoginPage = req.nextUrl.pathname === ROUTE_AUTH.LOGIN;
    if (sessionToken && isLoginPage) {
        return NextResponse.redirect(new URL(ROUTE_PUBLIC.HOME, req.url));
    } else if (!sessionToken && !isLoginPage) {
        return NextResponse.redirect(new URL(ROUTE_AUTH.LOGIN, req.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico|icons).*)"],
};
