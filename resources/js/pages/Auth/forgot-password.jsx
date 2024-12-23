import React, {useState} from 'react';
import {LockIcon, LucideMail} from "lucide-react"
import AppIcon from "@/components/app/app-icon"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {useForm} from "@inertiajs/react"
import {toast, Toaster} from "sonner"

const ForgotPassword = ({token, email}) => {
    const [isLoading, setIsLoading] = useState(false)
    const {data, post, setData} = useForm({
        email: email || '',
        password: '',
        password_confirmation: '',
        token: token
    })
    const handleSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault()
        if (!token) {
            const res = await axios.post(route('password.email'), data)
            if (res.data.status) {
                toast.success("An email has been sent to you.")
            }
        } else {
            const res = await axios.post(route('password.update'), data)
            if (res.data.status) {
                toast.success(res.data.status)
                setTimeout(() => location.href = route('login'), 2000)
            }
        }
        setIsLoading(false)
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-10 bg-gray-200">
            <Toaster/>
            <div className="flex items-center justify-center gap-3">
                <AppIcon classname="size-10"/>
                <span className="text-3xl font-medium text-gray-900">JustdoList</span>
            </div>
            <div className="flex flex-col gap-2 items-center min-w-[400px] justify-center bg-white p-8 rounded-md">
                <span className="mx-auto text-2xl font-inter font-semibold">Password Reset</span>
                <span className="py-5 text-center max-w-[550px]">
                    If you have forgotten your password,<br className="xl:hidden"/> you can reset it by entering your email address below.
                </span>
                <form className=" w-[80%] max-w-[400px] mb-10 flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="relative">
                        <Input className="pl-10 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                               name="email" type="email" id="email" required disabled={token}
                               value={email || data.email} onChange={e => setData('email', e.target.value)}
                               placeholder={"Enter your email address"}
                        />
                        <LucideMail className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400 dark:text-gray-500"/>
                    </div>
                    {(token || email) && (
                        <>
                            <div className="relative">
                                <Input className="pl-10 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                       name="password" type="password" id="password" required
                                       value={data.password} onChange={e => setData('password', e.target.value)}
                                       placeholder={"Enter your new password"}
                                />
                                <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400 dark:text-gray-500"/>
                            </div>
                            <div className="relative">
                                <Input className="pl-10 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                       name="password_confirmation" type="password" id="password_confirmation" required
                                       value={data.password_confirmation} onChange={e => setData('password_confirmation', e.target.value)}
                                       placeholder={"Enter your new password"}
                                />
                                <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400 dark:text-gray-500"/>
                            </div>
                        </>
                    )}

                </form>
                <div className="flex items-center justify-end gap-3">
                    <Button variant='outline' onClick={() => location.href = "/login"}>Get Back</Button>
                    <Button className="" onClick={handleSubmit} disabled={isLoading}>
                        {isLoading &&
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
                        Reset Password
                    </Button>
                </div>
            </div>
        </main>
    );
};

export default ForgotPassword;
