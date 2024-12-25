import React from 'react';
import AppLayout from "@/layouts/AppLayout"

const Events = () => {
    return (
        <div className="min-h-full max-w-6xl mx-auto my-auto grid place-items-center">
            <img src="/storage/app/illustrations/undraw3.svg" alt="Free" className="[margin:0_auto] filter drop-shadow-custom-blue"/>
        </div>
    );
};

Events.layout = page => <AppLayout children={page}/>
export default Events;
