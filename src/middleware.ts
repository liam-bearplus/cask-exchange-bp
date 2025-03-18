import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { ROUTE_AUTH } from "./lib/constants/route";

export default withAuth({
    pages: {
        signIn: "/sign-in",
    },
});
export async function middleware(req: NextRequest) {
    const sessionToken = req.cookies.get("next-auth.session-token");
    if (sessionToken && req.nextUrl.pathname === ROUTE_AUTH.LOGIN) {
        const referer = req.headers.get("referer") || "/";
        return NextResponse.redirect(new URL(referer, req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
