import Link from "next/link";
import Image from "next/image";
import { APP_NAME } from "@/lib/constants";
import Menu from "./menu";

const Header = () => {
    return (
        <header className="w-full border-b">
            <div className="wrapper flex-between">
                <div className="flex-start">
                    <Link href="/" className="flex-start">
                        <Image
                            alt={`${APP_NAME} logo`}
                            src="/images/logo.svg"
                            height={48}
                            width={48}
                            priority
                        />
                        <span className="ml-6 hidden text-2xl font-bold lg:block">
                            {APP_NAME}
                        </span>
                    </Link>
                </div>
                <Menu />
            </div>
        </header>
    );
};

export default Header;
