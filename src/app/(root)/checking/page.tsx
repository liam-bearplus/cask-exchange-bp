"use client";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
const SubscribeComponent = () => {
    const handleSubmit = async () => {
        const stripe = await loadStripe(
            process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
        );
        if (!stripe) {
            return;
        }
        try {
            const response = await axios.post("/api/checkout", {
                priceId: 1,
            });
            const data = response.data;
            if (!data.ok) throw new Error("Something went wrong");
            await stripe.redirectToCheckout({
                sessionId: data.result.id,
            });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            Click Below button to get {2222}
            <button onClick={handleSubmit}>Upgrade in {20}</button>
        </div>
    );
};
export default SubscribeComponent;
