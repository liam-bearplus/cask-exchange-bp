import Image from "next/image";
import SignupSuccessIcon from "@/assets/images/signup-success.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ResendSuccess() {
    return (
        <div className="flex-center flex-col space-y-8">
            <div className="h-20 w-20">
                <Image
                    alt="Signup success"
                    src={SignupSuccessIcon}
                    width={SignupSuccessIcon.width}
                    height={SignupSuccessIcon.height}
                    className="img-basic"
                />
            </div>
            <div className="text-center">
                <div className="mb-2 text-2xl font-semibold text-typo-primary">
                    Welcome back!
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
