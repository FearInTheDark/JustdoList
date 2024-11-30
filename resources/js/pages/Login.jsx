import React, {useEffect} from 'react'
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {ArrowLeft, Lock, Mail} from 'lucide-react'
import {Link, useForm} from "@inertiajs/react";
import {toast, Toaster} from "sonner";
import AOS from "aos";
import Credit from "@/components/Credit";
import RetroGrid from "@/components/ui/retro-grid"
import {Checkbox} from "@/components/ui/checkbox"

export default function LoginPage() {
    const {data, setData, errors, post, wasSuccessful, processing} = useForm({
        email: "",
        password: "",
    })
    useEffect(() => {
        AOS.init({
            once: true,
            duration: 400,
            disable: "phone",
            easing: "ease-out-cubic"
        })
    }, []);
    const handleFormChange = (e) => {
        e.preventDefault()
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log('Login submitting')
        post(route('login'), {
            onSuccess: () => {
                toast('Submitting...', {
                    description: "Data is being submitted",
                    action: {
                        label: "Undo",
                        onClick: () => console.log("undo")
                    }
                })
            },
            onError: () => {
                toast('Error', {
                    description: "An error occurred",
                    action: {
                        label: "Undo",
                        onClick: () => console.log("undo")
                    }
                })
            }
        })
    }

    return (
        <>
            <Toaster/>
            <RetroGrid angle={45} className="opacity-100 bg-blue-100"/>
            <div className="min-h-screen flex bg-gray-200 dark:bg-gray-900 overscroll-auto">
                {/* Left column: Login form and navigation */}
                <div className=" flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96 shadow-lg p-6 rounded-lg bg-white dark:bg-gray-800" data-aos="fade-right" data-aos-duration="1000">
                        <div className="flex justify-between items-center mb-8">
                            <Link href={route('index')} className="text-sm font-medium text-primary hover:underline flex items-center dark:text-primary-400">
                                <ArrowLeft className="mr-2 h-4 w-4"/>
                                Back to Home
                            </Link>
                            <img src="/favicon.svg" alt="App Logo" width={40} height={40} className="dark:invert"/>
                        </div>

                        <div className="mb-8">
                            <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">Sign in to your account</h2>
                            <p className="mt-2 text-sm text-muted-foreground dark:text-gray-400">
                                Or{' '}
                                <Link href={route('register')} className="font-medium text-primary hover:underline dark:text-primary-400">
                                    create a new account
                                </Link>
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-1">
                                <Label htmlFor="email" className="dark:text-gray-300">Email address</Label>
                                <div className="relative">
                                    <Input id="email" name="email" type="email" tabIndex={1} autoFocus autoComplete="off" required className="pl-10 dark:bg-gray-700 dark:text-white dark:border-gray-600" placeholder="Enter your email here" onChange={handleFormChange}/>
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500"/>
                                </div>
                                {errors.email ?
                                    <span className="text-sm text-rose-500 ml-2 italic dark:text-rose-400">{errors.email}</span> : ''}
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="password" className="dark:text-gray-300">Password</Label>
                                <div className="relative">
                                    <Input id="password" name="password" type="password" tabIndex={2} autoComplete="current-password" required className="pl-10 dark:bg-gray-700 dark:text-white dark:border-gray-600" placeholder="Your password goes here" onChange={handleFormChange}/>
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500"/>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input id="remember-me" name="remember-me" type="checkbox" className="checkbox checkbox-info rounded size-5 border-[.5px]"/>
                                    <Label htmlFor="remember-me" className="ml-2 block text-sm text-muted-foreground dark:text-gray-400">
                                        Remember me
                                    </Label>
                                </div>

                                <div className="text-sm">
                                    <Link href={route('register')} className="font-medium text-primary hover:underline dark:text-primary-400">
                                        Forgot your password?
                                    </Link>
                                </div>
                            </div>

                            <Button type="submit" className="w-full dark:bg-primary-600 dark:hover:bg-primary-700 dark:text-black" disabled={processing}>
                                {processing &&
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className="mr-2">
                                        <rect width={10} height={10} x={1} y={1} fill="currentColor" rx={1}>
                                            <animate id="svgSpinnersBlocksShuffle30" fill="freeze" attributeName="x" begin="0;svgSpinnersBlocksShuffle3b.end" dur="0.2s" values="1;13"></animate>
                                            <animate id="svgSpinnersBlocksShuffle31" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle38.end" dur="0.2s" values="1;13"></animate>
                                            <animate id="svgSpinnersBlocksShuffle32" fill="freeze" attributeName="x" begin="svgSpinnersBlocksShuffle39.end" dur="0.2s" values="13;1"></animate>
                                            <animate id="svgSpinnersBlocksShuffle33" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle3a.end" dur="0.2s" values="13;1"></animate>
                                        </rect>
                                        <rect width={10} height={10} x={1} y={13} fill="currentColor" rx={1}>
                                            <animate id="svgSpinnersBlocksShuffle34" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle30.end" dur="0.2s" values="13;1"></animate>
                                            <animate id="svgSpinnersBlocksShuffle35" fill="freeze" attributeName="x" begin="svgSpinnersBlocksShuffle31.end" dur="0.2s" values="1;13"></animate>
                                            <animate id="svgSpinnersBlocksShuffle36" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle32.end" dur="0.2s" values="1;13"></animate>
                                            <animate id="svgSpinnersBlocksShuffle37" fill="freeze" attributeName="x" begin="svgSpinnersBlocksShuffle33.end" dur="0.2s" values="13;1"></animate>
                                        </rect>
                                        <rect width={10} height={10} x={13} y={13} fill="currentColor" rx={1}>
                                            <animate id="svgSpinnersBlocksShuffle38" fill="freeze" attributeName="x" begin="svgSpinnersBlocksShuffle34.end" dur="0.2s" values="13;1"></animate>
                                            <animate id="svgSpinnersBlocksShuffle39" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle35.end" dur="0.2s" values="13;1"></animate>
                                            <animate id="svgSpinnersBlocksShuffle3a" fill="freeze" attributeName="x" begin="svgSpinnersBlocksShuffle36.end" dur="0.2s" values="1;13"></animate>
                                            <animate id="svgSpinnersBlocksShuffle3b" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle37.end" dur="0.2s" values="1;13"></animate>
                                        </rect>
                                    </svg>}
                                Sign in
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Right column: img */}
                <div className="hidden relative w-0 flex-1 items-center justify-center lg:flex">
                    <img
                        className={`relative max-w-[700px] inset-0 object-cover filter drop-shadow-custom-blue`}
                        src="/storage/login/loginpage.svg"
                        alt="Login background image"
                        // data-aos="fade-left" data-aos-duration="1000"
                    />
                </div>
            </div>
            <Credit/>
        </>

    )
}
