import React from 'react';
import {Checkbox} from "@/components/ui/checkbox";
import {GripVertical} from "lucide-react";
import {Inertia} from "@inertiajs/inertia";
import {toast} from "sonner";
import {motion} from "framer-motion";
import TaskBadge from "@/common/task-badge"
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip"
import {frequencyDescriptions} from "@/common/objects"

const Task = ({task, tasks, setTasks, tasks_count, setSelectedTask, layout}) => {

    const toggleTaskCompletion = async (id) => {
        const updatedTask = tasks.map(task =>
            task.id === id ? {...task, completed: !task.completed} : task
        )
        setTasks(updatedTask)

        const taskToUpdate = updatedTask.find(task => task.id === id)
        tasks_count += taskToUpdate.completed ? -1 : 1
        console.log("taskToUpdate: ", taskToUpdate)
        try {
            Inertia.patch(route('tasks.update', id), taskToUpdate)
            toast.success('Task updated successfully', {
                description: "Task completion status has been updated",
                action: {
                    label: "Undo",
                    onClick: () => {
                        setTasks(tasks)
                        Inertia.patch(route('tasks.update', id), taskToUpdate)
                    }
                }
            })
        } catch (e) {
            toast.error('Failed to update')
        }
    }

    return (
        <motion.div
            layout
            whileHover={{scale: 1.05, dur: 0.5}}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className={`bg-white dark:bg-gray-700 cursor-pointer rounded-lg z-[11] relative shadow-md p-4 pb-2 transition-all duration-300 ease-in-out hover:shadow-lg select-none ${layout === 'pinterest' && 'mb-4 break-inside-avoid'}  hover:ring-blue-400 hover:ring-1`}
            onClick={() => {
                setSelectedTask(task)
                console.log("Selected Task: ", task)
            }}
        >
            <div className="flex flex-col justify-between h-full">
                <div className="flex items-start h-full">
                    <div className="inline-flex flex-col h-full gap-4">
                        <Checkbox
                            id={`task-${task.id}`}
                            checked={task.completed}
                            onCheckedChange={() => toggleTaskCompletion(task.id)}
                            className="mt-1 border-0 data-[state=checked]:bg-blue-400 dark:bg-gray-300 bg-gray-200"
                            onClick={(e) => e.stopPropagation()}
                        />
                        {task.completed ? (<img src="/storage/sources/tasks/note.svg" alt="note"/>) : (
                            <div className="mr-2">
                                <GripVertical className="h-5 w-5 text-gray-400 cursor-move pr-1"/>
                            </div>)}
                    </div>
                    <div className={`ml-3 flex-1 h-full flex flex-col ${layout !== 'list' ? 'justify-between' : ''}`}>
                        <div className={`flex flex-col`}>
                            <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-white'}`}>
                                {task.id + ' '}{task.title?.length > 50 ? task.title.substring(0, 50) + '...' : task.title}
                            </h3>
                            <span className={`text-sm ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-600 dark:text-gray-300'}`}>
                                {task.description?.length > 100 ? task.description.substring(0, 100) + '...' : (task.description ??
                                    <span className="italic text-sm text-muted-foreground"># No description</span>)}
                            </span>
                        </div>
                    </div>

                </div>
                <div className="mt-2 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                    <Tooltip>
                        <TooltipTrigger children={<TaskBadge variant={{role: 'frequency', value: task.frequency}}/>}/>
                        <TooltipContent children={<span>{frequencyDescriptions[task.frequency]}</span>}/>
                    </Tooltip>

                    <TaskBadge variant={{role: 'priority', value: task.priority}}/>
                    <span className="capitalize font-semibold text-yellow-600">
                        {task.time}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

export default Task;
