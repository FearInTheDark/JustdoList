import React, {useState} from 'react';
import AppLayout from "@/layouts/AppLayout";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {ChevronDown, ChevronUp, GripVertical, Plus} from "lucide-react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
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
import IntroLogo from "@/components/IntroLogo";

const Tasks = ({taskss, tasks_count}) => {
    const [layout, setLayout] = useState('list')
    const [tasks, setTasks] = useState(taskss)
    const [selectedTask, setSelectedTask] = useState(null)
    const [isAddingTask, setIsAddingTask] = useState(false)
    const [newTask, setNewTask] = useState({})
    const [sortConfig, setSortConfig] = useState(null)

    const toggleTaskCompletion = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? {...task, completed: !task.completed} : task
        ))
    }

    const onDragEnd = (result) => {
        if (!result.destination) return

        const newTasks = Array.from(tasks)
        const [reorderedItem] = newTasks.splice(result.source.index, 1)
        newTasks.splice(result.destination.index, 0, reorderedItem)

        setTasks(newTasks)
    }

    const handleAddTask = () => {
        if (newTask.title) {
            const task = {
                id: Date.now().toString(),
                title: newTask.title,
                description: newTask.description || '',
                frequency: newTask.frequency || '',
                due_date: newTask.due_date || new Date(),
                completed: false,
                priority: newTask.priority || 3,
            }
            setTasks([...tasks, task])
            setIsAddingTask(false)
            setNewTask({})
        }
    }

    const handleSort = (key) => {
        let direction = 'asc'
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc'
        }
        setSortConfig({key, direction})
    }

    const sortedTasks = [...tasks].sort((a, b) => {
        if (!sortConfig) return 0
        const {key, direction} = sortConfig
        if (a[key] < b[key]) return direction === 'asc' ? -1 : 1
        if (a[key] > b[key]) return direction === 'asc' ? 1 : -1
        return 0
    })

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

                        {['title', 'incomingDate', 'priority'].map((key) => (
                            <Button
                                key={key}
                                onClick={() => handleSort(key)}
                                variant="outline"
                                className="capitalize"
                            >
                                {key}
                                {sortConfig?.key === key && (sortConfig.direction === 'asc'
                                    ? <ChevronUp className="ml-2 h-4 w-4"/>
                                    : <ChevronDown className="ml-2 h-4 w-4"/>)}
                            </Button>
                        ))}
                        </div>
                        <div className="flex justify-center items-center">
                            <Label className="flex items-center space-x-2 py-2 px-4 border rounded-md justify-between gap-1 bg-background shadow-sm" bordered>
                                <Checkbox id="finished" name="finished" onChange={() => {}}/>
                                <span>Finished</span>
                            </Label>
                        </div>
                    </div>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="tasks" direction={layout === 'list' ? 'vertical' : 'horizontal'}>
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className={`${layout === 'list' ? 'space-y-4' : ''}
                                            ${layout === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : ''}
                                            ${layout === 'pinterest' ? 'columns-1 md:columns-2 lg:columns-3 gap-4' : ''}`}>
                                    {sortedTasks.map((task, index) => (
                                        <Draggable key={task.id} draggableId={task.title} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    className={`bg-white dark:bg-gray-800 cursor-pointer rounded-lg shadow-md p-4 transition-all duration-300 ease-in-out hover:shadow-lg ${layout === 'pinterest' ? 'mb-4 break-inside-avoid' : ''}`}
                                                    onClick={() => setSelectedTask(task)}
                                                >
                                                    <div className="flex items-start">
                                                        <div className="inline-flex flex-col justify-between h-full gap-4">
                                                            <Checkbox
                                                                id={`task-${task.id}`}
                                                                checked={task.completed}
                                                                onCheckedChange={() => toggleTaskCompletion(task.id)}
                                                                className="mt-1"
                                                                onClick={(e) => e.stopPropagation()}
                                                            />
                                                            <div {...provided.dragHandleProps} className="mr-2">
                                                                <GripVertical className="h-5 w-5 text-gray-400"/>
                                                            </div>
                                                        </div>
                                                        <div className="ml-3 flex-1">
                                                            <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-white'}`}>
                                                                {task.title}
                                                            </h3>
                                                            <span className={`text-sm ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-600 dark:text-gray-300'}`}>
                                                            {task.description}
                                                        </span>
                                                            <div className="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
                                                                <span>{task.time}</span>
                                                                <span>{task.frequency}</span>
                                                                <span>Priority: {task.priority}</span>
                                                                <span>{new Date(task.due_date).toLocaleString()}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
                <Dialog open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{selectedTask?.title}</DialogTitle>
                            <DialogDescription/>
                            <span>{selectedTask?.description}</span>
                            <div className="mt-2 flex justify-between text-sm text-gray-500">
                                <span>{new Date(selectedTask?.due_date).toLocaleString()}</span>
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
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="title" className="text-right">
                                    Title
                                </Label>
                                <Input
                                    id="title"
                                    value={newTask.title || ''}
                                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="text-right">
                                    Content
                                </Label>
                                <Input
                                    id="description"
                                    value={newTask.description || ''}
                                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="time" className="text-right">
                                    Time
                                </Label>
                                <Input
                                    id="time"
                                    type="date"
                                    // value={newTask.due_time || ''}
                                    onChange={(e) => setNewTask({...newTask, due_time: e.target.value})}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="frequency" className="text-right">
                                    Frequency
                                </Label>
                                <Input
                                    id="frequency"
                                    value={newTask.frequency || ''}
                                    onChange={(e) => setNewTask({...newTask, frequency: e.target.value})}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="priority" className="text-right">
                                    Priority
                                </Label>
                                <Select
                                    value={newTask.priority?.toString()}
                                    onValueChange={(value) => setNewTask({...newTask, priority: parseInt(value)})}
                                >
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select priority"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">High</SelectItem>
                                        <SelectItem value="2">Medium</SelectItem>
                                        <SelectItem value="3">Low</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="incomingDate" className="text-right">
                                    Incoming Date
                                </Label>
                                <Input
                                    id="incomingDate"
                                    type="date"
                                    // value={newTask.due_date ? newTask.due_date.toISOString().split('T')[0] : ''}
                                    onChange={(e) => setNewTask({...newTask, incomingDate: new Date(e.target.value)})}
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleAddTask}>Add Task</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </>

    )

}

Tasks.layout = page => <AppLayout children={page}/>

export default Tasks;
