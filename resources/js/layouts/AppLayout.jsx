import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar"
import {AppSidebar} from "@/components/app-sidebar"
import Credit from "@/components/Credit";
import {Toaster} from "sonner";

export default function AppLayout({children}) {
    return (
        <SidebarProvider style={{"--sidebar-width": "18rem"}}>
            <AppSidebar/>
            <SidebarInset>
                <main className="w-full h-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                    <SidebarTrigger className="dark:text-white m-3 fixed"/>
                    {children}
                    <Credit/>
                </main>
            </SidebarInset>
            <Toaster/>
        </SidebarProvider>
    )
}
