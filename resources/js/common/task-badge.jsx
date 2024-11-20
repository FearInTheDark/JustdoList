import React from 'react';
import FreOnce from "@/common/fre-once"
import {FlagIcon, Recycle} from "lucide-react"
import Week from "@/common/week"
import Month from "@/common/month"
import Year from "@/common/year"

const badgeVariants = {
    frequency: {
        once: {
            bg: "bg-[#6ba3be]",
            icon: <FreOnce width={20} height={20} color="#ffffff"/>,
            text: "Once"
        },
        daily: {
            bg: "bg-[#0C969C]",
            icon: <Recycle className="size-5 text-white"/>,
            text: "Daily"
        },
        weekly: {
            bg: "bg-[#0A7075]",
            icon: <Week/>,
            text: "Weekly"
        },
        monthly: {
            bg: "bg-[#274D60]",
            icon: <Month/>,
            text: "Monthly"
        },
        yearly: {
            bg: "bg-[#031716]",
            icon: <Year/>,
            text: "Yearly"
        }
    },
    priority: {
        low: {
            bg: "bg-[#f6e05e]",
            icon: <FlagIcon className="size-4 text-white"/>,
            text: "Low"
        },
        medium: {
            bg: "bg-[#f6ad55]",
            icon: <FlagIcon className="size-4 text-white"/>,
            text: "Medium"
        },
        high: {
            bg: "bg-[#f56565]",
            icon: <FlagIcon className="size-4 text-white"/>,
            text: "High"
        },
        extreme: {
            bg: "bg-[#f56565]",
            icon: <FlagIcon className="size-4 text-white"/>,
            text: "Extreme"
        }
    },
    time: {

    }
}
const TaskBadge = (props) => {
    return (
        <div className={`flex justify-start items-center gap-2 px-1 py-0.5 rounded-lg ${(badgeVariants[props.variant.role][props.variant.value].bg)} w-fit`}>
            {badgeVariants[props.variant.role][props.variant.value].icon}
            <span className="capitalize font-semibold text-white">{badgeVariants[props.variant.role][props.variant.value].text}</span>
        </div>
    );
};

export default TaskBadge;
