import { APP_NAME } from "@/lib/constants";
import ImagePlaceholder from "@/components/shared/image-placeholder";
import { Button } from "@/components/ui/button";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const ICON_COMPANY = [
        {
            src: "/icons/company/company-logo-1.png",
            alt: "company logo 1",
        },
        {
            src: "/icons/company/company-logo-2.png",
            alt: "company logo 2",
        },
        {
            src: "/icons/company/company-logo-3.png",
            alt: "company logo 3",
        },
        {
            src: "/icons/company/company-logo-4.png",
            alt: "company logo 4",
        },
    ];
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
                <div className="col-start-8 col-end-12">
                    <div className="mb-5 text-sm text-typo-dark-sub">
                        Investing in whiskey casks involves risks, including
                        market fluctuations, regulatory changes, evaporation
                        loss, and limited resale options. CaskExchange makes no
                        guarantees on future profits and is not obligated to
                        update forward-looking statements.
                    </div>
                    <div className="flex flex-row gap-8">
                        {ICON_COMPANY.map((icon, index) => {
                            return (
                                <ImagePlaceholder
                                    key={index}
                                    src={icon.src}
                                    className="h-6 flex-shrink-0"
                                    imgClassName="img img-h w-auto"
                                    alt={icon.alt}
                                    width={100}
                                    height={100}
                                />
                            );
                        })}
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
