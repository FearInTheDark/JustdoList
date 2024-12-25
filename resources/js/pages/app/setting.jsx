import React, {useRef, useState} from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import {
    AlertCircle, Github, Globe,
    Info,
    KeyRound,
    Lock,
    LockKeyhole, Mail,
    Paintbrush,
    Settings,
    Shield,
    Smartphone,
    Star, Twitter,
    Upload,
    User
} from "lucide-react"
import {SidebarMenu, SidebarMenuButton, SidebarMenuItem} from "@/components/ui/sidebar"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Switch} from "@/components/ui/switch"
import {Label} from "@/components/ui/label"
import {toast} from "sonner"
import {useDropzone} from "react-dropzone"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Separator} from "@/components/ui/separator"
import AppIcon from "@/components/app/app-icon"
import Profile from "@/components/app/settings/Profile"
import General from "@/components/app/settings/General"
import Security from "@/components/app/settings/Security"
import Appearance from "@/components/app/settings/Appearance"
import About from "@/components/app/settings/About"

const tabs = [
    {
        title: "General",
        content: "General settings",
        icon: <Settings/>,
        action: (user, setUser) => <General user={user} setUser={setUser}/>
    },
    {
        title: "Profile",
        content: "Profile settings",
        icon: <User/>,
        action: (user, setUser) => <Profile user={user} setUser={setUser}/>
    },
    {
        title: "Security",
        content: "Security settings",
        icon: <LockKeyhole/>,
        action: (user, setUser) => <Security user={user} setUser={setUser}/>
    },
    {
        title: "Appearance",
        content: "Appearance settings",
        icon: <Paintbrush/>,
        action: (user, setUser) => Appearance(user, setUser)

    },
    {
        title: "About",
        content: "About settings",
        icon: <Info/>,
        action: (user, setUser) => About(user, setUser)
    }
]

const Setting = ({open, setOpen, user}) => {
    const [currentTab, setCurrentTab] = useState(tabs[0].title)
    const [currentUser, setCurrentUser] = useState(user)
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="p-3 rounded-md [max-width:min(54rem,80%)] [max-height:90%] overflow-auto ">
                <DialogHeader className="hidden"/>
                <DialogDescription className="hidden"/>

                <div className="flex w-full gap-2">
                    <div className="left flex flex-col gap-3 bg-gray-50 dark:bg-gray-800 p-2 min-w-[200px] rounded-sm">
                        <span className="font-medium text-lg ml-2">Settings</span>
                        <SidebarMenu>
                            {tabs.map(e => (
                                <SidebarMenuItem key={e.title}>
                                    <SidebarMenuButton isActive={e.title === currentTab} onClick={() => setCurrentTab(e.title)}>
                                        {e.icon}
                                        <span>{e.title}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>))}
                        </SidebarMenu>

                    </div>
                    <div className="flex flex-1 p-2 rounded-sm overflow-auto scrollbar-hide">
                        {tabs.map(e => (
                            <div key={e.title} className={`${currentTab === e.title ? "block" : "hidden"} w-full`}>
                                <span className="px-6 font-medium w-full">{e.content}</span>
                                {e.action(currentUser, setCurrentUser)}
                            </div>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default Setting;
