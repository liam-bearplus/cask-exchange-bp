import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";
import speakeasy from "speakeasy";

export async function GET(req: NextRequest, res: NextResponse) {
    const secret = speakeasy.generateSecret({
        name: "You can give your app name here",
    });
    console.log("secret_______________", secret);
    const data = await QRCode.toDataURL(secret.otpauth_url!);
    return Response.json({
        data,
        secret: secret.base32,
    });
}
