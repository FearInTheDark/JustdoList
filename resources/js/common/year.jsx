import React from 'react';
import {cn} from "@/lib/utils"

const Year = ({classname=""}) => {
    return (
        <div className={cn("text-white flex items-center justify-center", ...classname)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 20 20">
                <g fill="currentColor">
                    <path fillRule="evenodd" d="M3 4h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1m1 4v8h12V8z" clipRule="evenodd"></path>
                    <circle cx={6.5} cy={10.5} r={1.5}></circle>
                    <circle cx={5.5} cy={4.5} r={1.5}></circle>
                    <circle cx={14.5} cy={4.5} r={1.5}></circle>
                </g>
            </svg>
        </div>
    );
};

export default Year;
