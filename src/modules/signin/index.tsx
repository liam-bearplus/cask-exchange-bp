"use client";
import CredentialsHead from "@/components/shared/auth/credentials-head";
import CredentialsSignInForm from "@/components/shared/auth/credentials-signin-form";
import { motion } from "motion/react"
export default function SignInModule() {
    return (
        <motion.div animate={{
            opacity: 1
        }} initial={{
            opacity: 0,
        }} className="flex flex-col">
            <CredentialsHead title="Sign In" />
            <div className="pb-4">
                <CredentialsSignInForm />
            </div>
        </motion.div>
    )
}
