import React, {lazy, Suspense, useState} from 'react';
import {Dialog, DialogContent} from "@/components/ui/dialog"
import {Badge} from "@/components/ui/badge"
import {useQuery} from "@tanstack/react-query"
import {Skeleton} from "@/components/ui/skeleton"
import {ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart"
import {Bar, BarChart, LabelList, XAxis, YAxis} from "recharts"
import {ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger} from "@/components/ui/context-menu"
import {Ellipsis, Pen, PencilIcon, PenIcon, Recycle, TrashIcon} from "lucide-react"
import {downloadImage} from "@/common/additional-functions"
import {Button} from "@/components/ui/button"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import {ReloadIcon} from "@radix-ui/react-icons"

const chartConfig = {
    task_count: {
        label: 'Task Count',
        color: '#4B5563',
    }
}

const Profile = ({open, setOpen, user}) => {
    const [img, setImg] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [bg] = useState(`/storage/app/events/event${Math.floor(Math.random() * 8) + 1}.jpg`)

    const {data, isLoading} = useQuery({
        queryKey: ['profile_summarize'],
        queryFn: async () => {
            const {data} = await axios.get(route('summarize-last-week'))
            return data
        },
        refetchOnWindowFocus: false,
    })

    const LazyLayer = lazy(() => import("@/components/layers/image-present"))
    const LazyDeleteConfirmation = lazy(() => import("@/components/auth/delete-confirmation"))

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-task-dialog [max-height:_calc(80%)] overflow-hidden overflow-y-auto scrollbar-hide p-0 dark:bg-slate-800 bg-gray-100">
                <div className="flex flex-col size-full gap-1">
                    <div className="relative flex flex-col w-full rounded-sm overflow-hidden">
                        <div className="relative w-full p-1 rounded-sm overflow-hidden cursor-pointer" onClick={() => setImg(bg)}>
                            <img src={bg} alt="BG" className="max-h-[200px] w-full object-cover shadow-md rounded-t-sm"/>
                        </div>
                        <ContextMenu>
                            <ContextMenuTrigger className="absolute left-6 transform translate-y-[150px] cursor-pointer" onClick={() => setImg(`/storage/app/avatars/${user.image ?? 'default.jpg'}`)}>
                                <img title={`Profile picture of ${user.name}`} alt="dillionverma" height="100" width="100" src={`/storage/app/avatars/${user.image ?? 'default.jpg'}`}
                                     className="overflow-hidden rounded-full border-2 border-white p-0.5 shadow-sm "/>
                            </ContextMenuTrigger>
                            <ContextMenuContent className="w-64">
                                <ContextMenuItem inset onClick={() => setImg(`/storage/app/avatars/${user.image ?? 'default.jpg'}`)}>View</ContextMenuItem>
                                <ContextMenuItem inset>Change avatar</ContextMenuItem>
                                <ContextMenuItem inset onClick={() => downloadImage(`/storage/app/avatars/${user.image ?? 'default.jpg'}`, 'profile_avatar.jpg')}>
                                    Download
                                </ContextMenuItem>
                                <ContextMenuItem inset>Delete</ContextMenuItem>
                            </ContextMenuContent>
                        </ContextMenu>

                        <div className="relative w-full mt-14 px-7">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center group">
                                    <span className=" text-2xl font-semibold font-inter">{user.name}</span>

                                    <Badge variant="admin" className="ml-2 gap-1 flex-shrink-0">
                                        <img src="/storage/user/admin1.svg" alt=""/>
                                    </Badge>
                                    <Badge variant="admin" className="ml-2 gap-1 flex-shrink-0">
                                        <img src="/storage/user/dev.svg" alt=""/>
                                    </Badge>
                                    <Badge variant="master" className="ml-2 gap-1 flex-shrink-0">
                                        <img src="/storage/user/master.svg" alt="" className="text-yellow-400"/>
                                    </Badge>
                                    <PencilIcon className="size-4 ml-2 hidden group-hover:block transform transition-all duration-300 cursor-pointer"/>
                                </div>
                                <div className="flex gap-2 flex-wrap">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant='outline'>
                                                <Ellipsis/>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent side="bottom" className="w-64">
                                            <DropdownMenuItem onClick={() => setDeleting(pre => !pre)}>
                                                <TrashIcon/> Delete account
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <Button variant="outline" onClick={() => {}}>
                                        <ReloadIcon/>
                                    </Button>
                                </div>
                            </div>
                            <span className="text-muted-foreground font-thin italic">{user.email}</span>
                            <div className="flex flex-row gap-2 pt-2 flex-wrap">
                                {['admin', 'developer', 'contributor'].map(e => (
                                    <div className="px-4 py-0.5 bg-blue-300/90 rounded-md" key={e}>
                                        <span className="capitalize font-semibold text-gray-900">
                                            {e}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col w-full mt-6 gap-2 p-2 rounded-md">
                                <span className="text-lg font-semibold font-tiktok text-gray-600 dark:text-gray-400">Submitted in the last 7 days</span>
                                {isLoading ? <Skeleton className="w-full h-[200px] rounded-md"/> :

                                    <ChartContainer config={chartConfig} className="w-[90%] mx-auto ">
                                        <BarChart
                                            accessibilityLayer
                                            data={data}
                                            layout="vertical"
                                            margin={{
                                                left: -20,
                                            }}
                                        >
                                            <XAxis type="number" dataKey="task_count" hide/>
                                            <YAxis
                                                dataKey="day_of_week"
                                                type="category"
                                                tickLine={false}
                                                tickMargin={10}
                                                axisLine={false}
                                                tickFormatter={(value) => value.slice(0, 3)}
                                            />
                                            <ChartTooltip
                                                cursor={false}
                                                content={<ChartTooltipContent hideLabel/>}
                                            />
                                            <Bar dataKey="task_count" fill="#2a9d90" radius={5}>
                                                <LabelList
                                                    dataKey="task_count"
                                                    position="right"
                                                    offset={8}
                                                    className="fill-foreground"
                                                    fontSize={12}
                                                />

                                            </Bar>
                                        </BarChart>
                                    </ChartContainer>
                                }
                            </div>
                            <div className="my-4 w-[75%] mx-auto border-t-2 border-gray-800"/>
                        </div>
                    </div>
                </div>
                <Suspense fallback={<Skeleton className={"w-[200px] h-[100px]"}/>}>
                    <LazyLayer img={img} setOpen={setImg}/>
                </Suspense>
                <Suspense fallback={<Skeleton className={"w-[200px] h-[100px]"}/>}>
                    <LazyDeleteConfirmation open={deleting} setOpen={setDeleting}/>
                </Suspense>
            </DialogContent>
        </Dialog>
    );
};

export default Profile;
