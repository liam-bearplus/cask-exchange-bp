import { ROUTE_AUTH } from "@/lib/constants/route";
import { loginUser } from "@/services/auth";
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
            },
            async authorize(credentials) {
                const user = await loginUser({
                    email: credentials?.email || "",
                    password: credentials?.password || "",
                });

                if (user) {
                    return {
                        id: user.id,
                        name: `${user.firstName} ${user.lastName}`,
                        email: user.email,
                    };
                }
                return null;
            },
        }),
    ],
    callbacks: {
        jwt: ({ token, user }) => {
            if (user) {
                token.id = user.id;
            }
            return { token, user };
        },
        session: ({ session, token }) => {
            session.user = token;

            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,

    pages: {
        signIn: ROUTE_AUTH.SIGNIN,
        signOut: "/signout",
        error: "/error",
    },
};
