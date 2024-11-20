"use client"
import AOS from "aos";
import "aos/dist/aos.css";
import {useEffect} from "react";
import {Head, Link} from "@inertiajs/react";
import Header from "@/pages/landing/Header";
import SparklesText from "@/components/ui/sparkles-text";
import {RainbowButton} from "@/components/ui/rainbow-button";
import Features from "@/pages/landing/Features";
import Avatars from "@/components/Avatars";
import Feedback from "@/pages/landing/Feedback";
import Footer from "@/pages/landing/Footer";
import Illustration from "@/pages/landing/Illustration";
import {WhiteRainbowButton} from "@/components/ui/WhiteRainbowButton";
import {MarqueeRatings} from "@/components/MarqueeRatings";

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
            <Head>
                <title>JustdoList - Free Task Manager</title>
                <meta name="Landing Page" content="JustdoList - Free Task Manager"/>
            </Head>
            <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow-clip]:overflow-clip font-inter bg-gray-200 dark:bg-gray-800">
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
                                    <p className="mb-8 text-lg text-gray-700 dark:text-gray-300"
                                       data-aos="zoom-y-out"
                                       data-aos-delay="300"
                                    >JustdoList is a great free tool to manage your to-do list. Let's explore its useful features!</p>
                                    <div
                                        className="relative before:absolute before:inset-0 before:border-y before:[border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1] dark:before:border-gray-700 before:z-[-1] before:top-[-1px] before:bottom-[-1px] before:rounded-[inherit]">
                                        <div
                                            className="mx-auto max-w-xs sm:flex sm:flex-row sm:gap-3 sm:max-w-none sm:justify-center flex-col gap-7"
                                            data-aos="zoom-y-out"
                                            data-aos-delay="450">
                                            <RainbowButton>
                                                <span className="hover:scale-110 transform duration-200">
                                                    Start Free Trial &nbsp; <i className="fa-solid fa-arrow-right"></i>
                                                </span>
                                            </RainbowButton>
                                            <WhiteRainbowButton>
                                                <span className="hover:scale-110 transform duration-200">
                                                    Learn more
                                                </span>
                                            </WhiteRainbowButton>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <MarqueeRatings/>
                <Features/>
                <Feedback/>
                <Footer/>
            </div>

        </>
    );

}
