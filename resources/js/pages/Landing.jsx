"use client"
import AOS from "aos";
import "aos/dist/aos.css";
import {useEffect} from "react";
import {Link} from "@inertiajs/react";
import {cn} from "@/lib/utils";
import Header from "@/pages/landing/Header";
import SparklesText from "@/components/ui/sparkles-text";
import {RainbowButton} from "@/components/ui/rainbow-button";
import {MarqueeDemo} from "@/components/MarqueeDemo";
import Features from "@/pages/landing/Features";
import Avatars from "@/components/Avatars";
import Feedback from "@/pages/landing/Feedback";
import Footer from "@/pages/landing/Footer";
import Illustration from "@/pages/landing/Illustration";

export default function Landing() {
    useEffect(() => {
        AOS.init({
            once: false,
            disable: "phone",
            duration: 700,
            easing: "ease-out-cubic",
        });
    }, []);
    return (
        <>
            <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow-clip]:overflow-clip font-inter bg-gray-200">
                <Header/>
                <div className="relative">

                    <Illustration/>
                    <div className="mx-auto max-w-6xl px-4 sm:px-6">
                        <div className="pb-6 pt-32 md:pb-20 md:pt-40">
                            <div className="flex justify-center items-center py-2" data-aos="zoom-y-out">
                                <Avatars/>
                            </div>
                            <div className="pb-12 text-center">
                                <h1 className="mb-6 border-y text-5xl font-bold [border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1] md:text-6xl"
                                    data-aos="zoom-y-out"
                                    data-aos-delay={250}
                                    data-aos-duration={500}
                                >
                                    <SparklesText
                                        text={<span>Manage all your tasks and <br className="max-lg:hidden"/>assignments</span>}
                                        colors={{
                                            first: '#FBBF24',
                                            second: '#41D3BD',
                                        }}
                                    />

                                </h1>
                                <div className="mx-auto max-w-3xl">
                                    <p className="mb-8 text-lg text-gray-700"
                                       data-aos="zoom-y-out"
                                       data-aos-delay="300"
                                    >JustdoList is a great free tool to manage your to-do list. Let's explore its useful features!</p>
                                    <div
                                        className="relative before:absolute before:inset-0 before:border-y before:[border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1]">
                                        <div
                                            className="mx-auto max-w-xs sm:flex sm:flex-row sm:gap-3 sm:max-w-none sm:justify-center flex-col gap-7"
                                            data-aos="zoom-y-out"
                                            data-aos-delay="450">
                                            <RainbowButton>
                                                <span className="hover:scale-110 transform duration-200">
                                                    Start Free Trial &nbsp; <i className="fa-solid fa-arrow-right"></i>
                                                </span>
                                            </RainbowButton>
                                            <Link className={cn(
                                                "group relative inline-flex h-11 animate-rainbow cursor-pointer items-center justify-center rounded-xl border-0 bg-white text-black px-8 py-2 font-medium transition-colors [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                                                "before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] before:bg-[length:200%] before:[filter:blur(calc(0.8*1rem))]",
                                                "bg-white text-black",
                                                "dark:bg-[linear-gradient(#fff,#fff),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]",
                                            )}>
                                                <span className="hover:scale-110 transform duration-200">
                                                    Learn more
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <MarqueeDemo/>
                <Features/>
                <Feedback/>
                <Footer/>
            </div>

        </>
    );

}
