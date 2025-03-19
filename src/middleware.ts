import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { ROUTE_AUTH } from "./lib/constants/route";
import { PATH_AUTH } from "./lib/constants/path";

export default withAuth({
    pages: {
        signIn: ROUTE_AUTH.LOGIN,
    },
});
export async function middleware(req: NextRequest) {
    const sessionToken = req.cookies.get("next-auth.session-token");
    const includesAuth = Object.values(ROUTE_AUTH).includes(
        req.nextUrl.pathname
    );

    if (sessionToken && req.nextUrl.pathname === ROUTE_AUTH.LOGIN) {
        const referer = req.headers.get("referer") || "/";
        return NextResponse.redirect(new URL(referer, req.url));
    } else if (!sessionToken && !includesAuth) {
        return NextResponse.redirect(new URL(ROUTE_AUTH.LOGIN, req.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico|icons).*)"],
};
