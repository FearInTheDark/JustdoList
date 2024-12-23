import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar"
import {AppSidebar} from "@/components/app-sidebar"
import Credit from "@/components/Credit";
import {Toaster} from "sonner";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle} from "@/components/ui/sheet"
import {useSheet} from "@/contexts/SheetContext"

export default function AppLayout({children}) {
    const {sheetOpen, setSheetOpen, tasks} = useSheet()
    return (
        <SidebarProvider style={{"--sidebar-width": "18rem"}}>
            <AppSidebar/>
            <SidebarInset>
                <main className="w-full h-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800/80">
                    <SidebarTrigger className="dark:text-white m-3 fixed"/>
                    {children}
                    <Credit/>
                </main>
                <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                    <SheetContent className="dark:bg-[#1c1c1d]">
                        <SheetHeader>
                            <SheetTitle className="font-bold text-center text-2xl">List of Incoming Tasks?</SheetTitle>
                            <SheetDescription>
                                There are <b>{tasks?.length}</b> incoming reminded tasks
                            </SheetDescription>
                        </SheetHeader>
                        {tasks && tasks.map(task =>
                            <div  className="w-full flex border bg-white dark:bg-slate-500 rounded mt-2 first:mt-0 shadow p-2"
                                key={task.id}>{task.next + "  " +  task.time}</div>
                        )}
                    </SheetContent>
                </Sheet>
            </SidebarInset>
            <Toaster/>
        </SidebarProvider>
    )
}
