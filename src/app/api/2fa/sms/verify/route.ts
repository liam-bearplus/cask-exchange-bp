import { NextRequest, NextResponse } from "next/server";
import speakeasy from "speakeasy";

export async function POST(req: NextRequest, res: NextResponse) {
    const { secret, otp } = await req.json();
    const verified = speakeasy.totp.verify({
        secret: secret.base32,
        encoding: "base32",
        token: otp,
        window: 1,
    });

    if (verified) return Response.json({ message: "Xac Thuc Thanh Cong" });

    return Response.json({ message: "Xac Thuc That Bai" });
}
