import {RainbowButton} from "@/components/ui/rainbow-button.tsx";
import ThemeMode from "@/components/ThemeMode.jsx";
import {Link, usePage} from "@inertiajs/react";
import {cn} from "@/lib/utils";
import LoginModal from "@/components/LoginModal";
import LanguageSwitcher from "@/components/app/LanguageSwitcher"

export default function Header({className}) {
    return (
        <header className={cn("fixed top-2 z-30 w-full md:top-6", className)}
                data-aos="zoom-y-out">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div
                    className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-white/90 dark:bg-gray-700/90 px-3 shadow-lg shadow-black/[0.03] backdrop-blur-sm before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:dark:border-none before:border-transparent before:[background:linear-gradient(theme(colors.gray.100),theme(colors.gray.200))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]">
                    <div className="flex flex-1 items-center">
                        <a className="inline-flex" aria-label="Cruip" href="/">
                            <img src="/favicon.svg" alt="JustdoList" className="w-[30px]"/>
                        </a></div>
                    <ul className="flex flex-1 items-center justify-end gap-3 cursor-pointer">
                        <li className="flex items-center">
                            <ThemeMode/>
                        </li>
                        {/*<li className="rounded-full flex items-center p-2 hover:bg-gray-100 hover:shadow-sm text-black/70 transform duration-300" onClick={() => alert("Changed Language")}>*/}
                        {/*    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"*/}
                        {/*         viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"*/}
                        {/*         className="lucide lucide-languages">*/}
                        {/*        <path d="m5 8 6 6"/>*/}
                        {/*        <path d="m4 14 6-6 2-3"/>*/}
                        {/*        <path d="M2 5h12"/>*/}
                        {/*        <path d="M7 2h1"/>*/}
                        {/*        <path d="m22 22-5-10-5 10"/>*/}
                        {/*        <path d="M14 18h6"/>*/}
                        {/*    </svg>*/}
                        {/*</li>*/}
                        <LanguageSwitcher/>
                        <li>
                            <LoginModal/>
                        </li>
                        <li>
                            <RainbowButton className="btn-sm px-4 py-0 hover:bg-gray-900">
                                <Link className="hover:scale-105 transform duration-200" href={route('register')}>
                                    Register
                                </Link>
                            </RainbowButton>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )

}
