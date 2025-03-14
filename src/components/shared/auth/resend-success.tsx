import { Button } from "@/components/ui/button";
import Link from "next/link";
import ImagePlaceholder from "../image-placeholder";

export default function ResendSuccess() {
    return (
        <div className="flex-center flex-col space-y-8">
            <div className="h-20 w-20">
                <ImagePlaceholder
                    alt="Signup success"
                    src={"/icons/signup-success.svg"}
                    width={80}
                    height={80}
                    className="img-basic"
                />
            </div>
            <div className="text-center">
                <div className="mb-2 text-2xl font-semibold text-typo-primary">
                    Verification Email Sent
                </div>
                <div className="text-base text-typo-body">
                    We have sent you a new verification email. Please check your
                    inbox and follow the instructions to verify your account.
                </div>
            </div>
            <Link href="/sign-in" className="w-full">
                <Button variant="default" className="w-full">
                    Back
                </Button>
            </Link>
        </div>
    );
}
