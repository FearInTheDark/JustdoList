import React, {useMemo, useState} from 'react';
import {keywords, priorities, responsive} from '@/common/objects'
import AppLayout from "@/layouts/AppLayout";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {AlarmClock, ChevronDown, ChevronUp, Flag, Plus, Recycle, Tag, X} from "lucide-react";
import {Checkbox} from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import ThemeMode from "@/components/ThemeMode";
import IntroLogo from "@/components/layers/IntroLogo";
import {useForm} from "@inertiajs/react";
import {CalendarIcon, ReloadIcon} from "@radix-ui/react-icons";
import Task from "@/components/app/Task";
import {useRoute} from "ziggy-js";
import FlagIcon from "@/common/flag-color";
import {toast} from "sonner";
import GridPattern from "@/components/ui/grid-pattern";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {Calendar} from "@/components/ui/calendar"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import moment from "moment";
import {taskInitData} from "@/common/task-init-data";
import TaskDialog from "@/components/app/TaskDialog"
import TimePicker from "@/components/ui/time-picker"
import {format} from "date-fns"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css";

const Tasks = ({taskss = null, title, type = null, defaultLayout = "grid"}) => {
    const [tasks, setTasks] = useState(taskss);
    const [layout, setLayout] = useState(defaultLayout);
    const [finished, setFinished] = useState(false);
    const [tasksCount, setTasksCount] = useState(null)
    const [selectedTask, setSelectedTask] = useState(null);
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [sortConfig, setSortConfig] = useState(null);

    const {data, setData, errors, processing} = useForm(taskInitData);
    const route = useRoute()

    let overdueTasks = useMemo(() => {
        return tasks.filter(task => moment(task.next).endOf('day').isBefore(moment()) && !task.completed)
    }, [tasks])

    let sortedTasks = useMemo(() => {
        const filteredTasks = tasks.filter(task => finished ? task.completed === true : task.completed === false && moment(task.next).endOf('day').isAfter(moment()));
        if (!finished) setTasksCount(filteredTasks.length)
        return filteredTasks.sort((a, b) => {
            if (!sortConfig) return 0;
            const {key, direction} = sortConfig;
            if (key === 'priority') {
                return direction === 'asc' ? priorities[a[key]] - priorities[b[key]] : priorities[b[key]] - priorities[a[key]];
            }
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [tasks, sortConfig, finished]);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({key, direction});
    };

    const handleFinishedTasks = (e) => {
        e.preventDefault();
        setFinished(!finished);
    };

    const handleCalendarSelect = (date) => {
        if (data.frequency !== "once" && data.frequency !== null)
            setData({...data, begin_date: format(date.from, "yyyy-MM-dd"), end_date: format(date.to, "yyyy-MM-dd")})
        else setData({...data, begin_date: format(date, "yyyy-MM-dd"), end_date: format(date, "yyyy-MM-dd")})
    }

    const handleType = (e) => {
        e.preventDefault()
        const lastWord = e.target.value.split(' ').slice(-1)[0]
        if (lastWord.startsWith('_')) {
            if (keywords.hasOwnProperty(lastWord))
                setData(prevData => ({...prevData, ...keywords[lastWord]}))
        } else setData(prevData => ({...prevData, title: e.target.value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(route('tasks.store'), data)
            const newTask = res.data.task
            setTasks((prev) => [...prev, newTask]);
            toast.success('Task added successfully', {
                description: 'Task has been added successfully',
            });
            setIsAddingTask(false);
            setData(taskInitData);
        } catch (error) {
            toast.error('Failed to add task', {
                description: (error.response.data.message || 'An error occurred while adding task'),
            })
        }
    };
    return (
        <>
            <GridPattern
                width={20} height={20}
                x={-1} y={-1}
                strokeDasharray={"4 2"}
                className="fixed [mask-image:radial-gradient(900px_circle_at_center,white,transparent)] z-0 size-full"/>
            <IntroLogo srcIcon={'/storage/pages/tasks.svg'}/>
            <div className={`h-full px-8 pb-0 pt-12 bg-gray-100 dark:bg-gray-800`}>
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex flex-col">

                            <h1 className="text-3xl font-bold dark:text-white">{title || "Task List"}</h1>
                            <span>There {tasksCount === 1 ? 'is' : 'are'} {tasksCount} {`${tasksCount > 1 ? 'tasks' : 'task'}`} ahead</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Select value={layout} onValueChange={setLayout}>
                                <SelectTrigger className="w-[180px] backdrop-blur">
                                    <SelectValue placeholder="Select layout"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="list">List</SelectItem>
                                    <SelectItem value="grid">Grid</SelectItem>
                                    <SelectItem value="pinterest">Pinterest</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button onClick={() => setIsAddingTask(true)} className="bg-rose-500 hover:bg-rose-600 dark:text-gray-50 transition-all duration-200 ease-in hover:shadow-lg hover:scale-[1.02] active:scale-95">
                                <Plus className="mr-2 h-4 w-4"/> Add Task
                            </Button>
                            <ThemeMode/>
                        </div>
                    </div>
                    <div className="mb-4 flex justify-between">
                        <div className="flex space-x-2">

                            {['title', 'time', 'priority'].map((key) => (
                                <Button
                                    key={key}
                                    onClick={() => handleSort(key)}
                                    variant="outline"
                                    className="capitalize backdrop-blur">
                                    {key}
                                    {sortConfig?.key === key && (sortConfig.direction === 'asc'
                                        ? <ChevronUp className="ml-2 h-4 w-4"/>
                                        : <ChevronDown className="ml-2 h-4 w-4"/>)}
                                </Button>
                            ))}
                            <Button variant="outline" className="backdrop-blur" onClick={() => setSortConfig(null)}><X/></Button>
                        </div>
                        <div className="flex justify-center items-center">
                            <Label className="inline-flex h-9 items-center space-x-2 py-2 px-4 border rounded-md justify-between gap-1 bg-background shadow-sm">
                                <Checkbox id="finished" name="finished"
                                          onClick={handleFinishedTasks}
                                          checked={finished} defaultChecked={false}/>
                                <span>Finished</span>
                            </Label>
                            <Button className="ml-2 sticky top-10 left-10" variant="outline" onClick={async () => {
                                const fetchTasks = await axios.get(route('task-list'))
                                setTasks(fetchTasks.data.tasks)
                            }}>
                                <ReloadIcon/>
                            </Button>
                        </div>
                    </div>
                    {sortedTasks.length ?
                        (<div className={`${layout === 'list' ? 'space-y-4' : layout === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4' : 'columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4'}`}>
                            {sortedTasks.map((task, index) =>
                                <Task task={task} key={index} tasks_count={tasksCount}
                                      tasks={tasks} setTasks={setTasks}
                                      setSelectedTask={setSelectedTask}
                                      layout={layout}/>)}
                        </div>
                    ) : <Carousel responsive={responsive} infinite autoPlaySpeed={10000} focusOnSelect={false}
                                  containerClass=" [max-width:_min(600px,_70%)] overflow-hidden mx-auto select-none"
                                  autoPlay arrows={false}
                    >
                            {Array.from({length: 2}, (_, i) =>
                                <img src={`/storage/pages/tasks/finish${i + 1}.svg`} alt="Finished Image" key={i} className="drop-shadow-lg select-none"/>)}
                        </Carousel>
                    }

                    {
                        overdueTasks.length > 0 &&
                            <>
                                <div className="capitalize font-semibold font-inter text-3xl py-10">{type} overdue tasks:</div>
                                <div className={`${layout === 'list' ? 'space-y-4' :
                                    (layout === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4' : 'columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4')}`}>

                                    {overdueTasks.map((task, index) =>
                                        <Task task={task} key={index}
                                              tasks={tasks} setTasks={setTasks}
                                              selectedTask={selectedTask} setSelectedTask={setSelectedTask}
                                              layout={layout}
                                        />)}
                                </div>
                            </>
                    }
                </div>
                <TaskDialog selectedTask={selectedTask} setSelectedTask={setSelectedTask} setTasks={setTasks}/>
                <Dialog open={isAddingTask} onOpenChange={setIsAddingTask}>
                    <DialogContent className="shadow-gray-400 dark:shadow-gray-600 dark:bg-[#202020] max-w-fit">
                        <DialogHeader className="">
                            <DialogTitle className="hidden"/>
                            <DialogDescription className="hidden"/>
                        </DialogHeader>
                        <form className="flex flex-col font-ui" onSubmit={handleSubmit}>
                            <Input className={`border-none shadow-none border-b-black font-semibold text-2xl focus-visible:border-b focus-visible:border-black focus-visible:ring-0 placeholder:text-gray-500`}
                                   placeholder={errors.title ? "Title is not valid" : "Task name"} value={data.title} onChange={handleType}/>
                            {errors.title &&
                                <span className="text-rose-300 italic text-sm ml-3 font-thin">Title is not valid</span>}
                            <Input className="border-none shadow-none text-sm focus-visible:ring-0 placeholder:text-gray-500"
                                   placeholder="Task description" onChange={e => setData({
                                ...data, description: e.target.value
                            })}/>
                            <div className="flex justify-start gap-2 items-center p-1">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className={`flex p-0.5 px-3 font-normal hover:scale-[1.03] dark:bg-gray-800 hover:border-green-500 active:scale-95 ${(errors.begin_date || errors.end_date) && 'border-red-400 bg-red-50'} transition-all duration-100 ease-in`}>
                                            <CalendarIcon/>
                                            {data.frequency === 'once' || data.frequency === null || data.frequency === '' ? format(data.begin_date, "PP") : (
                                                <span>{format(data.begin_date, "PP") + ' to ' + format(data.end_date, "PP")}</span>) || "Today"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent align="start" className="flex items-center w-auto space-y-2 p-2 gap-2">
                                        <div className="flex flex-col space-y-2">
                                            <Select onValueChange={(value) => setData({
                                                ...data, begin_date: moment().add(value, 'days').format('YYYY-MM-DD')
                                            })}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Choose Date..."/>
                                                </SelectTrigger>
                                                <SelectContent position="popper">
                                                    <SelectItem value="0">Today</SelectItem>
                                                    <SelectItem value="1">Tomorrow</SelectItem>
                                                    <SelectItem value="3">In 3 days</SelectItem>
                                                    <SelectItem value="7">In 7 days</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <Calendar
                                                initialFocus
                                                mode={data.frequency === 'once' || data.frequency === null ? 'single' : 'range'}
                                                selected={(data.frequency === 'once' || data.frequency === null) ? new Date(data.begin_date) : {
                                                    from: data.begin_date, to: data.end_date
                                                }}
                                                onSelect={handleCalendarSelect}
                                                defaultMonth={new Date(data.begin_date)}
                                                numberOfMonths={data.frequency === 'once' || data.frequency === null ? 1 : 2}
                                                className="border rounded-md"
                                            />

                                        </div>
                                        <TimePicker state={data} setState={setData} classname="shadow-none"/>
                                    </PopoverContent>
                                </Popover>
                                <Select onValueChange={e => setData({...data, priority: e})}>
                                    <SelectTrigger className={`flex p-0.5 px-3 gap-2 items-center whitespace-nowrap w-fit
                                    ${data.priority === 'extreme' ? 'bg-rose-500 hover:bg-rose-500 dark:bg-rose-600'
                                        : data.priority === 'high' ? 'bg-rose-400 hover:bg-rose-400 dark:bg-rose-700'
                                            : data.priority === 'medium' ? 'bg-rose-300 hover:bg-rose-300 dark:bg-rose-800'
                                                : data.priority === 'low' ? 'bg-rose-200 hover:bg-rose-200 dark:bg-rose-900'
                                                    : 'bg-white dark:bg-gray-800'}
                                    ${data.priority && 'ring-1 ring-rose-300'}
                                     font-normal hover:scale-[1.03] hover:border-rose-500 active:scale-95 transition-all duration-100 ease-in [&>span]:capitalize`}>
                                        <Flag width={18} height={18} className="text-black dark:text-white"/>
                                        <SelectValue placeholder={data.priority || "Priority"}/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel className="flex items-center gap-1"><FlagIcon/>Priorities</SelectLabel>
                                            <SelectItem value="low" className="flex flex-row">Low</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="high">High</SelectItem>
                                            <SelectItem value="extreme">Extreme</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <Select onValueChange={(e) => setData({...data, frequency: e})}>
                                    <SelectTrigger className={`flex p-0.5 px-3 gap-2 items-center whitespace-nowrap w-fit dark:bg-gray-800 ${data.frequency && 'bg-blue-100 dark:bg-blue-800 hover:bg-blue-100 ring-1 ring-blue-400'} font-normal hover:border-blue-500 hover:scale-[1.03] active:scale-95 transition-all duration-100 ease-in [&>span]:capitalize`}>
                                        <Recycle/>
                                        <SelectValue placeholder={data.frequency || "Frequency"}/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="once">Once</SelectItem>
                                        <SelectItem value="daily">Daily</SelectItem>
                                        <SelectItem value="weekly">Weekly</SelectItem>
                                        <SelectItem value="monthly">Monthly</SelectItem>
                                        <SelectItem value="yearly">Yearly</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button variant="outline" type="button" onClick={() => setData({
                                    ...data,
                                    reminder: !data.reminder
                                })}
                                        className={`flex p-0.5 px-3 font-normal hover:border-yellow-500 dark:bg-gray-800 ${data.reminder && 'ring-1 ring-yellow-500 bg-yellow-100 dark:bg-yellow-800 hover:bg-yellow-100'} hover:scale-[1.03] active:scale-95 transition-all duration-100 ease-in`}>
                                    <AlarmClock/>
                                    Reminder
                                </Button>
                            </div>
                        </form>
                        <hr className="my-0 w-[75%] mx-auto"/>
                        <DialogFooter className="flex sm:justify-between w-full">
                            <Tooltip delayDuration={1000}>
                                <TooltipTrigger asChild>
                                    <Button variant="outline"><Tag/> Label</Button>
                                </TooltipTrigger>
                                <TooltipContent className="z-[51]">
                                    Label (Max 10 characters)
                                </TooltipContent>
                            </Tooltip>
                            <div className="flex gap-2">
                                <Button variant="ghost" onClick={() => setData(taskInitData)}>Clear</Button>
                                <Button variant="outline" onClick={() => setIsAddingTask(pre => !pre)}>Cancel</Button>
                                <Button onClick={handleSubmit} disabled={processing}
                                        className="bg-green-700 dark:text-white w-[100px] hover:bg-green-800 hover:scale-[1.03] hover:shadow-lg transition-all duration-100 ease-in-out">
                                    {processing &&
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className="mr-2">
                                            <rect width={10} height={10} x={1} y={1} fill="currentColor" rx={1}>
                                                <animate id="svgSpinnersBlocksShuffle30" fill="freeze" attributeName="x" begin="0;svgSpinnersBlocksShuffle3b.end" dur="0.2s" values="1;13"></animate>
                                                <animate id="svgSpinnersBlocksShuffle31" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle38.end" dur="0.2s" values="1;13"></animate>
                                                <animate id="svgSpinnersBlocksShuffle32" fill="freeze" attributeName="x" begin="svgSpinnersBlocksShuffle39.end" dur="0.2s" values="13;1"></animate>
                                                <animate id="svgSpinnersBlocksShuffle33" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle3a.end" dur="0.2s" values="13;1"></animate>
                                            </rect>
                                            <rect width={10} height={10} x={1} y={13} fill="currentColor" rx={1}>
                                                <animate id="svgSpinnersBlocksShuffle34" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle30.end" dur="0.2s" values="13;1"></animate>
                                                <animate id="svgSpinnersBlocksShuffle35" fill="freeze" attributeName="x" begin="svgSpinnersBlocksShuffle31.end" dur="0.2s" values="1;13"></animate>
                                                <animate id="svgSpinnersBlocksShuffle36" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle32.end" dur="0.2s" values="1;13"></animate>
                                                <animate id="svgSpinnersBlocksShuffle37" fill="freeze" attributeName="x" begin="svgSpinnersBlocksShuffle33.end" dur="0.2s" values="13;1"></animate>
                                            </rect>
                                            <rect width={10} height={10} x={13} y={13} fill="currentColor" rx={1}>
                                                <animate id="svgSpinnersBlocksShuffle38" fill="freeze" attributeName="x" begin="svgSpinnersBlocksShuffle34.end" dur="0.2s" values="13;1"></animate>
                                                <animate id="svgSpinnersBlocksShuffle39" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle35.end" dur="0.2s" values="13;1"></animate>
                                                <animate id="svgSpinnersBlocksShuffle3a" fill="freeze" attributeName="x" begin="svgSpinnersBlocksShuffle36.end" dur="0.2s" values="1;13"></animate>
                                                <animate id="svgSpinnersBlocksShuffle3b" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle37.end" dur="0.2s" values="1;13"></animate>
                                            </rect>
                                        </svg>}
                                    Save
                                </Button>
                            </div>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </>

    )

}

Tasks.layout = page => <AppLayout children={page}/>

export default Tasks;
