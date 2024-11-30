import React, {useEffect, useState} from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {Link, useForm} from "@inertiajs/react";
import {toast, Toaster} from "sonner";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import Credit from "@/components/Credit";
import {ArrowLeft, Lock, Mail} from "lucide-react";
import {Label} from "@/components/ui/label";
import {cn} from "@/lib/utils"
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern"
import {Checkbox} from "@/components/ui/checkbox"

const Register = () => {
    useEffect(() => {
        AOS.init({
            once: false,
            duration: 400,
            disable: "phone",
            easing: "ease-out-cubic"
        })
    }, []);
    const [isValid, setIsValid] = useState(false)

    const {data, setData, errors, post, processing, wasSuccessful} = useForm({
        email: "",
        password: "",
        password_confirmation: "",
        remember_me: false
    })
    const handleFormChange = (e) => {
        e.preventDefault()
        const key = e.target.name;
        const value = e.target.value;
        setData(key, value);
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        post('/users', {
            onError: () => toast("Invalid credentials!", {
                description: "Please try again",
                action: {
                    label: "Hide",
                    onClick: () => null
                }
            }),
            onSuccess: () => {
                toast("Your email is valid! Keep rolling!", {
                    description: "Please follow the steps",
                    action: {
                        label: "Hide",
                        onClick: () => null
                    }
                })
                setIsValid(true)
            }
        });
    }

    return (
        <>
            <Toaster/>
            <Credit/>
            <AnimatedGridPattern
                numSquares={100}
                maxOpacity={0.3}
                duration={3}
                repeatDelay={1}
                className={cn(
                    "[mask-image:radial-gradient(circle,white,transparent)]",
                    "inset-x-0 inset-y-[-30%] skew-y-12 bg-blue-100",
                )}
            />
            <div className="min-h-screen flex justify-center bg-gray-200 dark:bg-gray-900">
                <div className="hidden relative w-1/2 items-center justify-center lg:flex">
                    <img
                        className={`relative inset-0 max-w-[700px] object-cover filter drop-shadow-custom-blue`}
                        src="/storage/login/login_green.svg"
                        alt="Login background image"
                        data-aos="fade-left" data-aos-duration="1000"
                    />
                </div>

                <div className="flex lg:w-1/2 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full flex flex-col max-w-[450px]  lg:w-full shadow-lg p-6 rounded-lg bg-white dark:bg-gray-800" data-aos="fade-left" data-aos-duration="1000">
                        <div className="flex justify-between items-center mb-2">
                            <Link href={route('index')} className="text-sm font-medium text-primary hover:underline flex items-center dark:text-primary-400">
                                <ArrowLeft className="mr-2 h-4 w-4"/>
                                Back to Home
                            </Link>
                            <img src="/favicon.svg" alt="App Logo" width={40} height={40} className="dark:invert"/>
                        </div>

                        <div className="mb-8">
                            <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">Create your account</h2>
                            <p className="mt-2 text-md text-muted-foreground dark:text-gray-400">
                                Or{' '}
                                <Link href={route('loginForm')} className="font-medium text-primary hover:underline dark:text-primary-400">
                                    login
                                </Link>
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6 flex flex-col justify-between">
                            <div className="space-y-1">
                                <Label htmlFor="email" className="dark:text-gray-300">Email address</Label>
                                <div className="relative">
                                    <div className="relative">

                                        <Input id="email" name="email" type="email" autoComplete="off" required disabled={isValid}
                                               className="pl-10 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                               placeholder="Enter your email here" onChange={handleFormChange}/>
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500"/>
                                    </div>
                                    {errors.email ?
                                        <span className="text-sm text-rose-500 ml-2 italic dark:text-rose-400">{errors.email}</span> : ''}
                                </div>
                            </div>
                            {isValid ?
                                <>
                                    <div className="space-y-1 animate-fadeIn">
                                        <Label htmlFor="password" className="dark:text-gray-300">Password</Label>
                                        <div className="relative">
                                            <Input id="password" name="password" type="password" autoComplete="current-password" required
                                                   className="pl-10 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                                   placeholder="Your password goes here" onChange={handleFormChange}/>
                                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500"/>
                                        </div>
                                    </div>

                                    <div className="space-y-1 animate-fadeIn">
                                        <Label htmlFor="password_confirmation" className="dark:text-gray-300">Confirm password</Label>
                                        <div className="relative">
                                            <Input id="password_confirmation" name="password_confirmation" type="password" autoComplete="current-password" required
                                                   className="pl-10 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                                   placeholder="Your password goes here" onChange={handleFormChange}/>
                                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500"/>
                                        </div>
                                    </div>
                                </> : null}

                            <div className="flex items-center justify-between transition-all">
                                <div className="flex items-center">
                                    <input id="remember-me" name="remember-me" type="checkbox" className="checkbox checkbox-info rounded size-5" onChange={(e) => setData({...data, remember_me: e.target.checked})}/>
                                    <Label htmlFor="remember-me" className="ml-2 block text-sm text-muted-foreground dark:text-gray-400">
                                        Remember me
                                    </Label>
                                </div>

                                <div className="text-sm">
                                    <Link href={route('loginForm')} className="font-medium text-primary hover:underline dark:text-primary-400">
                                        Already have an account?
                                    </Link>
                                </div>
                            </div>

                            <div className="flex gap-2">

                                {isValid &&
                                    <Button className="flex-1 bg-white text-black hover:bg-gray-200" type="button"
                                            onClick={() => {
                                                setIsValid(false);
                                                setData({
                                                    ...data,
                                                    password: "",
                                                    password_confirmation: ""
                                                });
                                            }
                                            }
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                            <path fill="#57beff" fillRule="evenodd" d="M10 2a1 1 0 0 0-1.79-.614l-7 9a1 1 0 0 0 0 1.228l7 9A1 1 0 0 0 10 20v-3.99c5.379.112 7.963 1.133 9.261 2.243c1.234 1.055 1.46 2.296 1.695 3.596l.061.335a1 1 0 0 0 1.981-.122c.171-2.748-.086-6.73-2.027-10.061C19.087 8.768 15.695 6.282 10 6.022z" clipRule="evenodd"/>
                                        </svg>
                                    </Button>
                                }
                                <Button type="submit" className={`${isValid ? 'w-[70%]' : 'w-full'} dark:bg-primary-600 dark:hover:bg-primary-700 dark:text-black`} disabled={processing}>
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
                                    {isValid ? 'Register' : 'Validate Email'}
                                </Button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Register
