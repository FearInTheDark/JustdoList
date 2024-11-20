import React from 'react';
import {cn} from "@/lib/utils"

const Week = ({classname=""}) => {
    return (
        <div className={cn("text-white size-5 flex items-center justify-center", ...classname)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                <path fill="currentColor" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h1.325q.825 0 1.413.588T7.325 6v12q0 .825-.587 1.413T5.325 20zm7.35 0q-.825 0-1.412-.587T9.35 18V6q0-.825.588-1.412T11.35 4h1.325q.825 0 1.413.588T14.675 6v12q0 .825-.587 1.413T12.675 20zm7.325 0q-.825 0-1.412-.587T16.675 18V6q0-.825.588-1.412T18.675 4H20q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20z"></path>
            </svg>
        </div>

    );
};

export default Week;
