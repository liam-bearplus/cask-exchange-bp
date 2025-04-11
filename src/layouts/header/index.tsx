import Link from "next/link";
import ImagePlaceholder from "@/components/shared/image-placeholder";
import Search from "./search";
import { Menu } from "./menu";
import UserAction from "./user-action";

const Header = () => {
    return (
        <header className="fixed top-0 z-50 w-full bg-bg-darker">
            <div className="container grid grid-cols-12">
                <div className="col-start-2 -col-end-2 flex flex-row justify-between py-6">
                    <div className="flex flex-row items-center gap-10">
                        <Link href="/" className="h-4 w-[11.0625rem] flex-none">
                            <ImagePlaceholder
                                alt="Logo"
                                src={"/images/logo-full.png"}
                                width={440}
                                height={40}
                                imgClassName="img img-w"
                            />
                        </Link>
                        <Menu />
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <Search />
                        <UserAction />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
