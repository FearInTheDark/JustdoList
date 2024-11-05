import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar"
import {AppSidebar} from "@/components/app-sidebar"

export default function AppLayout({children}) {
    return (
        <SidebarProvider style={{"--sidebar-width": "15rem"}}>
            <AppSidebar/>
            <main className="w-full bg-gray-800">
                <SidebarTrigger className="text-white"/>
                {children}
            </main>
        </SidebarProvider>
    )
}
