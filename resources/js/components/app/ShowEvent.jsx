import React, {useMemo, useState} from 'react';
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import {RainbowButton} from "@/components/ui/rainbow-button"
import {usePage} from "@inertiajs/react"
import {ArrowLeftToLine, LogIn, TagIcon, Trash, Verified} from "lucide-react"
import {toast} from "sonner"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

const ShowEvent = ({event = null, setEvent, setEvents}) => {

    event.participants ??= undefined
    const {user} = usePage().props
    const data = {event: event.id, user: user.id}

    const [loading, setLoading] = useState(false)
    const [joined, setJoined] = useState(() => event.participants.some(par => par.id === user.id))

    const [joinedCount, setJoinedCount] = useState(event.participants.length)

    const handleJoin = async () => {
        setLoading(true)
        try {
            const res = await axios.patch(route('events.join', data))
            setJoined(true)
            setJoinedCount(pre => pre + 1)
            toast.success("You have joined this event")
            setEvents(pre => {
                const updatedEvents = pre.data.map(ev => ev.id === res.data.event.id ? res.data.event : ev)
                return {...pre, data: updatedEvents}
            })
        } catch (e) {
            toast.error(e.response.data.message)
            if (e.response.data.status === 'joined') {
                setJoined(true)
            }
        }
        setLoading(false)
    }

    const handleUnJoin = async () => {
        setLoading(true)
        try {
            const res = await axios.patch(route('events.leave', data))
            setJoined(false)
            setJoinedCount(pre => pre - 1)
            toast.info("You have left this event")
            setEvents(pre => {
                const updatedEvents = pre.data.map(ev => ev.id === res.data.event.id ? res.data.event : ev)
                return {...pre, data: updatedEvents}
            })
        } catch (e) {
            toast.error(e.response.data.message)
        }
        setLoading(false)
    }

    return (
        <Dialog open={event} onOpenChange={() => setEvent(null)}>
            <DialogContent className="max-w-task-dialog p-0 dark:bg-slate-800 bg-gray-100">
                <DialogHeader className="hidden">
                    <DialogTitle className="hidden"/>
                    <DialogDescription className="hidden"/>
                    <span className="font-bold tracking-tight font-inter mx-auto text-2xl line-clamp-1 px-3 overflow-hidden">{event.id}{event?.title}</span>
                </DialogHeader>
                <div className="size-full bg-white dark:bg-slate-800 flex flex-col gap-2 overflow-hidden shadow-2xl rounded-lg p-4">
                    <div className="flex flex-row justify-between tracking-tight pr-10">
                        <div className="flex items-center space-x-2">
                            <a target="_blank" rel="noreferrer">
                                <img title="Profile picture of Dillion" alt="dillionverma" height="48" width="48" src={event?.author?.image ? `/storage/app/avatars/${event?.author?.image}` : "https://twitter.com/dillionverma/status/1678577280489234432"}
                                     className="overflow-hidden rounded-full border border-transparent"/>
                            </a>
                            <div>
                                <a target="_blank" rel="noreferrer" className="flex items-center whitespace-nowrap font-semibold">{event?.author?.name || "Vincent"}
                                    <svg aria-label="Verified Account" viewBox="0 0 24 24" className="ml-1 inline size-4 text-blue-500">
                                        <g fill="currentColor">
                                            <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path>
                                        </g>
                                    </svg>
                                </a>
                                <div className="flex items-center space-x-1">
                                    <a target="_blank" rel="noreferrer" className="text-sm text-gray-500 transition-all duration-75">{event?.author?.email || "@developer"}</a>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row gap-3 items-start">
                            <a href="/" rel="noreferrer"><span className="sr-only hover:scale-105">Link to tweet</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                    <path fill="#57beff" d="M12 12h7c-.53 4.11-3.28 7.78-7 8.92zH5V6.3l7-3.11M12 1L3 5v6c0 5.55 3.84 10.73 9 12c5.16-1.27 9-6.45 9-12V5z"/>
                                </svg>
                            </a>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="hover:text-red-600 hover:scale-105 active:scale-95 transition-all duration-300 h-fit focus:border-none" autoFocus={false}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="1em" viewBox="0 0 20 20">
                                        <g fill="currentColor">
                                            <circle cx={5} cy={10} r={4}></circle>
                                            <circle cx={15} cy={10} r={4}></circle>
                                            <circle cx={25} cy={10} r={4}></circle>
                                        </g>
                                    </svg>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="dark:bg-slate-600 w-56">
                                    <DropdownMenuGroup>
                                        {joined ?
                                            <DropdownMenuItem onClick={handleUnJoin}>
                                                <ArrowLeftToLine/>
                                                Leave
                                            </DropdownMenuItem>
                                            : <DropdownMenuItem onClick={handleJoin}>
                                                <LogIn/>
                                                Join
                                            </DropdownMenuItem>
                                        }
                                        <DropdownMenuItem>
                                            <TagIcon/>
                                            Edit Label
                                        </DropdownMenuItem>
                                        {event.author_id === user.id &&
                                            <DropdownMenuItem>
                                                <Trash color="red"/>
                                                Delete
                                            </DropdownMenuItem>
                                        }
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>

                        </div>
                    </div>
                    <div className="leading-normal text-center tracking-tight font-semibold font-inter text-2xl mx-auto">
                        {event.title}
                    </div>
                    <div className="break-words leading-normal tracking-tighter scroll-smooth">
                        <span className="text-md font-normal">{event.description || "Description"}</span>
                    </div>
                    <div className={`relative flex transform-gpu snap-x snap-mandatory gap-4 overflow-x-auto`}>
                        <div className="shrink-0 snap-center sm:w-2"></div>
                        {event && JSON.parse(event.images).map((img, index) =>
                            <img src={`/storage/app/events/${img}`} key={index}
                                 alt="Image" className="h-64 w-5/6 shrink-0 snap-center snap-always rounded-xl border object-cover shadow-sm"/>)}
                        <div className="shrink-0 snap-center sm:w-2"></div>
                    </div>
                    <div className="relative flex mt-2 justify-between">
                        <div className="p-2 font-semibold tracking-tight font-inter text-muted-foreground">
                            Joined: {joinedCount}
                        </div>
                        {joined ? <div className="inline-flex items-center justify-center text-green-800 gap-3">
                                <Verified color="green"/> You have joined this event
                            </div> :
                            <RainbowButton onClick={() => handleJoin()} disabled={loading}>Join now</RainbowButton>}

                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ShowEvent;
