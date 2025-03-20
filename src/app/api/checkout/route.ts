import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
export async function POST(request: NextRequest) {
    try {
        // you can implement some basic check here like, is user valid or not
        const data = await request.json();
        const priceId = data.priceId;
        const checkoutSession: Stripe.Checkout.Session =
            await stripe.checkout.sessions.create({
                payment_method_types: ["us_bank_account"],

                line_items: [
                    {
                        price_data: {
                            currency: "usd",
                            product_data: {
                                name: "Cask",
                            },
                            unit_amount: 2000,
                        },
                        quantity: 1,
                    },
                ],
                mode: "payment",
                success_url: `${process.env.NEXTAUTH_URL}/billing`,
                cancel_url: `${process.env.NEXTAUTH_URL}/billing`,
                metadata: {
                    userId: 2,
                    priceId,
                },
            });
        return NextResponse.json({ result: checkoutSession, ok: true });
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server", { status: 500 });
    }
}
