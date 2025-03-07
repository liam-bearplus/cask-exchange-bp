import Image from "next/image";
import LogoFull from "@/assets/images/logo-full.png";
import Barrel from "@/assets/images/barrel.png";
import Background from "@/assets/images/splash-bg.svg";

export default function SplashScreen() {
    return (
        <div className="overflow-hidden bg-bg-dark-main h-screen sticky top-0">
            <div className="flex-start relative z-20 h-full flex-col">
                <div className="mt-[8.6vh] h-5">
                    <Image
                        alt="Logo"
                        src={LogoFull}
                        width={LogoFull.width}
                        height={LogoFull.height}
                        className="img-basic"
                    />
                </div>
                <div className="my-auto pb-[3.7vh] text-center">
                    <div className="ff-decor text-7xl text-typo-dark-primary opacity-30">
                        for
                    </div>
                    <div className="ff-decor text-mask text-[7.5rem] leading-none text-typo-dark-primary">
                        Investment
                    </div>
                </div>
                <div className="w-full max-w-[37.625rem]">
                    <Image
                        alt="Barrel"
                        src={Barrel}
                        width={Barrel.width}
                        height={Barrel.height}
                        className="img-basic"
                        priority
                    />
                </div>
            </div>
            <div className="absolute inset-0 z-10">
                <Image
                    alt="Background"
                    src={Background}
                    fill
                    style={{ objectFit: "cover" }}
                    className="img-basic"
                    unoptimized={true}
                />
            </div>
        </div>
    );
}
