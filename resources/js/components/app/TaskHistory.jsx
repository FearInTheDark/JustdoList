import React from 'react';
import {format, parseISO} from "date-fns"

const TaskHistory = ({history = {}}) => {
    return (
        <div className="mb-4 w-full grid grid-cols-[25px_1fr_70px] items-start pb-4 last:mb-0 last:pb-0">
            {history.status ?
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500"/>
                : <span className="flex h-2 w-2 ml-3 translate-y-1 rounded-full bg-red-500"/>
            }
            <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{history?.content || "Undefined"}</p>
                <p className="text-sm text-muted-foreground">
                    <span className="font-medium">
                    {format(parseISO(history?.created_at), "hh:mm")}
                    </span>{'  '}
                    {format(parseISO(history?.created_at), "PPP")}
                </p>
            </div>
            <span className="text-muted-foreground italic text-sm">{history.status ? 'Completed' : 'Missed'}</span>
        </div>
    );
};

export default TaskHistory;
