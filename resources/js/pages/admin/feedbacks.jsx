import React from 'react';
import AppLayout from "@/layouts/AppLayout"

const Feedbacks = () => {
    return (
        <div className="min-h-full max-w-6xl mx-auto my-auto grid place-items-center">
            <img src="/storage/app/illustrations/undraw2.svg" alt="Free" className="[margin:0_auto] filter drop-shadow-custom-blue"/>
        </div>
    );
};

Feedbacks.layout = page => <AppLayout children={page}/>
export default Feedbacks;
