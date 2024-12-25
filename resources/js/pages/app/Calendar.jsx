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
import ShinyButton from "@/components/ui/shiny-button"
import {ReloadIcon} from "@radix-ui/react-icons"
import LoadingOverlay from "@/components/layers/LoadingOverlay"

const colors = [
    "#f87171", "#fbbf24", "#34d399", "#60a5fa", "#818cf8", "#d97706",
    "#93c5fd", "#f472b6", "#fbbf24", "#6ee7b7", "#fb923c", "#9333ea",
    "#e879f9", "#f9a8d4", "#4ade80", "#facc15", "#38bdf8", "#c084fc",
    "#22d3ee", "#fde047", "#e11d48", "#a855f7", "#16a34a", "#1d4ed8",
    "#64748b", "#ef4444", "#0891b2", "#d946ef", "#ea580c", "#f43f5e"
];

const Calendar = ({tasks = []}) => {
    const [events, setEvents] = useState(() => tasks.map(task => {
        return {
            id: task.id,
            title: task.title,
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            extendedProps: task,
            className: `${task.frequency === "once" ? "text-black dark:text-gray-500" : "text-white dark:text-gray-50"} opacity-80 py-1 my-1`,
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

    const handleReload = async () => {
        try {
            const res = await axios.get(route('list-calendars'));
            const updatedTasks = res.data.tasks;
            setEvents(
                updatedTasks.map(task => ({
                    id: task.id,
                    title: task.title,
                    backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                    extendedProps: task,
                    className: `${task.frequency === "once" ? "text-black dark:text-gray-500" : "text-white dark:text-gray-50"} opacity-90`,
                    start: format(task.begin_date, "yyyy-MM-dd").concat("T", task.time),
                    end: format(task.end_date, "yyyy-MM-dd").concat("T", task.time),
                    date: format(task.begin_date, "yyyy-MM-dd").concat("T", task.time),
                }))
            );
        } catch (error) {
            console.error("Error reloading events:", error);
        }
    };


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
                    // eventClick={(e) => console.log(e)}

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
            {/*Fixed rounded reload button at right bottom corner*/}
            <div className="">
                <ShinyButton className="fixed bottom-[3rem] right-4 z-50 p-4  text-white rounded-full shadow-lg" onClick={() => handleReload()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 8 8">
                        <path fill="currentColor" d="M4 0C1.8 0 0 1.8 0 4s1.8 4 4 4c1.1 0 2.12-.43 2.84-1.16l-.72-.72c-.54.54-1.29.88-2.13.88c-1.66 0-3-1.34-3-3s1.34-3 3-3c.83 0 1.55.36 2.09.91L4.99 3h3V0L6.8 1.19C6.08.47 5.09 0 3.99 0z"></path>
                    </svg>
                </ShinyButton>
            </div>
            {selectedTask &&
                <Suspense fallback={<LoadingOverlay/>}>
                    <LazyShowDialog selectedTask={selectedTask} setSelectedTask={setSelectedTask} setTasks={setEvents}/>
                </Suspense>}
            <HomeDock/>

        </>

    );
};

Calendar.layout = page => <AppLayout children={page}/>

export default Calendar;
