import "aos/dist/aos.css";
import {useEffect} from "react";
import AOS from "aos";
import {usePage} from "@inertiajs/react";
import {BorderBeam} from "@/components/ui/border-beam.tsx";
import AppLayout from "@/layouts/AppLayout.jsx";

function Home() {
    const {props} = usePage()
    console.log(props)
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
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800">
                <h1 className="text-3xl text-rose-400 font-bold mb-5" data-aos="zoom-y-out">
                    Hello {props.user.name || "From TailwindCSS"}
                </h1>
                <div className="relative w-[95%] h-[500px] border p-3 shadow-gray-400 rounded-lg bg-white">
                    <div className="sticky bottom-0 w-[200px] aspect-square bg-blue-300 rounded-lg top-[1000px] z-10 left-60">
                    </div>
                    <div className="absolute w-[200px] aspect-square bg-red-300 rounded-lg top-[400px]">
                    </div>
                    <BorderBeam/>
                </div>
            </div>
        </>
    )
}

Home.layout = page => <AppLayout children={page}/>

export default Home
