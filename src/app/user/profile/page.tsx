import ProfileForm from "@/components/shared/user/profile-form";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
    title: "My Profile",
};

const UserProfilePage = async () => {
    const session = await getServerSession();
    return (
        <>
            <SessionProvider session={session}>
                <div className="mx-auto max-w-md space-y-4">
                    <h2 className="h2-bold">Profile</h2>
                    <div>
                        <ProfileForm />
                    </div>
                </div>
            </SessionProvider>
        </>
    );
};

export default UserProfilePage;
