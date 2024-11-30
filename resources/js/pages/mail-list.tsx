import { ComponentProps } from "react"
import { formatDistanceToNow } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Mail {
    id: string
    name: string
    subject: string
    text: string
    date: Date
    read: boolean
    labels: string[]
}

interface MailListProps extends ComponentProps<"div"> {
    mails: Mail[]
}

export function MailList({ mails, ...props }: MailListProps) {
    return (
        <ScrollArea className="h-screen">
            <div className="flex flex-col gap-2 p-4 pt-0" {...props}>
                {mails.map((mail) => (
                    <div
                        key={mail.id}
                        className="flex flex-col gap-2 rounded-lg border p-4 hover:bg-muted/50"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="grid gap-1">
                                <div className="font-semibold">{mail.name}</div>
                                <div className="line-clamp-1 text-sm font-medium">
                                    {mail.subject}
                                </div>
                                <div className="line-clamp-2 text-sm text-muted-foreground">
                                    {mail.text}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="text-sm text-muted-foreground">
                                    {formatDistanceToNow(mail.date, { addSuffix: true })}
                                </div>
                            </div>
                        </div>
                        {mail.labels.length > 0 && (
                            <div className="flex items-center gap-2">
                                {mail.labels.map((label) => (
                                    <Badge key={label} variant="secondary">
                                        {label}
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </ScrollArea>
    )
}

