import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { ROUTE_AUTH } from "./lib/constants/route";

export async function middleware(req: NextRequest) {
    const sessionToken = await getToken({ req });

    if (sessionToken && req.nextUrl.pathname === ROUTE_AUTH.LOGIN) {
        const referer = req.headers.get("referer") || "/";
        return NextResponse.redirect(new URL(referer, req.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico|icons).*)"],
};
