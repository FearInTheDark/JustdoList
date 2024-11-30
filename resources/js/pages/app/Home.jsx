import "aos/dist/aos.css";
import React, {useEffect} from "react";
import AOS from "aos";
import AppLayout from "@/layouts/AppLayout.jsx";
import {BellIcon, CalendarIcon, FileTextIcon, InputIcon} from "@radix-ui/react-icons";
import {BentoCard, BentoGrid} from "@/components/ui/bento-grid";
import {usePage} from "@inertiajs/react";
import IntroLogo from "@/components/layers/IntroLogo";
import HomeDock from "@/components/HomeDock";
import {AlarmClock, SquarePen} from "lucide-react";
import FlickeringGrid from "@/components/ui/flickering-grid";
import RetroGrid from "@/components/ui/retro-grid"
import { Calendar } from "@/components/ui/calendar";


const features = [
    {
        Icon: FileTextIcon,
        name: "Save your files",
        description: "We automatically save your files as you type.",
        href: "/",
        cta: "Learn more",
        background: (
            <img
                alt="..."
                className="absolute -right-20 -top-20 opacity-60"
                src="/storage/user/admin1.svg"
            />
        ),
        className: "md:col-start-3 md:col-end-3 md:row-start-1 md:row-end-2",
    },
    {
        Icon: InputIcon,
        name: "Task Manager",
        description:
            "Manage your tasks with our simple and intuitive interface.",
        href: "/tasks",
        cta: "Learn more",
        background: (
            <img alt="..." className="absolute -right-20 -top-20 opacity-60" />
        ),
        className: "md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-3",
    },
    {
        Icon: SquarePen,
        name: "Feedback",
        description: "Send your feedback to improve our product!",
        href: "/",
        cta: "Learn more",
        background: (
            <img
                alt="..."
                className="absolute -right-20 -top-20 opacity-60"
                src="/storage/user/admin1.svg"
            />
        ),
        className: "md:col-start-1 md:col-end-2 md:row-start-3 md:row-end-4",
    },
    {
        Icon: CalendarIcon,
        name: "Calendar",
        description: "Use the calendar to filter your tasks by date.",
        href: "/",
        cta: "Learn more",
        background: (
            <Calendar
                mode="single"
                selected={new Date()}
                className="origin-top bg-gray-100 dark:bg-gray-800 rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_0%,#000_100%)] group-hover:scale-105"
            />
        ),
        className: "md:row-start-1 md:row-end-4 md:col-start-2 md:col-end-3",
    },
    {
        Icon: AlarmClock,
        name: "Notifications",
        description: "Get notified when triggering a Task.",
        href: "/",
        cta: "Learn more",
        background: (
            <img
                alt="..."
                className="absolute -right-20 -top-20 opacity-60 z-30"
            />
        ),
        className: "md:col-start-3 md:col-end-3 md:row-start-2 md:row-end-4",
    },
];

function Home() {
    useEffect(() => {
        AOS.init({
            once: true,
            disable: "phone",
            duration: 700,
            easing: "ease-out-cubic",
        });
    }, []);
    return (
        <>
            <FlickeringGrid
                className="z-0 absolute inset-0 size-full opacity-30"
                squareSize={4}
                gridGap={6}
                color="#6B7280"
                maxOpacity={0.8}
                flickerChance={0.1}

            />
            <IntroLogo srcIcon={'storage/pages/intro.svg'}/>
            <div className="size-full flex flex-col gap-10 justify-center items-center px-4 mx-auto max-w-5xl">
                <span className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center text-7xl font-bold leading-none tracking-tighter text-transparent">
                    JustdoList
                </span>
                <BentoGrid className="lg:grid-rows-3 md:grid-rows-2 z-10">
                    {features.map((feature) => (
                        <BentoCard key={feature.name} {...feature}/>
                    ))}
                </BentoGrid>
                <RetroGrid/>
            </div>
            <HomeDock/>
        </>
    );
}

Home.layout = (page) => <AppLayout children={page}/>;

export default Home;
