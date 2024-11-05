import {RainbowButton} from "@/components/ui/rainbow-button.tsx";
import {WhiteRainbowButton} from "@/components/ui/WhiteRainbowButton.tsx";
import ThemeMode from "@/components/ThemeMode.jsx";
import {Switch} from "@/components/ui/switch.tsx";
import {Link, usePage} from "@inertiajs/react";

export default function Header() {
    const {props} = usePage()
    console.log(props)
    return (
        <header className="fixed top-2 z-30 w-full md:top-6"
                data-aos="zoom-y-out"
        >
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div
                    className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-white/90 px-3 shadow-lg shadow-black/[0.03] backdrop-blur-sm before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(theme(colors.gray.100),theme(colors.gray.200))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]">
                    <div className="flex flex-1 items-center">
                        <a className="inline-flex" aria-label="Cruip" href="/public">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28">
                                <path className="fill-blue-500" fillRule="evenodd"
                                      d="M15.052 0c6.914.513 12.434 6.033 12.947 12.947h-5.015a7.932 7.932 0 0 1-7.932-7.932V0Zm-2.105 22.985V28C6.033 27.487.513 21.967 0 15.053h5.015a7.932 7.932 0 0 1 7.932 7.932Z"
                                      clipRule="evenodd"></path>
                                <path className="fill-blue-300" fillRule="evenodd"
                                      d="M0 12.947C.513 6.033 6.033.513 12.947 0v5.015a7.932 7.932 0 0 1-7.932 7.932H0Zm22.984 2.106h5.015C27.486 21.967 21.966 27.487 15.052 28v-5.015a7.932 7.932 0 0 1 7.932-7.932Z"
                                      clipRule="evenodd"></path>
                            </svg>
                        </a></div>
                    <ul className="flex flex-1 items-center justify-end gap-3 cursor-pointer">
                        {props.user ? <span>Welcome {props.user.name}</span> : null}
                        <li className="flex items-center">
                            <Switch/>
                        </li>
                        <li className="flex items-center">
                            <ThemeMode/>
                        </li>
                        <li className="rounded-full flex items-center p-2 hover:bg-gray-100 hover:shadow-sm transform duration-300" onClick={() => alert("Changed Language")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-languages">
                                <path d="m5 8 6 6"/>
                                <path d="m4 14 6-6 2-3"/>
                                <path d="M2 5h12"/>
                                <path d="M7 2h1"/>
                                <path d="m22 22-5-10-5 10"/>
                                <path d="M14 18h6"/>
                            </svg>
                        </li>
                        <li>
                            <WhiteRainbowButton className="btn-sm px-4 py-0  hover:bg-gray-50 duration-100 transform">
                                <Link className="hover:scale-105 transform duration-200" as="button" href="/">
                                    Login
                                </Link>
                            </WhiteRainbowButton>
                        </li>
                        <li>
                            <RainbowButton className="btn-sm px-4 py-0 hover:bg-gray-900">
                                <Link className="hover:scale-105 transform duration-200" as="button" href="/register">
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
