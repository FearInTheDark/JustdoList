import React from 'react';
import OtpVerificationDialog from "@/pages/Auth/otp-verification-dialog"
import AOS from "aos"

const VerificationNotice = () => {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true
    })
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-200">
            <div className="flex flex-col p-4 px-8 rounded-lg shadow-md bg-white gap-4 max-w-xl justify-center ic" data-aos="fade-left" data-aos-duration="600">
                <h1 className="text-4xl font-bold text-center">OTP Verification</h1>
                <span className="select-none">
                    Please click the button below to verify your account before you can proceed.
                </span>
                <OtpVerificationDialog/>
            </div>

        </main>
    );
};

export default VerificationNotice;
