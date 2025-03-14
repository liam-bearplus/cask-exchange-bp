import { APP_NAME } from "@/lib/constants";
import Link from "next/link";
import ImagePlaceholder from "../image-placeholder";
import Menu from "./menu";

const Header = () => {
    return (
        <header className="w-full border-b">
            <div className="wrapper flex-between">
                <div className="flex-start">
                    <Link href="/" className="flex-start">
                        <ImagePlaceholder
                            alt={`${APP_NAME} logo`}
                            src="/icons/logo.svg"
                            height={48}
                            width={48}
                            priority
                            className="h-12 w-12"
                        />
                    </Link>
                </div>
                <Menu />
            </div>
        </header>
    );
};

export default Header;
