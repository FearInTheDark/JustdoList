import React, {useEffect, useState} from 'react';
import { Inertia } from '@inertiajs/inertia';
import {priorities} from '@/common/objects'
import AppLayout from "@/layouts/AppLayout";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {ChevronDown, ChevronUp, GripVertical, Plus, X} from "lucide-react";
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
import {toast} from "sonner";
import {useForm} from "@inertiajs/react";
import {ReloadIcon} from "@radix-ui/react-icons";


const Tasks = ({taskss, tasks_count}) => {
    const [layout, setLayout] = useState('list')
    const [tasks, setTasks] = useState(taskss)
    const [selectedTask, setSelectedTask] = useState(null)
    const [finished, setFinished] = useState(false)
    const [isAddingTask, setIsAddingTask] = useState(false)
    const [sortConfig, setSortConfig] = useState(null)
    const {data, setData, post, errors, processing} = useForm({
        title: '',
        description: '',
        frequency: '',
        priority: '',
        time: new Date(new Date().setHours(new Date().getHours() + 1)).toLocaleString(['vi-VN'], {
            hour: '2-digit',
            minute: '2-digit',
        }),
        end_date: new Date().toISOString().split('T')[0],
        completed: false,
    })
    const toggleTaskCompletion = async (id) => {
        const updatedTask = tasks.map(task =>
            task.id === id ? {...task, completed: !task.completed} : task
        )
        setTasks(updatedTask)

        const taskToUpdate = updatedTask.find(task => task.id === id)
        console.log(taskToUpdate)
        Inertia.patch(route('tasks.update', id), taskToUpdate, {
            onSuccess: () => {
                console.log('Task updated successfully')
                toast('Task updated successfully', {
                    description: () => taskToUpdate.completed ? 'Task has been marked as completed' : 'Task has been marked as incomplete',
                    action: {
                        label: "Undo",
                        onClick: () => {
                            toggleTaskCompletion(id)
                        }
                    }
                })
            },
            onError: () => {
                toast('Failed to update task')
            },
        })
    }

    const handleSort = (key) => {
        let direction = 'asc'
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc'
        }
        setSortConfig({key, direction})
    }

    let sortedTasks = [...tasks].sort((a, b) => {
        if (!sortConfig) return 0
        const {key, direction} = sortConfig
        if (key === 'priority') {
            return direction === 'asc' ? priorities[a[key]] - priorities[b[key]] : priorities[b[key]] - priorities[a[key]]
        }
        if (a[key] < b[key]) return direction === 'asc' ? -1 : 1
        if (a[key] > b[key]) return direction === 'asc' ? 1 : -1
        return 0
    })

    useEffect(() => {
        setTasks((taskss.filter(task => task.completed === finished)))
    }, []);

    const handleFinishedTasks = (e) => {
        e.preventDefault()
        setFinished(!finished)
        setTasks(taskss.filter(task => !task.completed === finished))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        post(route('tasks.store'), {
            onSuccess: params => {
                const newTask = {
                    id: params.props.task.id,
                    title: params.props.task.title,
                    description: params.props.task.description,
                    frequency: params.props.task.frequency,
                    priority: params.props.task.priority,
                    time: params.props.task.time,
                    end_date: params.props.task.end_date,
                    completed: false,
                }
                console.log(newTask)
                setTasks([...tasks, newTask])
                toast('Task added successfully', {
                    description: 'Task has been added successfully',
                })
            },

            onError: errors => {
                console.log(errors)
                toast('Failed to add task', {
                        description: 'Failed to add task',
                    }
                )
            }
        })
    }

    return (
        <>
            <IntroLogo srcIcon={'storage/app/tasks.svg'}/>
            <div className={`h-full px-8 pb-0 pt-12 bg-gray-100 dark:bg-gradient-to-l dark:from-sidebar dark:to-sidebar/50`}>
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex flex-col">

                            <h1 className="text-3xl font-bold dark:text-white">Task List</h1>
                            <span>There are {tasks_count} tasks ahead</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Select value={layout} onValueChange={setLayout}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select layout"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="list">List</SelectItem>
                                    <SelectItem value="grid">Grid</SelectItem>
                                    <SelectItem value="pinterest">Pinterest</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button onClick={() => setIsAddingTask(true)}>
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
                                    className="capitalize">
                                    {key}
                                    {sortConfig?.key === key && (sortConfig.direction === 'asc'
                                        ? <ChevronUp className="ml-2 h-4 w-4"/>
                                        : <ChevronDown className="ml-2 h-4 w-4"/>)}
                                </Button>
                            ))}
                            <Button variant="outline" onClick={() => setSortConfig(null)}><X/></Button>
                        </div>
                        <div className="flex justify-center items-center">
                            <Label className="inline-flex h-9 items-center space-x-2 py-2 px-4 border rounded-md justify-between gap-1 bg-background shadow-sm">
                                <Checkbox id="finished" name="finished" onClick={handleFinishedTasks} checked={finished} defaultChecked={false}/>
                                <span>Finished</span>
                            </Label>
                            {/*<Button className="ml-2" variant="outline">*/}
                            {/*    <X onClick={() => setTasks(taskss)}/>*/}
                            {/*</Button>*/}
                            <Button className="ml-2 sticky top-10 left-10" variant="outline">
                                <ReloadIcon onClick={() => {Inertia.reload({only: "tasks"})}}/>
                            </Button>
                        </div>
                    </div>
                    <div className={`${layout === 'list' ? 'space-y-4' :
                        (layout === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'columns-1 md:columns-2 lg:columns-3 gap-4')}`}>
                        {sortedTasks.map((task, index) => (
                            <div className={`bg-white dark:bg-gray-800 cursor-pointer rounded-lg shadow-md p-4 transition-all duration-300 ease-in-out hover:shadow-lg select-none ${layout === 'pinterest' ? 'mb-4 break-inside-avoid' : ''}`}
                                 onClick={() => setSelectedTask(task)}
                                 key={index}>
                                <div className="flex items-start h-full">
                                    <div className="inline-flex flex-col h-full gap-4">
                                        <Checkbox
                                            id={`task-${task.id}`}
                                            checked={task.completed}
                                            onCheckedChange={() => toggleTaskCompletion(task.id)}
                                            className="mt-1"
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                        <div className="mr-2">
                                            <GripVertical className="h-5 w-5 text-gray-400 cursor-move"/>
                                        </div>
                                    </div>
                                    <div className={`ml-3 flex-1 h-full flex flex-col ${layout !== 'list' ? 'justify-between' : ''}`}>
                                        <div className="flex flex-col">
                                            <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-white'}`}>
                                                {task.id + ' '}{task.title}
                                            </h3>
                                            <span className={`text-sm ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-600 dark:text-gray-300'}`}>
                                            {task.description}
                                        </span>
                                        </div>
                                        <div className="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
                                            <span className="capitalize font-semibold text-blue-400">{task.frequency}</span>
                                            <span className="capitalize font-semibold text-rose-400">Priority: {task.priority}</span>
                                            <span className="capitalize font-semibold text-yellow-600">{(task.time).toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <Dialog open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{selectedTask?.title}</DialogTitle>
                            <DialogDescription/>
                            <span>{selectedTask?.description}</span>
                            <div className="mt-2 flex justify-between text-sm text-gray-500">
                                <span>{(selectedTask?.time)}</span>
                                <span>{selectedTask?.frequency}</span>
                                <span>Priority: {selectedTask?.priority}</span>
                                {/*<span>{selectedTask?.incomingDate.toLocaleDateString()}</span>*/}
                            </div>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
                <Dialog open={isAddingTask} onOpenChange={setIsAddingTask}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Task</DialogTitle>
                        </DialogHeader>
                        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="title" className="text-right">
                                    Title
                                </Label>
                                <Input
                                    id="title" name="title" required
                                    value={data.title || null}
                                    placeholder="Enter task title"
                                    onChange={(e) => setData({...data, title: e.target.value})}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="text-right">
                                    Content
                                </Label>
                                <Input
                                    id="description" name="description" required
                                    value={data.description || null}
                                    placeholder="Enter task content"
                                    onChange={(e) => setData({...data, description: e.target.value})}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="time" className="text-right">
                                    Time
                                </Label>
                                <Input
                                    id="time" name="time"
                                    type="time"
                                    value={data.time}
                                    onChange={(e) => setData({...data, time: e.target.value})}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="frequency" className="text-right">
                                    Frequency
                                </Label>
                                <Select id="frequency" name="frequency" value={data.frequency ?? null}
                                        onValueChange={e => setData({...data, frequency: e})}>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select frequency"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="once">Once</SelectItem>
                                        <SelectItem value="daily">Daily</SelectItem>
                                        <SelectItem value="weekly">Weekly</SelectItem>
                                        <SelectItem value="monthly">Monthly</SelectItem>
                                        <SelectItem value="yearly">Yearly</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="priority" className="text-right">
                                    Priority
                                </Label>
                                <Select id="priority" name="priority" value={data.priority ?? null}
                                        onValueChange={e => setData({...data, priority: e})}>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select priority"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="low">Low</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="high">High</SelectItem>
                                        <SelectItem value="extreme">Extreme</SelectItem>

                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="incomingDate" className="text-right">
                                    End Date
                                </Label>
                                <Input
                                    id="end_date" name="end_date"
                                    type="date"
                                    className="col-span-3"
                                    value={data.end_date}
                                    onChange={e => setData({...data, [e.target.name]: e.target.value})}
                                />
                            </div>
                        </form>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsAddingTask(false)}>Cancel</Button>
                            <Button onClick={handleSubmit}>Add Task</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </>

    )

}

Tasks.layout = page => <AppLayout children={page}/>

export default Tasks;
