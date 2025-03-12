import { NextRequest, NextResponse } from "next/server";
import speakeasy from "speakeasy";

import { OptionNextAuth } from "@/config/auth";
import { getServerSession } from "next-auth/next";

export async function POST(req: NextRequest, res: NextResponse) {
    const { secret, token } = await req.json();

    const session = await getServerSession(OptionNextAuth);
    const tokenString = token.toString();

    if (!session) {
        // let decrypted_secret = await decrypt(secret); // Have a function to decrypt your secret key
        const verified = speakeasy.totp.verify({
            secret: process.env.NEXTAUTH_SECRET!, // Secret Key
            encoding: "base32",
            token: `${token}`, // OTP Code
        });

        return Response.json({ verified });
    } else {
        // 2. Enabling 2FA for the first time
        const verified = speakeasy.totp.verify({
            secret: secret, // Secret Key
            encoding: "base32",
            token: tokenString, // OTP Code
        });
        console.log("verified_____", verified);
        if (verified) {
            // save the secret in your database
            // Don't forget to encrypt it
        }

        return Response.json({ verified });
    }
}
