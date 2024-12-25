import React from "react";
import GridPattern from "@/components/ui/grid-pattern";
import IntroLogo from "@/components/layers/IntroLogo";

interface DashboardLayoutProps {
    children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="p-4 mb-20">
            <GridPattern
                width={20} height={20}
                x={-1} y={-1}
                strokeDasharray={"4 2"}
                className="fixed [mask-image:radial-gradient(900px_circle_at_center,white,transparent)] z-0 size-full"/>
            <div className="flex min-h-screen flex-col">
                {/*<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-lg px-2">*/}
                {/*    <div className="container flex h-14 items-center justify-between">*/}
                {/*        <div className="flex items-center gap-4">*/}
                {/*            <div className="flex items-center gap-2">*/}
                {/*                <div className="h-8 w-8 rounded-full bg-gray-200"/>*/}
                {/*                <Select defaultValue="alicia">*/}
                {/*                    <SelectTrigger className="w-[140px]">*/}
                {/*                        <SelectValue/>*/}
                {/*                    </SelectTrigger>*/}
                {/*                    <SelectContent>*/}
                {/*                        <SelectItem value="alicia">Alicia Koch</SelectItem>*/}
                {/*                    </SelectContent>*/}
                {/*                </Select>*/}
                {/*            </div>*/}
                {/*            <nav className="flex items-center gap-4">*/}
                {/*                <Button variant="link" className="font-semibold">*/}
                {/*                    Overview*/}
                {/*                </Button>*/}
                {/*                <Button variant="link">Customers</Button>*/}
                {/*                <Button variant="link">Products</Button>*/}
                {/*                <Button variant="link">Settings</Button>*/}
                {/*            </nav>*/}
                {/*        </div>*/}
                {/*        <div className="relative">*/}
                {/*            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"/>*/}
                {/*            <Input placeholder="Search..." className="w-[200px] pl-8"/>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</header>*/}
                <main className="flex-1">{children}</main>
            </div>
        </div>
    )
}

