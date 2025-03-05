import Image from "next/image";
import LogoFull from "@/assets/images/logo-full.png";
import Barrel from "@/assets/images/barrel.png";
import Background from "@/assets/images/splash-bg.svg";

export default function SplashScreen() {
    return (
        <div className="bg-bg-dark-main overflow-hidden relative">
            <div className="relative z-20 flex-start flex-col h-full">
                <div className="h-5 mt-[8.6vh]">
                    <Image alt="Logo" src={LogoFull} width={LogoFull.width} height={LogoFull.height} className="img-basic" />
                </div>
                <div className="pb-[3.7vh] my-auto text-center">
                    <div className="text-typo-dark-primary ff-decor text-7xl opacity-30">for</div>
                    <div className="text-typo-dark-primary ff-decor text-[7.5rem] leading-none text-mask">Investment</div>
                </div>
                <div className="w-full max-w-[37.625rem]">
                    <Image alt="Barrel" src={Barrel} width={Barrel.width} height={Barrel.height} className="img-basic" priority />
                </div>
            </div>
            <div className="absolute inset-0 z-10">
                <Image alt="Background" src={Background} fill style={{objectFit: "cover"}} className="img-basic" unoptimized={true}/>
            </div>
        </div>
    )
}