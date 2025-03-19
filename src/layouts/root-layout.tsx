import Footer from "@/components/ui/footer";
import Header from "./header";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex min-h-screen flex-col overflow-hidden">
            <Header />
            <main className="wrapper mt-10 flex-1">{children}</main>
            <Footer />
        </div>
    );
}
