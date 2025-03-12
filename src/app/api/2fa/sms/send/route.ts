import { Auth } from "@vonage/auth";
import { Vonage } from "@vonage/server-sdk";
import { NextRequest, NextResponse } from "next/server";
import speakeasy from "speakeasy";
export async function POST(req: NextRequest, res: NextResponse) {
    const { number } = await req.json();
    console.log("number", number);
    const secret = speakeasy.generateSecret({
        name: "CaskExchange",
        length: 10,
    });
    const otp = speakeasy.totp({
        secret: secret.base32,
        encoding: "base32",
        digits: 6,
    });
    const data = await sendSMS(number, otp, "");
    console.log("data", data);
    Response.json({ message: "Mã OTP đã được gửi.", secret });
}
