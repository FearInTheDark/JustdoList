import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar"
import {AppSidebar} from "@/components/app-sidebar"
import Credit from "@/components/Credit";
import {Toaster} from "sonner";
import IntroLogo from "@/components/IntroLogo";

export default function AppLayout({children}) {
    return (
        <SidebarProvider style={{"--sidebar-width": "18rem"}}>
            <AppSidebar/>
            <SidebarInset>
                <main className="w-full h-full overflow-hidden rounded-lg  dark:from-gray-800 dark:to-gray-800">
                    {/*<IntroLogo/>*/}
                    <SidebarTrigger className="dark:text-white m-3 fixed"/>
                    {children}
                    <Credit/>
                </main>
            </SidebarInset>
            <Toaster/>
        </SidebarProvider>
    )
}
