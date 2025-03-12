import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";
import speakeasy from "speakeasy";

export async function GET(req: NextRequest, res: NextResponse) {
    const secret = speakeasy.generateSecret({
        name: "CaskExchange",
        length: 10,
        issuer: "CaskExchange",
    });
    const data = await QRCode.toDataURL(secret.otpauth_url!);

    return Response.json({
        data,
        secret: secret.base32,
    });
}
