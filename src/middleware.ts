import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth({
    pages: {
        signIn: "/login",
    },
});
export async function middleware(req: any) {
    const sessionToken = req.cookies.get("next-auth.session-token");
    console.log("sessionToken_________", sessionToken);
    if (sessionToken && req.nextUrl.pathname === "/login") {
        const referer = req.headers.get("referer") || "/";
        return NextResponse.redirect(new URL(referer, req.url));
    }

    return NextResponse.next();
}
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
