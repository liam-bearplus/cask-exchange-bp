import { APP_NAME } from "@/lib/constants";
import ImagePlaceholder from "@/components/shared/image-placeholder";
import { Button } from "@/components/ui/button";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="bg-bg-dark-main">
            <div className="container grid grid-cols-12 pt-20">
                <div className="col-start-2 col-end-3">
                    <ImagePlaceholder
                        src="/images/logo-full.png"
                        width={354}
                        height={32}
                        alt="footer logo"
                        className="h-4 w-[11.0625rem]"
                    />
                </div>
                <div className="col-start-8 col-end-11">
                    <div className="mb-5 text-sm text-typo-dark-sub">
                        Investing in whiskey casks involves risks, including
                        market fluctuations, regulatory changes, evaporation
                        loss, and limited resale options. CaskExchange makes no
                        guarantees on future profits and is not obligated to
                        update forward-looking statements.
                    </div>
                    <div className="flex flex-row gap-3">
                        <ImagePlaceholder
                            src="/icons/icon_g.png"
                            className="h-6"
                            imgClassName="img img-h w-auto"
                            alt="img"
                            width={100}
                            height={100}
                        />
                        <ImagePlaceholder
                            src="/icons/icon_gaming.png"
                            className="h-6"
                            width={100}
                            height={100}
                            alt="img"
                            imgClassName="img img-h w-auto"
                        />
                    </div>
                </div>
                <div className="col-span-12 col-start-2 mt-16 flex flex-row justify-between border-t border-[#43464A]/30 py-5">
                    <div className="flex-center text-xs text-typo-dark-disable">
                        Copyright © &nbsp;
                        <span className="uppercase">
                            {APP_NAME} PLATFORM
                        </span>, {currentYear}
                    </div>
                    <div className="flex flex-row items-center gap-4">
                        <Button variant={"link"}>
                            <p className="text-sm text-typo-dark-disable">
                                Privacy Policy
                            </p>
                        </Button>
                        <Button variant={"link"}>
                            <p className="text-sm text-typo-dark-disable">
                                Term of Use
                            </p>
                        </Button>
                        <Button variant={"link"}>
                            <p className="text-sm text-typo-dark-disable">
                                Disclosures
                            </p>
                        </Button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
