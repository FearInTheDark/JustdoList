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
    SidebarMenuItem, SidebarSeparator
} from "@/components/ui/sidebar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut, DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
    Bot,
    Calendar,
    ChartNoAxesGantt,
    ChevronDown,
    ChevronsUpDown, CircleEllipsis, Command, CreditCard, CreditCardIcon, Github,
    Home,
    Inbox,
    LogOut, Mail, MessageCircleMore,
    Search,
    Settings, UserCog, UserRoundPen, UserRoundPlus, UsersRound
} from "lucide-react"
import {RainbowButton} from "@/components/ui/rainbow-button";
import React from "react";
import {Link, usePage} from "@inertiajs/react";
import {useRoute} from "ziggy-js";
import {Avatar, AvatarImage} from "@/components/ui/avatar";

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
    }
]

export function AppSidebar() {
    const {props} = usePage()
    const route = useRoute()
    return (
        <Sidebar
            className="SideBar"
            collapsible="offcanvas"
            side="left"
            variant="inset"
            style={{ opacity: 0.8 }}
        >
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    Select Workspace
                                    <ChevronDown className="ml-auto" />
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
            <SidebarSeparator />
            <SidebarContent>
                <SidebarGroup />
                <SidebarGroupLabel>Application</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={route().current(item.route)}
                                >
                                    <Link
                                        href={item.url}
                                        method={item.method || "get"}
                                        as="button"
                                    >
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                        <RainbowButton className="mt-2">Click Me</RainbowButton>
                    </SidebarMenu>
                </SidebarGroupContent>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="w-full flex rounded-md p-[.5px] dark:hover:bg-sidebar-accent hover:bg-sidebar-accent transition-all items-center gap-1">
                            <Avatar className="rounded-md flex-grow-0">
                                <AvatarImage src="/storage/avatars/man1.png" />
                            </Avatar>
                            <div className="flex flex-col justify-between p-1 items-start w-full">
                                <span className="text-sm font-inter">
                                    {props.user.name}
                                </span>
                                <span className="text-xs font-inter">
                                    {props.user.email}
                                </span>
                            </div>
                            <div className="flex items-center h-full justify-center flex-grow-0 pr-[2px]">
                                <ChevronsUpDown className="w-[20px]" />
                            </div>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" side="right">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
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
                        <DropdownMenuSeparator />
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
                                        <DropdownMenuSeparator />
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
                        <DropdownMenuSeparator />
                        <DropdownMenuItem><Github/>GitHub</DropdownMenuItem>
                        <DropdownMenuItem><Bot/>Support</DropdownMenuItem>
                        <DropdownMenuItem disabled>API</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <LogOut/>
                            <Link href={route('logout')} method="post">Log out</Link>
                            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
