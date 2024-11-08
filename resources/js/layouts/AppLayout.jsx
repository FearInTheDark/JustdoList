import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar"
import {AppSidebar} from "@/components/app-sidebar"
import Credit from "@/components/Credit";

export default function AppLayout({children}) {
    return (
        <SidebarProvider style={{"--sidebar-width": "15rem"}}>
            <AppSidebar/>
            <SidebarInset>
                <main className="w-full h-full overflow-hidden rounded-lg  dark:from-gray-800 dark:to-gray-800">

                    <SidebarTrigger className="dark:text-white m-3 fixed"/>
                    {children}
                    <Credit/>
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
