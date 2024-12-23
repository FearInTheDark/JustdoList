import React from 'react';
import {Switch} from "@/components/ui/switch"
import {Card} from "@/components/ui/card"
import {Lock, Star} from "lucide-react"
import {Button} from "@/components/ui/button"

const Appearance = (user, setUser) => {
    return (
        <div className="w-full max-w-3xl space-y-8 p-6">
            <div className="space-y-4">
                <p className="text-base text-muted-foreground">
                    Personalize your JustdoList with colors to match your style, mood, and personality.{" "}
                </p>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="font-medium">Sync theme</span>
                        <Switch className="bg-red-500 data-[state=checked]:bg-red-500" defaultChecked/>
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center justify-between">
                            <span className="font-medium">Auto Dark Mode</span>
                            <Switch/>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Automatically switch between light and dark themes when your system does.
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Your themes</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <ThemeCard name="Todoist" color="bg-red-500"/>
                    <ThemeCard name="Dark" color="bg-gray-900"/>
                    <ThemeCard name="Moonstone" color="bg-slate-600"/>
                    <ThemeCard name="Tangerine" color="bg-orange-500"/>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Pro themes</h2>
                <Card className="bg-orange-50 p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Star className="h-5 w-5 text-orange-500"/>
                            <div>
                                <h3 className="font-medium">Unlock more themes</h3>
                                <p className="text-sm text-muted-foreground">
                                    Upgrade to personalize your JustdoList with more colors and themes.
                                </p>
                            </div>
                        </div>
                        <Button className="bg-red-500 hover:bg-red-600">Upgrade</Button>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Appearance;

function ThemeCard({name, color, isLocked, isSelected}) {
    return (
        <Card className="relative overflow-hidden">
            <div className={`h-32 p-4 ${color} transition-colors`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="font-medium text-white">{name}</div>
                        {isLocked && <Lock className="h-4 w-4 text-white"/>}
                    </div>
                    <div className="h-4 w-4 rounded-full border-2 border-white bg-transparent"/>
                </div>
                <div className="mt-4 space-y-2">
                    <div className="h-2 w-3/4 rounded bg-white/20"/>
                    <div className="h-2 w-1/2 rounded bg-white/20"/>
                </div>
            </div>
        </Card>
    )
}
