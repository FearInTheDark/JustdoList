import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {useQuery, useQueryClient} from "@tanstack/react-query"
import {Checkbox} from "@/components/ui/checkbox"
import {Skeleton} from "@/components/ui/skeleton"
import {AlarmClock, CircleCheckBig, EllipsisIcon, Trash2Icon, X} from "lucide-react"
import TaskBadge from "@/common/task-badge"
import React, {lazy, Suspense, useCallback, useMemo, useState} from "react"
import {Input} from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {toast} from "sonner"
import debounce from "lodash.debounce"
import {MyPagination} from "@/components/MyPagination"
import {Button} from "@/components/ui/button"
import {ReloadIcon} from "@radix-ui/react-icons"

const TaskOfTable = () => {
    const queryClient = useQueryClient();
    const [searchValue, setSearchValue] = useState('')
    const [selectingTasks, setSelectingTasks] = useState([])
    const [selectedTask, setSelectedTask] = useState(null)
    const [page, setPage] = useState(1)

    const {data, isLoading} = useQuery({
        queryKey: ['tasks-table', searchValue, page],
        queryFn: async () => {
            const res = await axios.get(route('analytics-task.table', {searchValue, page}));
            return res.data
        },
        refetchOnWindowFocus: false,
        enabled: !!searchValue || searchValue === ''
    })

    let sortedTasks = useMemo(() => {
        if (data) {
            return data.data.sort((a, b) => a.id - b.id)
        }
    }, [data])

    const handleMassDelete = async () => {
        const res = await axios.delete(route('admin.mass-delete-tasks', {ids: selectingTasks}));
        if (res.status === 200) {
            toast.success("Tasks deleted successfully")
            await queryClient.invalidateQueries({
                queryKey: ['tasks-table', searchValue, page],
                exact: true
            })
        }
    }

    const handleChangeFrequency = async (taskId, newFrequency) => {
        const res = await axios.patch(route('tasks.update', taskId), {frequency: newFrequency});
        res.status === 200 && toast.success("Task updated successfully")

        queryClient.setQueryData(['tasks-table'], (oldData) => {
            if (!oldData) return;
            const updatedTasks = oldData.data.map((task) =>
                task.id === taskId ? {...task, frequency: newFrequency} : task
            );
            return {...oldData, data: updatedTasks};
        });
    }

    const handleChangePriority = async (taskId, newPriority) => {
        const res = await axios.patch(route('tasks.update', taskId), {priority: newPriority});
        res.status === 200 && toast.success("Task updated successfully")

        queryClient.setQueryData(['tasks-table'], (oldData) => {
            if (!oldData) return;
            const updatedTasks = oldData.data.map((task) =>
                task.id === taskId ? {...task, priority: newPriority} : task
            );
            return {...oldData, data: updatedTasks};
        });
    }

    const handleSearchChange = useCallback(
        debounce((value) => {
            setSearchValue(value)
        }, 1000), [])

    const LazyTaskDialog = lazy(() => import("@/components/app/TaskDialog"))

    const handleSingleDelete = async (taskId) => {
        const res = await axios.delete(route('tasks.destroy', taskId));
        if (res.status === 200) {
            toast.success("Task deleted successfully")
            await queryClient.invalidateQueries({
                queryKey: ['tasks-table', searchValue, page],
                exact: true
            })
        }
    }

    return (
        <div className="w-full bg-white dark:bg-inherit p-4 flex flex-col rounded-md gap-5 z-10">
            <h1 className="font-semibold tracking-tight text-xl"> Tasks Management </h1>
            <div className="flex justify-between items-center">
                <Input placeholder="Search tasks by title or description"
                       onChange={e => handleSearchChange(e.target.value)}
                       className="w-1/2"/>
                <div className="flex gap-2 items-center">
                    <Button variant="outline" onClick={handleMassDelete} disabled={selectingTasks.length === 0}>
                        <Trash2Icon/>
                    </Button>
                    <Button variant="outline" onClick={async () => await queryClient.invalidateQueries({
                        queryKey: ['tasks-table', searchValue, page],
                        exact: true
                    })}>
                        <ReloadIcon/>
                    </Button>
                </div>
            </div>
            <Suspense fallback={<div className="hidden"/>}>
                <LazyTaskDialog selectedTask={selectedTask} setSelectedTask={setSelectedTask} setTasks={() => {}}/>
            </Suspense>

            {isLoading ? <Skeleton className="rounded-md w-full h-[300px]"/> :
                <Table>
                    <TableCaption>A list of tasks.</TableCaption>
                    <TableHeader>
                        <TableRow className="font-medium [font-size:1rem] font-ui tracking-tight ">
                            <TableHead>
                                <Checkbox
                                    onCheckedChange={(e) => {setSelectingTasks(e ? sortedTasks.map((task) => task.id) : [])}}
                                />
                            </TableHead>
                            <TableHead>ID</TableHead>
                            <TableHead className="">Title</TableHead>
                            <TableHead className="  ">Description</TableHead>
                            <TableHead className="text-center">Frequency</TableHead>
                            <TableHead className="text-center">Priority</TableHead>
                            <TableHead className="text-center">Reminder</TableHead>
                            <TableHead className="text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedTasks.map((task) => (
                            <TableRow key={task.title}
                                      className={`min-h-[100px] ${selectingTasks.includes(task.id) && 'bg-gray-100 dark:bg-gray-800'}`}>
                                <TableCell>
                                    <Checkbox

                                        checked={selectingTasks.includes(task.id)}
                                        onCheckedChange={(e) => {
                                            if (e) {
                                                setSelectingTasks([...selectingTasks, task.id])
                                            } else {
                                                setSelectingTasks(selectingTasks.filter((id) => id !== task.id))
                                            }
                                        }}
                                    />
                                </TableCell>
                                <TableCell className="font-medium text-center">{task.id}</TableCell>
                                <TableCell className="font-medium text-left">
                                    <span onClick={() => setSelectedTask(task)}>
                                    {task.title}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    {task.description?.length > 50 ? task.description.slice(0, 50) + "..." : task.description}
                                </TableCell>
                                <TableCell className="capitalize text-center">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <TaskBadge variant={{role: 'frequency', value: task.frequency}}/>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-64">
                                            <DropdownMenuLabel>Frequencies</DropdownMenuLabel>
                                            <DropdownMenuSeparator/>
                                            {['once', 'daily', 'weekly', 'monthly', 'yearly'].map((frequency) => (
                                                <DropdownMenuItem key={frequency} onClick={() => handleChangeFrequency(task.id, frequency)}>
                                                    <TaskBadge variant={{role: 'frequency', value: frequency}}/>
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                                <TableCell className="capitalize text-center">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <TaskBadge variant={{role: 'priority', value: task.priority}}/>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-64">
                                            <DropdownMenuLabel>Priority</DropdownMenuLabel>
                                            <DropdownMenuSeparator/>
                                            {['low', 'medium', 'high', 'extreme'].map((priority) => (
                                                <DropdownMenuItem key={priority} onClick={() => handleChangePriority(task.id, priority)}>
                                                    <TaskBadge variant={{role: 'priority', value: priority}}/>
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                                <TableCell>
                                    <AlarmClock className={`mx-auto ${task.reminder ? 'text-green-600' : 'text-gray-200'} cursor-pointer`}/>
                                </TableCell>
                                <TableCell className="flex justify-center max-w-[100px]">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <EllipsisIcon/>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-64" side="left">
                                            <DropdownMenuLabel>Options</DropdownMenuLabel>
                                            <DropdownMenuSeparator/>
                                            {selectingTasks.includes(task.id) ?
                                                <DropdownMenuItem onClick={() => setSelectingTasks(selectingTasks.filter((id) => id !== task.id))}>
                                                    <X/>
                                                    Unselect
                                                </DropdownMenuItem>
                                                :
                                                <DropdownMenuItem onClick={() => setSelectingTasks([...selectingTasks, task.id])}>
                                                    <CircleCheckBig/>
                                                    Select
                                                </DropdownMenuItem>
                                            }
                                            <DropdownMenuItem onClick={() => handleSingleDelete(task.id)}>
                                                <Trash2Icon/>
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter className="bg-white dark:bg-inherit">
                        <TableRow>
                            <TableCell colSpan={8}>
                                <MyPagination links={data.links} action={setPage}/>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>}
        </div>

    )
}

export default TaskOfTable
