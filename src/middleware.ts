import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { ROUTE_AUTH, ROUTE_PUBLIC } from "./lib/constants/route";

export async function middleware(req: NextRequest) {
    const sessionToken = await getToken({ req });
    const includesAuth = Object.values(ROUTE_AUTH).includes(
        req.nextUrl.pathname
    );

    if (sessionToken) {
        return NextResponse.redirect(ROUTE_PUBLIC.HOME);
    } else if (
        !sessionToken &&
        !includesAuth &&
        req.nextUrl.pathname !== ROUTE_AUTH.LOGIN
    ) {
        return NextResponse.redirect(new URL(ROUTE_AUTH.LOGIN, req.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico|icons).*)"],
};
