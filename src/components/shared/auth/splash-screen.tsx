import { ROUTE_PUBLIC } from "@/lib/constants/route";
import Link from "next/link";
import ImagePlaceholder from "../image-placeholder";

export default function SplashScreen() {
    return (
        <div className="sticky top-0 h-screen overflow-hidden bg-bg-dark-main">
            <div className="flex-start relative z-20 h-full flex-col">
                <Link href={ROUTE_PUBLIC.HOME}>
                    <div className="mt-[8.6vh] h-5 w-[13.875rem]">
                        <ImagePlaceholder
                            alt="Logo"
                            src={"/images/logo-full.png"}
                            width={440}
                            height={40}
                        />
                    </div>
                </Link>
                <div className="my-auto pb-[3.7vh] text-center">
                    <div className="ff-decor text-7xl text-typo-dark-primary opacity-30">
                        for
                    </div>
                    <div className="ff-decor text-mask text-[7.5rem] leading-none text-typo-dark-primary">
                        Investment
                    </div>
                </div>
                <div className="w-full max-w-[37.625rem]">
                    <ImagePlaceholder
                        alt="Barrel"
                        src={"/images/barrel.png"}
                        width={600}
                        height={327}
                        className="aspect-[600/327]"
                    />
                </div>
            </div>
            <div className="absolute inset-0 z-10">
                <ImagePlaceholder
                    alt="Background"
                    src={"/images/splash-bg.svg"}
                    style={{ objectFit: "cover" }}
                    className="absolute inset-0 z-10"
                    imgClassName="h-full"
                    width={864}
                    height={1080}
                    unoptimized={true}
                />
            </div>
        </div>
    );
}
