import "aos/dist/aos.css";
import React, {useEffect} from "react";
import AOS from "aos";
import AppLayout from "@/layouts/AppLayout.jsx";
import {CalendarIcon, FileTextIcon, InputIcon} from "@radix-ui/react-icons";
import {BentoCard, BentoGrid} from "@/components/ui/bento-grid";
import IntroLogo from "@/components/layers/IntroLogo";
import HomeDock from "@/components/HomeDock";
import {AlarmClock, SquarePen} from "lucide-react";
import FlickeringGrid from "@/components/ui/flickering-grid";
import RetroGrid from "@/components/ui/retro-grid"
import {Calendar} from "@/components/ui/calendar";
import {Checkbox} from "@/components/ui/checkbox"

const features = [
    {
        Icon: FileTextIcon,
        name: "Save your time",
        description: "We manage your tasks to scheduling as you type.",
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
            <div className={`bg-white dark:bg-gray-700 cursor-pointer rounded-lg z-[11] hidden lg:block relative shadow-md p-4 pb-2 transition-all duration-300 ease-in-out hover:shadow-lg select-none hover:ring-blue-400 hover:ring-1`}>
                <div className="flex flex-col justify-between h-full">
                    <div className="flex items-start h-full">
                        <div className="inline-flex flex-col h-full gap-4">
                            <Checkbox className="mt-1 border-0 data-[state=checked]:bg-blue-400 dark:bg-gray-300 bg-gray-200"/>
                        </div>
                        <div className={`ml-3 flex-1 h-full flex flex-col justify-between`}>
                            <div className={`flex flex-col`}>
                                <h3 className={`text-lg font-semibold text-gray-800 dark:text-white`}>Do Exercises</h3>
                                <span className={`text-sm text-gray-600 dark:text-gray-300`}>Do 30 minutes of exercises</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
        href: "/calendar",
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
            <div className="hover:scale-105 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width={100} height={100} viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                        <g>
                            <path strokeDasharray={4} strokeDashoffset={4} d="M12 3v2">
                                <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.27s" values="4;0"></animate>
                            </path>
                            <path fill="currentColor" fillOpacity={0} strokeDasharray={28} strokeDashoffset={28} d="M12 5c-3.31 0 -6 2.69 -6 6l0 6c-1 0 -2 1 -2 2h8M12 5c3.31 0 6 2.69 6 6l0 6c1 0 2 1 2 2h-8">
                                <animate fill="freeze" attributeName="fill-opacity" begin="1.215s" dur="0.203s" values="0;0.3"></animate>
                                <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.27s" dur="0.54s" values="28;0"></animate>
                            </path>
                            <animateTransform fill="freeze" attributeName="transform" begin="1.215s" dur="8.1s" keyTimes="0;0.05;0.15;0.2;1" type="rotate" values="0 12 3;3 12 3;-3 12 3;0 12 3;0 12 3" repeatCount="indefinite"></animateTransform>
                        </g>
                        <path strokeDasharray={8} strokeDashoffset={8} d="M10 20c0 1.1 0.9 2 2 2c1.1 0 2 -0.9 2 -2">
                            <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.81s" dur="0.27s" values="8;0"></animate>
                            <animateTransform fill="freeze" attributeName="transform" begin="1.485s" dur="8.1s" keyTimes="0;0.05;0.15;0.2;1" type="rotate" values="0 12 8;6 12 8;-6 12 8;0 12 8;0 12 8" repeatCount="indefinite"></animateTransform>
                        </path>
                    </g>
                </svg>
            </div>
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
