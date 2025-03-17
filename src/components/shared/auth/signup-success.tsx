import { Button } from "@/components/ui/button";
import Link from "next/link";
import ImagePlaceholder from "../image-placeholder";

export default function SignupSuccess({ name }: { name: string }) {
    return (
        <div className="flex-center flex-col space-y-8">
            <div className="h-20 w-20">
                <ImagePlaceholder
                    alt="Signup success"
                    src={"/icons/signup-success.svg"}
                    width={80}
                    height={80}
                />
            </div>
            <div className="text-center">
                <div className="mb-2 text-2xl font-semibold text-typo-primary">
                    Welcome aboard, <span className="capitalize">{name}</span>!
                </div>
                <div className="text-base text-typo-body">
                    To activate your account and start exploring CaskExchange
                    Platform, please verify your account by clicking the link we
                    just sent to your email address.
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
