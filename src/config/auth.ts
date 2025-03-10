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
            async authorize(credentials) {
                console.log("credentials", credentials);

                if (credentials) {
                    return {
                        ...credentials,
                        id: credentials.username as string,
                    };
                } else return null;
            },
            credentials: {
                username: {
                    label: "Username",
                    type: "text ",
                    placeholder: "jsmith",
                },
                password: { label: "Password", type: "password" },
            },
        }),
        CredentialsProvider({
            id: "intranet-credentials",
            name: "Two Factor Auth",
            async authorize(credentials, req) {
                const user = {
                    id: credentials?.["2fa-key"] as string,
                };
                return user;
            },
            credentials: {
                username: {
                    label: "Username",
                    type: "text ",
                    placeholder: "jsmith",
                },
                "2fa-key": { label: "2FA Key" },
            },
        }),
    ],
    callbacks: {
        // signIn: async ({ user, account, profile, email, credentials }) => {
        //     console.log("User:", user);
        //     console.log("Account:", account);
        //     console.log("Profile:", profile);

        //     const res = await fetch("http://localhost:3000/api/login", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({
        //             email: email,
        //             password: credentials?.password,
        //         }),
        //     });

        //     const serverResponse = await res.json();
        //     console.log("serverResponse", serverResponse);
        //     if (serverResponse) {
        //         return true;
        //     } else {
        //         return false;
        //     }
        // },
        jwt: ({ token, user }) => {
            if (user) {
                token.id = user.id;
            }
            return { token, user };
        },
        session: ({ session, token }) => {
            session.user = token;

            console.log("session", session);
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,

    pages: {
        signIn: "/login",
        signOut: "/signout",
        error: "/error",
    },
};
