import AuthLayout from "@/layouts/auth-layout";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <AuthLayout>{children}</AuthLayout>;
}
