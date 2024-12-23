import React from 'react';
import {icons} from "@/common/component-objects"
import {format} from "date-fns"

const TaskHistory = ({history = {}, user = {}}) => {
    return (
        <>
            <div className="flex gap-x-3 last:pb-0 last:mb-0">
                <div className="relative last:after:hidden after:absolute after:h-[70px] after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
                    <div className="relative z-10 size-7 flex justify-center items-center">
                        <div className={`size-2 rounded-full ${history.status ? 'bg-blue-400' : 'bg-red-400'}`}></div>
                    </div>
                </div>

                <div className="grow pt-0.5 pb-4">
                    <h3 className={`flex items-center gap-x-1.5 font-semibold text-gray-800 ${!history.status && "text-red-600"} dark:text-white`}>
                        {icons[history.type]()}
                        {history.title || "Undefined"}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-neutral-200">
                        {history.content || null}
                    </p>
                    <button type="button" className="mt-1 -ms-1 p-1 inline-flex items-center gap-x-2 text-xs rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
                        <img className="shrink-0 size-4 rounded-full" src={`/storage/app/avatars/${user.image}`} alt="Avatar"/>
                        {user.name}
                        <span>{format(history?.created_at, "yyyy-MM-dd hh:ii")}</span>
                    </button>
                </div>
            </div>
        </>

    );
};

export default TaskHistory;
