import Link from "next/link";
import ImagePlaceholder from "@/components/shared/image-placeholder";
import Search from "./search";
import { Menu } from "./menu";
import UserAction from "./user-action";

const Header = () => {
    return (
        <header className="relative z-50 w-full bg-bg-darker">
            <div className="container flex flex-row items-center gap-20 py-4">
                <Link href="/" className="h-4 w-[11.0625rem] flex-none">
                    <ImagePlaceholder
                        alt="Logo"
                        src={"/images/logo-full.png"}
                        width={440}
                        height={40}
                    />
                </Link>
                <Search />
                <Menu />
                <UserAction />
            </div>
        </header>
    );
};

export default Header;
