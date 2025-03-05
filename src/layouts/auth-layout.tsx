import SplashScreen from "@/components/shared/auth/splash-screen";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen w-full">
      <div className="grid h-full min-h-screen w-full grid-cols-2">
        <SplashScreen />
        <div className="flex-center relative flex-col py-28">
          <div className="grid w-full grid-cols-12 gap-4 px-5">
            <div className="col-start-2 -col-end-2 mx-auto w-full max-w-[25rem]">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
