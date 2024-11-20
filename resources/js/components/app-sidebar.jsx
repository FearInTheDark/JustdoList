import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarSeparator
} from "@/components/ui/sidebar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
    Bot,
    Calendar,
    ChartNoAxesGantt,
    ChevronDown,
    ChevronsUpDown,
    CircleEllipsis,
    Command,
    CreditCardIcon,
    FileBox,
    Github,
    Home,
    Inbox,
    LogOut,
    Mail,
    MessageCircleMore,
    PanelsTopLeft,
    Search,
    Settings,
    UserCog,
    UserRoundPen,
    UserRoundPlus,
    UsersRound
} from "lucide-react"
import React from "react";
import {Link, usePage} from "@inertiajs/react";
import {useRoute} from "ziggy-js";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {BorderBeam} from "@/components/ui/border-beam";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import DateCalendar from "@/components/sidebar/date-calendar";

// Menu items.
const items = [
    {
        title: "Home",
        url: "/",
        route: 'index',
        icon: Home,
    },
    {
        title: "Inbox",
        url: "#",
        route: 'inbox',
        icon: Inbox,
    },
    {
        title: "Incoming",
        url: "/tasks",
        route: 'tasks.index',
        icon: ChartNoAxesGantt,
        subs: [
            {
                title: "Overview",
                url: "/tasks",
                route: 'tasks.index',
                icon: PanelsTopLeft,
            },
            {
                title: "Today",
                url: "/tasks/today",
                route: 'tasks.today',
                icon: () => <DateCalendar/>,
            },
            {
                title: "This Week",
                url: "/tasks/week",
                route: 'tasks.week',
                icon: () => (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M13.289 18.23q-.349 0-.598-.248q-.249-.25-.249-.597V6.615q0-.348.25-.597q.249-.249.597-.249h1.759q.348 0 .597.25t.25.597v10.769q0 .348-.25.597t-.597.249zm-4.337 0q-.348 0-.597-.248t-.25-.597V6.615q0-.348.25-.597t.597-.249h1.76q.348 0 .597.25q.249.248.249.597v10.769q0 .348-.25.597q-.248.249-.596.249zm-4.337 0q-.367 0-.606-.239q-.24-.239-.24-.606V6.615q0-.367.24-.606q.239-.24.606-.24h1.76q.348 0 .597.25q.25.248.25.596v10.77q0 .348-.25.597q-.249.249-.597.249zm13.01 0q-.348 0-.597-.248q-.25-.25-.25-.597V6.615q0-.348.25-.597q.249-.249.597-.249h1.76q.367 0 .606.24q.24.239.24.607v10.769q0 .367-.24.606q-.239.24-.606.24z"></path>
                </svg>),
            },
            {
                title: "This Month",
                url: "/tasks/month",
                route: 'tasks.month',
                icon: () => (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M3 10.5V6q0-.425.288-.712T4 5h3.325q.425 0 .713.288T8.325 6v4.5q0 .425-.287.713t-.713.287H4q-.425 0-.712-.288T3 10.5m7.325 1q-.425 0-.712-.288t-.288-.712V6q0-.425.288-.712T10.325 5h3.35q.425 0 .713.288t.287.712v4.5q0 .425-.288.713t-.712.287zm6.35 0q-.425 0-.712-.288t-.288-.712V6q0-.425.288-.712T16.675 5H20q.425 0 .713.288T21 6v4.5q0 .425-.288.713T20 11.5zM7.325 19H4q-.425 0-.712-.288T3 18v-4.5q0-.425.288-.712T4 12.5h3.325q.425 0 .713.288t.287.712V18q0 .425-.287.713T7.325 19m3 0q-.425 0-.712-.288T9.324 18v-4.5q0-.425.288-.712t.712-.288h3.35q.425 0 .713.288t.287.712V18q0 .425-.288.713t-.712.287zm6.35 0q-.425 0-.712-.288T15.675 18v-4.5q0-.425.288-.712t.712-.288H20q.425 0 .713.288T21 13.5V18q0 .425-.288.713T20 19z"></path>
                </svg>),
            },
        ]
    },
    {
        title: "Calendar",
        url: "#",
        route: 'calendar',
        icon: Calendar,
    },
    {
        title: "Search",
        url: "#",
        route: 'search',
        icon: Search,
    },
    {
        title: "Settings",
        url: "/register",
        route: 'register',
        icon: Settings,
    },
    {
        title: "Logout",
        url: 'logout',
        method: 'post',
        icon: LogOut,
    },
    {
        title: "File Upload",
        url: '/file',
        icon: FileBox
    }
]

