"use client";

import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";

const NotFoundPage = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <Image
                alt={`${APP_NAME} logo`}
                src="/images/logo.svg"
                height={48}
                width={48}
                priority
            />
            <div className="w-1/3 rounded-lg p-6 text-center shadow-md">
                <h1 className="mb-4 text-3xl font-bold">Not found</h1>
                <p className="text-destructive">
                    Sorry, the page you are looking for does not exist.
                </p>
                <Button
                    variant={"outline"}
                    className="ml-2 mt-4"
                    onClick={() => {
                        window.location.href = "/";
                    }}
                >
                    Back To Home
                </Button>
            </div>
        </div>
    );
};

export default NotFoundPage;
