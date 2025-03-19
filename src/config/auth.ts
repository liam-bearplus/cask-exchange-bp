import { ROUTE_AUTH } from "@/lib/constants/route";
import authService from "@/services/auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const OptionNextAuth: NextAuthOptions = {
    session: {
        maxAge: 24 * 60 * 60,
        strategy: "jwt",
        generateSessionToken() {
            return "";
        },
    },
    providers: [
        CredentialsProvider({
            id: "login",
            name: "Domain Account",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "Please enter your email",
                },
                password: { label: "Password", type: "password" },
                accessToken: {
                    label: "accessToken",
                    type: "password",
                },
            },
            async authorize(credentials) {
                const user = await authService.loginUser({
                    email: credentials?.email || "",
                    password: credentials?.password || "",
                });
                if (user) {
                    return {
                        id: user.id,
                        name: `${user.firstName} ${user.lastName}`,
                        email: user.email,
                        accessToken: user.accessToken,
                        refreshToken: user.refreshToken,
                        role: user.role,
                        image: user?.avatar,
                    };
                }
                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name as string;
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
                token.picture = user.image;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.name = token.name;
            session.user.accessToken = token.accessToken;
            session.user.refreshToken = token.refreshToken;
            session.user.image = token.picture || "";
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,

    pages: {
        signIn: ROUTE_AUTH.LOGIN,
        signOut: "/signout",
        error: "/error",
    },
};
