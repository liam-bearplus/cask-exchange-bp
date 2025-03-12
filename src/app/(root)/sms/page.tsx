"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormMessage,
} from "@/components/ui/form";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import axiosInstance from "@/config/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Pages() {
    const [secret, setSecret] = useState("");
    const handleSendOtp = async () => {
        const data = await axiosInstance.post("/2fa/sms/send", {
            number: "+84386898582",
        });
        console.log("data", data);
        setSecret(data.data.secret);
    };
    const formSMSchema = z.object({
        otp: z.string().min(6, {
            message: "Phone number must be at least 6 characters long",
        }),
    });
    const form = useForm({
        resolver: zodResolver(formSMSchema),
        defaultValues: {
            otp: "",
            secret: "",
        },
    });
    const onSubmit = (data: z.infer<typeof formSMSchema>) => {
        console.log(data);
        const zz = axiosInstance.post("/2fa/sms/verify", {
            otp: data.otp,
            secret,
        });
        console.log("data", zz);
    };
    return (
        <div className="flex h-full w-full items-center justify-center gap-10">
            <Button type="button" variant={"default"} onClick={handleSendOtp}>
                Send OTP
            </Button>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="otp"
                        render={({ field }) => (
                            <div className="space-y-1.5">
                                <FormControl>
                                    <InputOTP maxLength={6} {...field}>
                                        <InputOTPGroup>
                                            <InputOTPSlot index={0} />
                                            <InputOTPSlot index={1} />
                                            <InputOTPSlot index={2} />
                                            <InputOTPSlot index={3} />
                                            <InputOTPSlot index={4} />
                                            <InputOTPSlot index={5} />
                                        </InputOTPGroup>
                                    </InputOTP>
                                </FormControl>
                                <FormMessage />
                            </div>
                        )}
                    />
                </form>
            </Form>
        </div>
    );
}
