import React from 'react';
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
import {CircleCheckBig, TagIcon, Trash} from "lucide-react"

const TaskDialog = ({selectedTask = null, setSelectedTask, setTasks}) => {
    function handleDelete() {
        const res = axios.delete(route('tasks.destroy', selectedTask?.id))
        res && setSelectedTask(null)
        res && setTasks(pre => pre.filter(task => task.id !== selectedTask.id))
    }

    console.log(selectedTask)
    function handleCheck() {
        setSelectedTask({...selectedTask, completed: !selectedTask.completed})
    }

    return (
        <Dialog open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
            <DialogContent className="dark:bg-slate-700 p-0 max-w-task-dialog">
                <DialogHeader className="px-4 py-2 border-b space-y-0">
                    <DialogTitle className="hidden"/>
                    <DialogDescription className="hidden"/>
                    <div className="flex justify-between items-center w-full pr-8">
                        <span>Task</span>
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
                                        Toggle finish
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
                <div className="w-full flex justify-between p-3 pb-0">
                    <div className="flex flex-1 bg-gray-50 p-3 rounded-lg">
                        <div className="relative">
                            <Checkbox id={selectedTask?.id} autoFocus defaultChecked={selectedTask?.completed} checked={selectedTask?.completed} onClick={handleCheck}
                                      className="rounded-full size-6 border-blue-400 border-1 mt-1 data-[state=checked]:bg-green-600 focus:border-none focus:ring-0 bg-white"/>
                        </div>
                        <div className="flex flex-col flex-1 gap-1 px-4 justify-between">
                            <div className="relative flex flex-col gap-1">
                                <span className="font-semibold text-xl font-inter">{selectedTask?.title}</span>
                                <span className="text-sm mb-3">{selectedTask?.description}</span>
                                <div className="w-full p-1 flex flex-col mt-2">
                                    <span className="font-semibold font-ui text-gray-500">History</span>
                                    <div className="w-full rounded-md px-2 py-3 overflow-y-scroll max-h-[400px] bg-gray-100 scrollbar-hide">
                                        {selectedTask && selectedTask.histories.map((his, index) => (
                                            <TaskHistory history={his} key={index}/>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="author flex flex-row">
                                <span className="text-muted-foreground italic text-sm">Author: {selectedTask?.id}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col flex-shrink px-3 gap-2 justify-between">
                        <Button variant="outline">Click me</Button>
                        <Button variant="outline">Click me</Button>
                        <Button variant="outline">Click me</Button>
                        <Button variant="outline">Click me</Button>
                    </div>
                </div>
                <DialogFooter>
                    <div className="flex w-full px-4 m-2 mt-0 justify-end gap-2 rounded-md">
                        <Button variant="outline">Cancel</Button>
                        <Button variant="default" className="bg-blue-600">Save</Button>
                    </div>
                </DialogFooter>
            </DialogContent>

        </Dialog>
    );
};

export default TaskDialog;
