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
        // GoogleProvider({
        //     clientId: process.env.NEXT_PUBLIC_GOOGLE_client_id as string,
        //     clientSecret: process.env
        //         .NEXT_PUBLIC_GOOGLE_client_secret as string,
        //     authorization: {
        //         params: {
        //             prompt: 'consent',
        //             access_type: 'offline',
        //             response_type: 'code',
        //         },
        //     },
        // }),
        // GithubProvider({
        //     clientId: process.env.NEXT_PUBLIC_GITHUB_client_id as string,
        //     clientSecret: process.env
        //         .NEXT_PUBLIC_GITHUB_client_secret as string,
        // }),
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
                domain: {
                    label: "Domain",
                    type: "text ",
                    placeholder: "CORPNET",
                    value: "CORPNET",
                },
                username: {
                    label: "Username",
                    type: "text ",
                    placeholder: "jsmith",
                },
                password: { label: "Password", type: "password" },
            },
        }),
    ],
    callbacks: {
        signIn: async ({ user, account, profile, email, credentials }) => {
            console.log("User:", user);
            console.log("Account:", account);
            console.log("Profile:", profile);

            const res = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: credentials?.password,
                }),
            });

            const serverResponse = await res.json();
            console.log("serverResponse", serverResponse);
            if (serverResponse) {
                return true;
            } else {
                return false;
            }
        },
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
