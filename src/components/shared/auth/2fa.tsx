"use client";
import {
    Form,
    FormControl,
    FormField,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import axiosInstance from "@/config/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const TwoFactorModal = () => {
    const [otp, setOtp] = useState("");
    const [invalidOtp, setInvalidOtp] = useState(false);

    const [qrImage, setQrImage] = useState();
    const [secret, setSecret] = useState();

    /* Generate a QR */
    const get2faQrCode = async () => {
        const response = await axiosInstance.get("2fa/qrcode");
        setQrImage(response.data.data);
        setSecret(response.data.secret);
    };

    useEffect(() => {
        get2faQrCode();
    }, []);

    /* Validate Code  */
    const handleOtpChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setOtp(e.target.value);

        if (e.target.value.length === 6) {
            const token = e.target.value;
            const response = await axiosInstance.post("2fa/verify", {
                secret,
                token,
            });

            if (response.data.verified) {
                // 2FA Enabled successfully
            } else {
                setInvalidOtp(true);
            }
        }
    };
    const form2FaSchema = z.object({
        otp: z.string().min(6, {
            message: "OTP must be 6 characters long",
        }),
    });
    const form = useForm({
        resolver: zodResolver(form2FaSchema),
        defaultValues: {
            otp: "",
        },
    });
    const onSubmit = async (data: { otp: string }) => {
        console.log(data);
        setOtp(data.otp);

        const token = data.otp;
        const response = await axiosInstance.post("2fa/verify", {
            secret,
            token,
        });

        if (response.data.verified) {
            // 2FA Enabled successfully
        } else {
            setInvalidOtp(true);
        }
    };

    return (
        <div className="flex w-full justify-end">
            <div className="container mx-auto p-4">
                <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                    <div className="text-white flex flex-1 items-center justify-center rounded-md p-4">
                        {qrImage && (
                            <img
                                src={qrImage}
                                alt="2FA QR Code"
                                className="rounded-lg border-2"
                            />
                        )}
                    </div>

                    <div className="text-white flex-1 rounded-md p-4">
                        <p className="text-gray-700 mb-4 text-2xl font-bold">
                            Use an Authenticator App to enable 2FA
                        </p>
                        <ul className="text-gray-700 mb-4 list-inside list-none">
                            <li className="mb-2">
                                <span className="font-bold">Step 1:</span> Scan
                                the QR Code with your Authenticator app.
                            </li>
                            <li className="mb-2">
                                <span className="font-bold">Step 2:</span> Enter
                                the code below from your app.
                            </li>
                        </ul>

                        {/* OTP Input */}
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <FormField
                                    control={form.control}
                                    name="otp"
                                    render={({ field }) => (
                                        <div className="space-y-1.5">
                                            <FormControl>
                                                <InputOTP
                                                    maxLength={6}
                                                    {...field}
                                                >
                                                    <InputOTPGroup>
                                                        <InputOTPSlot
                                                            index={0}
                                                        />
                                                        <InputOTPSlot
                                                            index={1}
                                                        />
                                                        <InputOTPSlot
                                                            index={2}
                                                        />
                                                        <InputOTPSlot
                                                            index={3}
                                                        />
                                                        <InputOTPSlot
                                                            index={4}
                                                        />
                                                        <InputOTPSlot
                                                            index={5}
                                                        />
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
                </div>
            </div>
        </div>
    );
};

export default TwoFactorModal;
