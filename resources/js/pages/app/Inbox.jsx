import React from 'react';

import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { MailList } from "../mail-list"
import AppLayout from "@/layouts/AppLayout"
import IntroLogo from "@/components/layers/IntroLogo"

const MAILS = [
    {
        id: "1",
        name: "William Smith",
        subject: "Meeting Tomorrow",
        text: "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success.",
        date: new Date("2023-10-22T09:00:00"),
        read: false,
        labels: ["meeting", "work", "important"],
    },
    {
        id: "2",
        name: "Alice Smith",
        subject: "Re: Project Update",
        text: "Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive. The team has done a fantastic job...",
        date: new Date("2023-10-21T15:00:00"),
        read: true,
        labels: ["work", "important"],
    },
    {
        id: "3",
        name: "Bob Johnson",
        subject: "Weekend Plans",
        text: "Any plans for the weekend? I was thinking of going hiking in the nearby mountains. It's been a while since we had some outdoor fun. If you're...",
        date: new Date("2023-10-20T10:30:00"),
        read: true,
        labels: ["personal"],
    },
    {
        id: "4",
        name: "Emily Davis",
        subject: "Re: Question about Budget",
        text: "I have a question about the budget for the upcoming project. It seems like there's a discrepancy in the allocation of resources. I've reviewed the...",
        date: new Date("2023-10-19T14:15:00"),
        read: true,
        labels: ["work", "budget"],
    },
]

const Inbox = () => {
    return (
        <>
            <IntroLogo srcIcon="/storage/pages/email.svg"/>
        <div className="flex h-screen pt-10 bg-white overflow-hidden">
            <main className="flex-1">
                <div className="flex flex-col">
                    <div className="p-4">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"/>
                            <Input placeholder="Search" className="pl-8"/>
                        </div>
                    </div>
                    <MailList mails={MAILS}/>
                </div>
            </main>
        </div>

        </>
    )
}

Inbox.layout = page => <AppLayout children={page} />
export default Inbox
