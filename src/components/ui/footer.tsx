import { APP_NAME } from "@/lib/constants";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="bg-bg-dark-main">
            <div className="flex-center p-4 text-base text-typo-disable">
                Copyright © &nbsp;
                <span className="uppercase">{APP_NAME} PLATFORM</span>,{" "}
                {currentYear}
            </div>
        </footer>
    );
};

export default Footer;
