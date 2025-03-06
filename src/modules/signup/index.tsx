"use client"
import CredentialsHead from "@/components/shared/auth/credentials-head";
import CredentialsSignUpForm from "@/components/shared/auth/credentials-signup-form";
import { motion } from "motion/react"
export default function SignUpModule() {
    return (
        <motion.div animate={{
            opacity: 1,
        }} initial={{
            opacity: 0,
        }} className="flex flex-col">
            <CredentialsHead title="Create new account" />
            <div className="pb-4">
                <CredentialsSignUpForm />
            </div>
        </motion.div>
    )
}