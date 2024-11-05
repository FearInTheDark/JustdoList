import {useEffect, useState} from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {Head, useForm} from "@inertiajs/react";
import {toast, Toaster} from "sonner";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";

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
        password_confirmation: ""
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
            onError: () => toast("Your email is invalid", {
                description: "Please try again",
                action: {
                    label: "Hide",
                    onClick: () => {
                    }
                }
            }),
            onSuccess: () => {
                toast("Your email is valid", {
                    description: "Please follow the steps",
                    action: {
                        label: "Hide",
                        onClick: () => {
                        }
                    }
                })
                setIsValid(true)
            }
        });
    }

    return (
        <>
            <Toaster/>
            <Head>
                <title>Register</title>
                {/*    favicon*/}
                <link rel="icon" href="/storage/favicon.svg"/>
            </Head>
            <div className="w-screen h-screen font-inter flex items-center justify-center bg-gradient-to-r from-gray-200 to-blue-100">
                <div className="w-[95%] h-[95%] rounded-lg flex items-center border bg-transparent z-10">
                    <div className="hidden md:w-1/2 h-full rounded-l-lg md:flex md:flex-row items-center justify-center border-r bg-gradient-to-r from-gray-200 to-white">
                        <img src="/storage/login/login_green.svg" alt="Register" className="w-[500px]" data-aos="zoom-y-out"/>
                    </div>
                    <div className="w-1/2 h-full flex flex-auto flex-col items-center rounded-r-lg bg-gradient-to-r from-white to-blue-100/20">
                        <div className="nav w-full h-fit flex justify-between p-3">
                            <a className="inline-flex items-center font-[550] justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 shadow-sm" href="/">Back to Landing</a>
                            <a className="inline-flex items-center font-[550] justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring hover:bg-accent/50 hover:text-accent-foreground h-9 px-4 py-2 shadow-sm" href="/">Login</a>
                        </div>
                        <div className="flex items-center justify-center w-full h-full" data-aos="fade-left">
                            <div className="flex flex-col items-center z-10">
                                <h1 className="text-2xl font-semibold tracking-tight">Create an Account</h1>
                                <span className="disabled mt-2 text-gray-600 italic mb-4">Enter your email below to create your account</span>
                                <form onSubmit={handleSubmit} className="p-3 w-[350px] flex flex-col gap-3">
                                    <div className="flex flex-col w-full gap-1">
                                        <Input type="text" name="email" id="email" placeholder="Enter your email"
                                               className={`w-full ${errors.email ? 'border-rose-500' : 'border-blue-400'} focus:ring-blue-400 focus:border-blue-400 bg-transparent`}
                                               value={data.email} onChange={handleFormChange} error={errors.email} autoComplete="off"
                                        />
                                        {errors.email ?
                                            <span className="text-sm text-rose-400 italic ms-2">{errors.email}</span> : null}
                                    </div>
                                    {isValid ? (
                                        <>
                                            <Input type="password" name="password" id="password" placeholder="Enter your password"
                                                   className={`w-full 'border-blue-400' focus:ring-blue-400 focus:border-blue-400 bg-transparent animate-fadeIn`}
                                                   onChange={handleFormChange}
                                            />
                                            <Input type="password" name="password_confirmation" id="password_confirmation" placeholder="Confirm  your password"
                                                   className={`w-full 'border-blue-400' focus:ring-blue-400 focus:border-blue-400 bg-transparent animate-fadeIn`}
                                                   onChange={handleFormChange}
                                            />
                                        </>

                                    ) : ''}
                                    <div className="relative flex justify-center text-xs uppercase my-2">
                                        <span className="px-2 text-muted-foreground">Keep Rolling</span>
                                    </div>
                                    <Button className="w-full font-medium bg-black/80 hover:bg-black active:bg-red-400 text-white py-2 rounded-lg"
                                            disabled={processing}>
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
                                        <span className="hover:scale-105 transform duration-200">Create</span>
                                    </Button>
                                </form>
                                <div className="max-w-[360px]">
                                    <p className="px-8 text-center text-sm text-muted-foreground">By clicking continue, you agree to our
                                        <a className="underline underline-offset-4 hover:text-primary" href="/terms">{" "}Terms of Service</a> and
                                        <a className="underline underline-offset-4 hover:text-primary" href="/privacy">{" "}Privacy Policy</a>.
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Register
