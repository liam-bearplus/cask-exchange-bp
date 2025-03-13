import XIcon from "@/assets/images/x-icon.svg";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import ImagePlaceholder from "../image-placeholder";
export default function CredentialsHead({
    title = "Page Title",
    desc,
    breadcrumb,
    isLoading,
}: {
    title: string;
    desc?: string;
    breadcrumb?: boolean;
    isLoading?: boolean;
}) {
    return (
        <div className="flex-center flex-col pb-8 text-center">
            {breadcrumb ? (
                <Link href="/sign-in">
                    <Button variant="ghost" className="mb-8 min-w-0" size="sm">
                        <ChevronLeft className="h-4 w-4" />
                        Back
                    </Button>
                </Link>
            ) : (
                <div className="max-w-[15rem] pb-6">
                    <ImagePlaceholder
                        src={XIcon}
                        alt="X Icon"
                        width={XIcon.width}
                        height={XIcon.height}
                        className="h-[6rem] w-[6rem]"
                    />
                </div>
            )}
            <h1 className="inline-flex text-2xl font-semibold text-typo-primary">
                {title}
                {isLoading && (
                    <div className="flex-center ml-4 mt-2 gap-2">
                        <div className="h-[0.4rem] w-[0.4rem] flex-shrink-0 animate-bounce rounded-full bg-typo-primary"></div>
                        <div className="h-[0.4rem] w-[0.4rem] flex-shrink-0 animate-bounce rounded-full bg-typo-primary delay-100"></div>
                        <div className="h-[0.4rem] w-[0.4rem] flex-shrink-0 animate-bounce rounded-full bg-typo-primary delay-200"></div>
                    </div>
                )}
            </h1>
            {desc && <p className="mt-2 text-sm text-typo-body">{desc}</p>}
        </div>
    );
}
