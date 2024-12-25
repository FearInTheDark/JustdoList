import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {WhiteRainbowButton} from "@/components/ui/WhiteRainbowButton";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {BorderBeam} from "@/components/ui/border-beam";
import {Link, useForm} from "@inertiajs/react";
import {toast} from "sonner";
import {Label} from "@/components/ui/label"

const LoginModal = () => {
    const {data, setData, post, processing, wasSuccessful, errors} = useForm({
        email: "",
        password: ""
    })

    const handleFormChange = (e) => {
        e.preventDefault()
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        post('/login', {
            onError: () => {
                toast('Invalid credentials. Please try again.', {
                    description: 'Invalid',
                    action: {
                        label: 'Close',
                        onClick: () => toast.dismiss()
                    }
                })
            },
            onSuccess: () => {
                toast('Welcome back!', {
                    description: 'Welcome',
                    action: {
                        label: 'Close',
                        onClick: () => toast.dismiss()
                    }
                })
            }
        })
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <WhiteRainbowButton className="btn-sm px-4 py-0 hover:bg-gray-50 dark:hover:bg-gray-800 duration-100 transform">
                        <span className="hover:scale-105 transform duration-200">
                            Login
                        </span>
                </WhiteRainbowButton>
            </DialogTrigger>
            <DialogContent className="overflow-hidden bg-gray-100 dark:bg-gray-800 gap-0 p-3">
                <DialogHeader>
                    <DialogTitle/><DialogDescription/>
                </DialogHeader>
                <div className="flex flex-col items-center justify-start w-full h-full" data-aos="fade-left">
                    <div className="w-full h-auto flex justify-center mb-3 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg"
                             className="w-[100px]"
                             viewBox="0 0 473 512">
                            <path fill="#57beff" d="M132.36 172.205c4.822 60.778 2.41 102.254-17.676 121.029c-15.83 14.795-43.183 13.71-97.69 10.045c-9.257-.623-14.343 8.808-14.492 14.4c-1.228 46-2.938 96.66 5.222 124.361c22.263 34.486 60.598 36.009 111.234 68.904c7.75 4.481 15.332-6.38 7.216-12.295c-2.32-1.362 89.9-13.135 137.348-26.466c20.851-3.126 37.19-17.824 48.567-43.697c8.912-20.27 15.022-42.088 14.88-55.5c.61-22.825-8.669-119.969-8.444-174.72c31.776-6.729 39.657-11.095 67.828-12.792c37.74-2.274 60.07-2.566 74.332.34c4.844 2.981 11.607-2.168 11.532-6.11c-2.029-19.686-11.393-92.305-10.084-127.225L384.817 0C368.704 1.69 235.98 16.646 195.048 15.287c-95.16-3.593-153.2 16.772-188.87 16.743c0 0-7.096 84.543-6.078 99.816c.838 12.567 6.598 43.187 6.598 43.187c39.314 13.454 65.183-8.854 125.661-2.828M241.293 142.7c16.421 133.355 18.627 214.687-16.433 252.942c-31.71 34.598-96.884 39.073-205.243 34.95c-5.414-27.135-4.551-69.377-2.719-113.95c57.685 8.039 89.417 3.858 108.538-14.013c25.02-23.385 26.054-74.02 20.195-143.916c-59.66-9.726-106.16 13.014-127.192 3.378c-6.781-29.876-6.174-73.673.59-120.047c56.08-9.006 112.085-16.66 175.544-14.546c50.003 1.441 112.695-7.319 182.939-14.34l17.624 115.988c-2.815 9.176-81.419 1.682-153.843 13.554"/>
                        </svg>
                    </div>
                    <div className="flex flex-col items-center z-10 w-full">
                        <form onSubmit={handleSubmit} className="p-3 w-full mx-auto flex flex-col gap-3">
                            <Input type="email" name="email" id="email" placeholder="Enter your email"
                                   className={`w-full ${errors.email ? 'border-rose-500' : 'border-blue-400 dark:border-blue-600'} bg-white/60 dark:bg-gray-700/60 focus:ring-blue-400 dark:focus:ring-blue-600 focus:border-blue-400 dark:focus:border-blue-600`}
                                   value={data.email} onChange={handleFormChange} error={errors.email} autoComplete="off" required
                            />
                            <div className="flex flex-col w-full gap-1">
                                <Input type="password" name="password" id="password" placeholder="Enter your password"
                                       className={`w-full ${errors.email ? 'border-rose-500' : 'border-blue-400 dark:border-blue-600'} bg-white/60 dark:bg-gray-700/60 focus:ring-blue-400 dark:focus:ring-blue-600 focus:border-blue-400 dark:focus:border-blue-600 animate-fadeIn`}
                                       onChange={handleFormChange} required error={errors.password}
                                />
                                {errors.email ?
                                    <span className="text-sm text-rose-400 dark:text-rose-500 italic ms-2">{errors.email}</span> : null}
                            </div>
                            <div className="flex w-full justify-between items-center">
                                <Link href={route('loginForm')} className="text-sm text-blue-400 hover:text-blue-500 dark:text-blue-300 dark:hover:text-blue-400">To Login Page</Link>
                                <Link href={route('password.request')} className="text-sm text-blue-400 hover:text-blue-500 dark:text-blue-300 dark:hover:text-blue-400">Forgot password?</Link>
                            </div>
                            <div className="flex items-center">
                                <input id="remember" name="remember" type="checkbox" className="checkbox checkbox-info rounded size-5 border-[.5px]"
                                       checked={data.remember} onChange={e => setData('remember', e.target.checked)}
                                />
                                <Label htmlFor="remember" className="ml-2 block text-sm text-muted-foreground dark:text-gray-400">
                                    Remember me
                                </Label>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase my-2">
                                <span className="px-2 text-muted-foreground dark:text-gray-400">Keep Rolling</span>
                            </div>
                            <div className="flex gap-2">
                                <Button className={`w-full font-medium flex gap-2 bg-black/80 hover:bg-black/90 active:bg-black text-white dark:bg-white/80 dark:hover:bg-white/90 dark:active:bg-white dark:text-black py-2 rounded-lg transition-all duration-300 ease-in-out`}
                                        disabled={processing} type="submit">
                                    {processing &&
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
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
                                    <span className="hover:scale-105 transform duration-200">Login</span>
                                </Button>
                            </div>
                            <div className="absolute right-0 -translate-y-1/2 w-[200px] -z-10">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-full opacity-10 animate-spin-slow" viewBox="0 0 128 128">
                                    <path fill="#017cee" d="m2.544 127l60.81-62.332a1.124 1.124 0 0 0 .135-1.437c-3.698-5.162-10.521-6.058-13.05-9.527c-7.49-10.275-9.39-16.092-12.61-15.73a1 1 0 0 0-.585.308L15.278 60.8C2.64 73.744.824 102.275.496 126.167a1.19 1.19 0 0 0 2.048.833"></path>
                                    <path fill="#00ad46" d="M126.99 125.46L64.658 64.647a1.124 1.124 0 0 0-1.439-.136c-5.162 3.7-6.058 10.521-9.527 13.05c-10.275 7.49-16.092 9.391-15.73 12.61a1 1 0 0 0 .308.583l22.518 21.966c12.944 12.638 41.475 14.454 65.367 14.782a1.19 1.19 0 0 0 .835-2.041z"></path>
                                    <path fill="#04d659" d="M60.792 112.72c-7.076-6.903-10.355-20.559 3.206-48.719c-22.046 9.853-29.771 22.803-25.972 26.511z"></path>
                                    <path fill="#00c7d4" d="M125.45 1.011L64.643 63.343a1.12 1.12 0 0 0-.136 1.437c3.7 5.163 10.52 6.058 13.05 9.527c7.49 10.275 9.393 16.092 12.61 15.73a.98.98 0 0 0 .585-.308l21.966-22.518c12.638-12.944 14.454-41.475 14.782-65.367a1.193 1.193 0 0 0-2.05-.832z"></path>
                                    <path fill="#11e1ee" d="M112.73 67.211c-6.903 7.076-20.559 10.355-48.721-3.206c9.853 22.046 22.803 29.771 26.511 25.972z"></path>
                                    <path fill="#e43921" d="m1.002 2.55l62.332 60.807a1.124 1.124 0 0 0 1.436.135c5.163-3.7 6.058-10.52 9.527-13.05c10.275-7.49 16.092-9.39 15.731-12.61a1 1 0 0 0-.308-.584L67.202 15.282C54.258 2.644 25.727.828 1.835.5a1.19 1.19 0 0 0-.833 2.05"></path>
                                    <path fill="#ff7557" d="M67.212 15.284c7.076 6.904 10.355 20.559-3.206 48.721C86.052 54.153 93.777 41.2 89.978 37.494z"></path>
                                    <path fill="#0cb6ff" d="M15.279 60.8C22.183 53.724 35.838 50.445 64 64.006C54.148 41.96 41.197 34.235 37.489 38.034z"></path>
                                    <circle cx={64.009} cy={63.995} r={2.718} fill="#4a4848"></circle>
                                </svg>
                            </div>
                        </form>
                    </div>
                </div>
                <BorderBeam borderWidth={2}/>
            </DialogContent>
        </Dialog>
    );
};

export default LoginModal;
