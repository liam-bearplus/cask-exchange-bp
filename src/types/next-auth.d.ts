import { TRole } from ".";

declare module "next-auth/jwt" {
    export interface JWT {
        id?: string;
        name?: string;
        accessToken?: string;
        refreshToken?: string;
    }
}

declare module "next-auth" {
    interface Session {
        user: {
            id?: string;
            name?: string;
            accessToken?: string;
            refreshToken?: string;
            email?: string;
            name?: string;
            image?: string;
        };
    }

    interface User {
        id: string;
        name?: string;
        accessToken?: string;
        refreshToken?: string;
        role: TRole;
    }
}
