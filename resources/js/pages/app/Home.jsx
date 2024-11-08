import "aos/dist/aos.css";
import {useEffect} from "react";
import AOS from "aos";
import AppLayout from "@/layouts/AppLayout.jsx";
import {BellIcon, CalendarIcon, FileTextIcon, GlobeIcon, InputIcon} from "@radix-ui/react-icons";
import {BentoCard, BentoGrid} from "@/components/ui/bento-grid";
import {usePage} from "@inertiajs/react";
import IntroLogo from "@/components/IntroLogo";
import HomeDock from "@/components/HomeDock";

const features = [
    {
        Icon: FileTextIcon,
        name: "Save your files",
        description: "We automatically save your files as you type.",
        href: "/",
        cta: "Learn more",
        background: <img alt="..." className="absolute -right-20 -top-20 opacity-60"/>,
        className: "md:row-start-1 md:row-end-4 md:col-start-2 md:col-end-3",
    },
    {
        Icon: InputIcon,
        name: "Full text search",
        description: "Search through all your files in one place.",
        href: "/",
        cta: "Learn more",
        background: <img alt="..." className="absolute -right-20 -top-20 opacity-60"/>,
        className: "md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-3",
    },
    {
        Icon: GlobeIcon,
        name: "Multilingual",
        description: "Supports 100+ languages and counting.",
        href: "/",
        cta: "Learn more",
        background: <img alt="..." className="absolute -right-20 -top-20 opacity-60"/>,
        className: "md:col-start-1 md:col-end-2 md:row-start-3 md:row-end-4",
    },
    {
        Icon: CalendarIcon,
        name: "Calendar",
        description: "Use the calendar to filter your files by date.",
        href: "/",
        cta: "Learn more",
        background: <img alt="..." className="absolute -right-20 -top-20 opacity-60"/>,
        className: "md:col-start-3 md:col-end-3 md:row-start-1 md:row-end-2",
    },
    {
        Icon: BellIcon,
        name: "Notifications",
        description:
            "Get notified when someone shares a file or mentions you in a comment.",
        href: "/",
        cta: "Learn more",
        background: <img alt="..." className="absolute -right-20 -top-20 opacity-60"/>,
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
    const page = usePage()
    console.log(page)
    return (
        <>
            <IntroLogo/>
            <div className="w-full flex px-4 mx-auto max-w-5xl mt-10">

                <BentoGrid className="lg:grid-rows-3 md:grid-rows-2">
                    {features.map((feature) => (
                        <BentoCard key={feature.name} {...feature}/>
                    ))}
                </BentoGrid>
            </div>
            <HomeDock/>
        </>
    );
}

Home.layout = (page) => <AppLayout children={page}/>;

export default Home;
