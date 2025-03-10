"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const BASE_URL = process.env.NEXTAUTH_URL || "http://localhost:3000";

const TwoFactorModal = () => {
    const [otp, setOtp] = useState("");
    const [invalidOtp, setInvalidOtp] = useState(false);

    const [qrImage, setQrImage] = useState();
    const [secret, setSecret] = useState();

    /* Generate a QR */
    const get2faQrCode = async () => {
        const response = await axios.get(`${BASE_URL}api/2fa/qrcode`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.data.status == 200) {
            setQrImage(response.data.data);
            setSecret(response.data.secret);
        }
    };

    useEffect(() => {
        get2faQrCode();
    }, []);

    /* Validate Code  */
    const handleOtpChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setOtp(e.target.value);

        if (e.target.value.length === 6) {
            const token = e.target.value;
            const response = await axios.post(
                `${BASE_URL}api/2fa/verify`,
                { secret, token },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.verified) {
                // 2FA Enabled successfully
            } else {
                setInvalidOtp(true);
            }
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
                        <input
                            type="text"
                            value={otp}
                            onChange={handleOtpChange}
                        />

                        {/* Invalid Input */}
                        {
                            <p className="text-red-500 mt-3 text-center text-sm">
                                {invalidOtp && "*Invalid Code"}
                            </p>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TwoFactorModal;
