import React, {useState} from 'react';
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import {Checkbox} from "@/components/ui/checkbox"
import {Button} from "@/components/ui/button"
import TaskHistory from "@/components/app/TaskHistory"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {AlarmClock, CircleCheckBig, EditIcon, Flag, Recycle, RotateCcw, TagIcon, Trash} from "lucide-react"
import {Textarea} from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import FlagIcon from "@/common/flag-color"
import {toast} from "sonner"
import {format} from "date-fns"
import moment from "moment"
import {usePage} from "@inertiajs/react"
import {ScrollArea} from "@/components/ui/scroll-area"
import {frequencies} from "@/common/objects"

const TaskDialog = ({selectedTask = {}, setSelectedTask, setTasks}) => {
    const [editable, setEditable] = useState(false)
    const {user} = usePage().props

    selectedTask && console.log(selectedTask)
    const title = () => selectedTask?.completed ?
        <div className="rounded-lg bg-green-500 px-2 py-0.5 text-gray-50 text-sm font-medium">Completed</div> :
        moment(selectedTask?.next).endOf('day') < moment() ?
            <div className="rounded-lg bg-red-400 px-2 py-0.5 text-gray-50 text-sm font-medium">Last: {selectedTask && format(selectedTask?.next, "PPP")}</div> :
            <div className="rounded-lg bg-blue-400 px-2 py-0.5 text-gray-50 text-sm font-medium">Next: {selectedTask && format(selectedTask?.next, "PPP")}</div>
    const handleDelete = async () => {
        try {
            const res = await axios.delete(route('tasks.destroy', selectedTask?.id))
            toast.success("Task Deleted", {
                description: () => res.data.message,
                action: {
                    label: "Undo",
                }
            })
            setTasks(pre => pre.filter(task => task.id !== selectedTask.id))
            setSelectedTask(null)
        } catch (error) {
            toast.error("Failed to delete task", {
                description: () => error.response.data.message,
                action: {
                    label: "Retry",
                    onClick: handleDelete
                }
            })
        }
    }

    const duration = (!selectedTask?.completed ? moment(selectedTask?.end_date).add(frequencies[selectedTask?.frequency], 'days') : moment(selectedTask?.end_date)).diff(moment(selectedTask?.begin_date), 'days');
    const doneDur = moment(selectedTask?.next).diff(moment(selectedTask?.begin_date), 'days');
    const percent = Math.round((doneDur / duration) * 100);

    const handleCheck = async () => {
        try {
            const res = await axios.patch(route('submit', selectedTask.id))
            const loadTask = res.data.task
            setSelectedTask(loadTask)
            setTasks(pre => pre.map(task => task.id === selectedTask.id ? loadTask : task))
            toast.success("Task updated successfully", {
                description: () => "Task completed"
            })
        } catch (e) {
            console.log(e)
        }
    }

    const handleUnCheck = async () => {
        try {
            const res = await axios.patch(route('unsubmit', selectedTask.id))
            const loadTask = res.data.task
            setSelectedTask(loadTask)
            setTasks(pre => pre.map(task => task.id === selectedTask.id ? loadTask : task))
            toast.success("Task updated successfully", {
                description: () => "Task completed"
            })
        } catch (e) {
            console.log(e)
        }
    }

    const handleSave = async () => {
        console.log(selectedTask)
        const res = await axios.patch(route('tasks.update', selectedTask.id), selectedTask)
        if (res.status !== 200) {
            toast("Update Error", {
                description: () => res.data.message,
            })
            return
        }
        toast("Task Updated", {
            description: () => "Task has been updated",
            action: {
                label: "Undo",
            }
        })
        setTasks(pre => pre.map(task => task.id === selectedTask.id ? selectedTask : task))
        setSelectedTask(null)
        setEditable(false)
    }

    return (
        <Dialog open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
            <DialogContent className="dark:bg-slate-700 p-0 max-w-task-dialog bg-gray-50 dark:rounded-lg overflow-hidden">
                <DialogHeader className="px-4 py-2 border-b space-y-0 dark:bg-gradient-to-b dark:from-slate-500 dark:to-slate-600">
                    <DialogTitle className="hidden"/>
                    <DialogDescription className="hidden"/>
                    <div className="flex justify-between items-center w-full pr-8">
                        {title()}
                        <span>Task</span>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="hover:text-red-600 rounded-lg hover:scale-105 active:scale-95 transition-all duration-300 h-fit focus:border-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M7 12a2 2 0 1 1-4 0a2 2 0 0 1 4 0m7 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0m7 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0"></path>
                                </svg>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="dark:bg-slate-600 w-56">
                                <DropdownMenuGroup>
                                    <DropdownMenuItem onClick={handleCheck}>
                                        <CircleCheckBig/>
                                        Toggle submit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleUnCheck}>
                                        <RotateCcw/>
                                        Toggle RollBack
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <TagIcon/>
                                        Edit Label
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleDelete}>
                                        <Trash color="red"/>
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </DialogHeader>
                <div className="w-full flex justify-between bg-gray-50 dark:bg-slate-700 p-3 pb-0">
                    <div className="flex flex-1 p-3 bg-white rounded-lg dark:bg-slate-600 shadow-md">
                        <div className="relative">
                            <Checkbox id={selectedTask?.id} autoFocus defaultChecked={selectedTask?.completed} checked={selectedTask?.completed} onClick={handleCheck}
                                      className="rounded-full size-6 border-blue-400 border-1 mt-1 data-[state=checked]:bg-green-600 focus:ring-0 bg-slate-100"/>
                        </div>
                        <div className="flex flex-col flex-1 gap-1 px-4 justify-between">
                            <div className="relative flex flex-col gap-1">
                                {editable ?
                                    <>
                                        <Textarea type="text" value={selectedTask?.title}
                                                  className="w-full p-2 dark:border-slate-400 rounded-md font-medium text-xl"
                                                  onChange={(e) => setSelectedTask({
                                                      ...selectedTask, title: e.target.value
                                                  })}
                                        />

                                        <Textarea type="text" value={selectedTask?.description} rows={6}
                                                  className="w-full p-2 dark:border-slate-400 rounded-md max-h-[200px]"
                                                  onChange={(e) => setSelectedTask({
                                                      ...selectedTask, description: e.target.value
                                                  })}
                                        />
                                    </>
                                    : <>
                                        <span className="font-semibold text-xl font-inter">{selectedTask?.title}</span>
                                        <span className="text-sm mb-3">{selectedTask?.description}</span>
                                        <div className="w-full flex justify-between items-center gap-3">
                                            <div className="end w-fit flex flex-col rounded-md px-2 border bg-red-100 dark:bg-gray-800">
                                                <span className="font-semibold text-sm text-muted-foreground italic">Begin Date:</span>
                                                <span>{selectedTask?.begin_date}</span>
                                            </div>
                                            <div className="flex flex-col flex-1 gap-1 items-center justify-center">
                                                {selectedTask?.frequency === 'once' ?
                                                <>
                                                    <span className="font-inter">{selectedTask?.completed ? 100 : 0}%</span>
                                                    <progress className={`progress w-56 progress-primary ${selectedTask?.completed && 'progress-success'}`} value={selectedTask?.completed ? 1 : 0} max={1}></progress>
                                                </> :
                                                <>
                                                    <span className="font-inter">{percent}%</span>
                                                    <progress className={`progress w-56 progress-primary ${selectedTask?.completed && 'progress-success'}`} value={doneDur} max={duration}></progress>
                                                </>}
                                            </div>
                                            <div className="end w-fit flex flex-col rounded-md px-2 border bg-blue-100 dark:bg-blue-800 border-none">
                                                <span className="font-semibold text-sm text-muted-foreground italic">End Date:</span>
                                                <span>{selectedTask?.end_date}</span>
                                            </div>
                                        </div>
                                    </>

                                }
                                <div className="w-full p-1 flex flex-col mt-2">
                                    <span className="font-semibold font-ui mb-1  text-gray-500 dark:text-gray-200">History</span>
                                    <ScrollArea className="w-full relative rounded-md px-2 py-3 max-h-[400px] bg-gray-100 dark:bg-slate-700">
                                        {/*<div className=" scrollbar-hide">*/}
                                        {selectedTask && selectedTask.histories.map((his, index) => (
                                            <TaskHistory history={his} key={index} user={user}/>
                                        ))}
                                        {/*</div>*/}
                                    </ScrollArea>
                                </div>
                            </div>
                            <div className="author flex flex-row">
                                <span className="text-muted-foreground italic text-sm">Author: {user && user.name}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col flex-shrink px-3 gap-3 justify-start [&>*]:w-full">
                        <Button variant="outline" className="px-2 dark:bg-gray-50 dark:text-gray-800" onClick={() => setEditable(!editable)}><EditIcon/> Edit</Button>
                        <Select onValueChange={e => setSelectedTask({...selectedTask, priority: e})}>
                            <SelectTrigger className={`flex p-0.5 px-3 gap-2 items-center whitespace-nowrap w-full
                                    ${selectedTask?.priority === 'extreme' ? 'bg-rose-500 hover:bg-rose-500 dark:bg-rose-600'
                                : selectedTask?.priority === 'high' ? 'bg-rose-400 hover:bg-rose-400 dark:bg-rose-700'
                                    : selectedTask?.priority === 'medium' ? 'bg-rose-300 hover:bg-rose-300 dark:bg-rose-800'
                                        : selectedTask?.priority === 'low' ? 'bg-rose-200 hover:bg-rose-200 dark:bg-rose-900'
                                            : 'bg-white dark:bg-gray-800'}
                                    ${selectedTask?.priority && 'ring-1 ring-rose-300'}
                                     font-normal hover:scale-[1.03] hover:border-rose-500 active:scale-95 transition-all duration-100 ease-in [&>span]:capitalize`}>
                                <Flag width={18} height={18} className="text-black dark:text-white"/>
                                <SelectValue placeholder={selectedTask?.priority || "Priority"}/>
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
                        <Select onValueChange={(e) => setSelectedTask({...selectedTask, frequency: e})}>
                            <SelectTrigger className={`flex p-0.5 px-3 gap-2 items-center whitespace-nowrap w-fit dark:bg-gray-800 ${selectedTask?.frequency && 'bg-blue-100 dark:bg-blue-800 hover:bg-blue-100 ring-1 ring-blue-400'} font-normal hover:border-blue-500 hover:scale-[1.03] active:scale-95 transition-all duration-100 ease-in [&>span]:capitalize`}>
                                <Recycle/>
                                <SelectValue placeholder={selectedTask?.frequency || "Frequency"}/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="once">Once</SelectItem>
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                                <SelectItem value="yearly">Yearly</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline" type="button" onClick={() => setSelectedTask({
                            ...selectedTask, reminder: !selectedTask.reminder
                        })}
                                className={`flex p-0.5 px-3 font-normal hover:border-yellow-500 dark:bg-gray-800 ${selectedTask?.reminder && 'ring-1 ring-yellow-500 bg-yellow-100 dark:bg-yellow-800 hover:bg-yellow-100'} hover:scale-[1.03] active:scale-95 transition-all duration-100 ease-in`}>
                            <AlarmClock/>
                            Reminder
                        </Button>
                        <div className="flex mt-auto justify-end gap-2 rounded-md">
                            <Button variant="outline" className="flex-1 dark:bg-gray-100 dark:text-gray-800 dark:backdrop-blur-md dark:border-none" onClick={() => setSelectedTask(null)}>Cancel</Button>
                            <Button variant="default" className="bg-blue-600 flex-1 dark:bg-blue-400 dark:text-white" onClick={handleSave}>Save</Button>
                        </div>
                    </div>
                </div>
                <DialogFooter/>
            </DialogContent>

        </Dialog>
    );
};

export default TaskDialog;
