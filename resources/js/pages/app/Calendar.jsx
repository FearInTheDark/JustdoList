import React, {lazy, Suspense, useState} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import AppLayout from "@/layouts/AppLayout"
import {format} from "date-fns"
import {priorDots} from "@/common/objects"
import {toast} from "sonner"
import IntroLogo from "@/components/layers/IntroLogo"
import HomeDock from "@/components/HomeDock"

const colors = [
    "#f87171", "#fbbf24", "#34d399", "#60a5fa", "#818cf8", "#d97706", "#6ee7b7",
    "#93c5fd", "#f472b6", "#fbbf24",
    "#e879f9", "#f9a8d4", "#4ade80", "#facc15", "#38bdf8", "#c084fc", "#fb923c",
    "#22d3ee", "#fde047", "#e11d48", "#a855f7", "#16a34a", "#1d4ed8", "#9333ea",
    "#64748b", "#ef4444", "#0891b2", "#d946ef", "#ea580c", "#f43f5e"
];

const Calendar = ({tasks = []}) => {
    const [events, setEvents] = useState(() => tasks.map(task => {
        return {
            id: task.id,
            title: task.title,
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            extendedProps: task,
            className: `${task.frequency === "once" ? "text-black dark:text-gray-500" : "text-white dark:text-gray-50"} opacity-90`,
            start: format(task.begin_date, "yyyy-MM-dd").concat("T", task.time),
            end: format(task.end_date, "yyyy-MM-dd").concat("T", task.time),
            date: format(task.begin_date, "yyyy-MM-dd").concat("T", task.time),
        }
    }))
    const [selectedTask, setSelectedTask] = useState(null)
    const LazyShowDialog = lazy(() => import('@/components/app/TaskDialog'))

    const handleEventDrop = async (info) => {
        const event = info.event
        const data = {
            begin_date: format(event.start, "yyyy-MM-dd"),
            ...(event.end && {end_date: format(event.end, "yyyy-MM-dd")}),
        };
        try {
            await axios.patch(route('tasks.update', event.id), data)
            toast.success('Task updated successfully')
        } catch (e) {
            toast.error('Failed to update task', {
                description: (e.response.data.message || 'An error occurred while updating task'),
            })
        }
    }

    return (
        <>
            <IntroLogo srcIcon={"/storage/pages/calendar.svg"}/>
            <div className={`h-full px-8 pb-0 pt-12 bg-gray-100 dark:bg-gray-800 `}>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    locale="vi"

                    events={events}
                    eventClick={(e) => setSelectedTask(e.event.extendedProps)}
                    // eventClick={(e) => console.log(e.event)}
                    eventDrop={handleEventDrop}
                    slotEventOverlap={false}

                    dayHeaderClassNames={"bg-blue-100 "}
                    dayCellClassNames={"bg-white"}
                    viewClassNames={"mx-auto"}
                    nowIndicatorClassNames={"bg-blue-500"}

                    buttonText={{today: "Hôm nay", month: "Tháng", week: "Tuần", day: "Ngày"}}
                    allDayText={"Cả ngày"}
                    dayHeaderFormat={{weekday: 'long'}}
                    titleFormat={{year: 'numeric', month: 'long',}}
                    titleRangeSeparator={" - "}
                    themeSystem="standard"

                    headerToolbar={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay",
                    }}
                    eventContent={arg =>
                        (<div className="flex items-center bg-inherit px-2 border-none rounded-md">
                            <div className={`w-2 h-2 ${priorDots[arg.event.extendedProps.priority]} rounded-full mr-2`}></div>
                            <span className="text-xs">{arg.event.extendedProps.time}</span>
                            <span className="ml-2 text-xs font-semibold">{arg.event.title}</span>
                        </div>)}

                    editable={true}
                    selectable={true}
                    aspectRatio={1.8}
                    buttonHints={true}
                    dragScroll={true}
                    droppable={true}
                    dayCellContent={arg => (<div className="text-center text-sm">{arg.dayNumberText}</div>)}
                />
            </div>
            {selectedTask &&
                <Suspense fallback={<div>Loading...</div>}>
                    <LazyShowDialog selectedTask={selectedTask} setSelectedTask={setSelectedTask} setTasks={setEvents}/>
                </Suspense>}
            <HomeDock/>

        </>

    );
};

Calendar.layout = page => <AppLayout children={page}/>

export default Calendar;