export function AppSidebar() {
    const {props} = usePage()
    const route = useRoute()
    const avatarURL = props.user.image ? "/storage/uploads/" + props.user.image :
        "https://ui-avatars.com/api/?name=" + props.user.name + "&background=random&color=fff"
    return (
        <Sidebar
            className="SideBar"
            collapsible="offcanvas"
            side="left"
            variant="inset"
            style={{opacity: 0.8}}
        >

            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    Select Workspace
                                    <ChevronDown className="ml-auto"/>
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                                <DropdownMenuItem>
                                    <span>Acme Inc</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>Acme Corp.</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarSeparator/>
            <SidebarContent>
                <SidebarGroup/>
                <SidebarGroupLabel>Application</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {items.map((item, index) => {
                            return item.subs ?
                                <Collapsible defaultOpen={false} className="group/collapsible" key={index}>
                                    <SidebarMenuItem key={item.title}>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton>
                                                <item.icon/>
                                                {item.title}
                                                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"/>
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {item.subs.map(sub => (
                                                    <SidebarMenuItem key={sub.title}>
                                                        <SidebarMenuButton asChild isActive={route().current(sub.route)}>
                                                            <Link href={sub.url} method={sub.method || "get"} as="button">
                                                                <sub.icon/>
                                                                <span>{sub.title}</span>
                                                            </Link>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                                : <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={route().current(item.route)}>
                                        <Link
                                            href={item.url}
                                            method={item.method || "get"}
                                            as="button">
                                            <item.icon/>
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                        })}
                        {/*<RainbowButton className="mt-2">Click Me</RainbowButton>*/}
                    </SidebarMenu>
                </SidebarGroupContent>
                {/*<SidebarGroup/> */}
                <SidebarGroupLabel>Addition</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link>
                                    <Home/>
                                    <span>Home</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarContent>
            <SidebarFooter>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="w-full flex rounded-md p-[.5px] dark:hover:bg-sidebar-accent hover:bg-sidebar-accent transition-all items-center gap-1">
                            <Avatar className="rounded-md flex-grow-0 ml-0.5">
                                <AvatarImage src={avatarURL}/>
                                <BorderBeam colorFrom="#000000" colorTo="#ffffff" size="100" borderWidth="1" duration={10}/>
                            </Avatar>
                            <div className="flex flex-col justify-between p-1 items-start w-full overflow-hidden">
                                <div className="text-sm font-inter inline-flex items-center gap-0.5 overflow-hidden">
                                    <span className="font-semibold text-ellipsis">{props.user.name}</span>
                                    <div className="badges flex overflow-hidden">

                                        <Badge variant="admin" className="gap-1 flex-shrink-0">
                                            <Tooltip>
                                                <TooltipTrigger asChild><img src="/storage/user/admin1.svg" alt=""/></TooltipTrigger>
                                                <TooltipContent>Admin</TooltipContent>
                                            </Tooltip>
                                            {/*Admin*/}
                                        </Badge>
                                        <Badge variant="admin" className="gap-1 flex-shrink-0">
                                            <Tooltip>
                                                <TooltipTrigger asChild><img src="/storage/user/dev.svg" alt=""/></TooltipTrigger>
                                                <TooltipContent>Developer</TooltipContent>
                                            </Tooltip>
                                        </Badge>
                                        <Badge variant="master" className="gap-1 flex-shrink-0">
                                            <Tooltip>
                                                <TooltipTrigger asChild><img src="/storage/user/master.svg" alt="" className="text-yellow-400"/></TooltipTrigger>
                                                <TooltipContent>Master</TooltipContent>
                                            </Tooltip>
                                        </Badge>
                                    </div>

                                </div>
                                <span className="text-xs font-inter">
                                    {props.user.email}
                                </span>
                            </div>
                            <div className="flex items-center h-full justify-center flex-grow-0 pr-[2px]">
                                <ChevronsUpDown className="w-[20px]"/>
                            </div>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" side="right">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <UserRoundPen/>
                                Profile
                                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <CreditCardIcon/>
                                Billing
                                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Settings/>
                                Settings
                                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Command/>
                                Keyboard shortcuts
                                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator/>
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <UsersRound/>
                                Team
                            </DropdownMenuItem>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                    <UserRoundPlus/>
                                    Invite users
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuItem>
                                            <Mail/>
                                            Email
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <MessageCircleMore/>
                                            Message
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator/>
                                        <DropdownMenuItem>
                                            <CircleEllipsis/>
                                            More...
                                        </DropdownMenuItem>
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                            <DropdownMenuItem>
                                <UserCog/>
                                New Team
                                <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem><Github/>GitHub</DropdownMenuItem>
                        <DropdownMenuItem><Bot/>Support</DropdownMenuItem>
                        <DropdownMenuItem disabled>API</DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>
                            <LogOut/>
                            <Link href={route('logout')} method="post" as="button">Log out</Link>
                            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
