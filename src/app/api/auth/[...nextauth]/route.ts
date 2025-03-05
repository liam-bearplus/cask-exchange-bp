import { OptionNextAuth } from "@/config/auth";
import NextAuth from "next-auth";

const handler = NextAuth(OptionNextAuth);

export { handler as GET, handler as POST };
