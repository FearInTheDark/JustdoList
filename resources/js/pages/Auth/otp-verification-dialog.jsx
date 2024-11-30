import React, {useState} from "react"
import {Button} from "@/components/ui/button"
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {toast, Toaster} from "sonner"
import {InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot} from "@/components/ui/input-otp"

const isDigit = (value) => /^\d+$/.test(value)

const OtpVerificationDialog = () => {
    const [open, setOpen] = useState(false)
    const [otp, setOtp] = useState(null)
    const [isLoading, setIsLoading] = useState()

    const requestVerification = async () => {
        try {
            setIsLoading(true)
            const res = await axios.post(route('email-send'));
            if (res.data.message) {
                setIsLoading(false)
                setOpen(true)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(route('otp-verify'), {otp})
            if (res.data.message) {
                setOpen(false)
                toast.success(res.data.message)
                setTimeout(() => {
                    window.location.href = route('home')
                }, 2000)
            }
        } catch (e) {
            console.log(e)
        }
    }
    console.log(otp)

    return (
        <>
            <Toaster/>
            <Button onClick={() => requestVerification()} disabled={isLoading}>
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

                Verify OTP
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px] p-6">
                    <DialogHeader>
                        <DialogTitle>Enter OTP</DialogTitle>
                        <DialogDescription>
                            Please enter the 6-digit code sent to your device.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4 place-items-center">
                        <InputOTP maxLength={8} onChange={e => setOtp(e)}>
                            <InputOTPGroup>
                                <InputOTPSlot index={0}/>
                                <InputOTPSlot index={1}/>
                                <InputOTPSlot index={2}/>
                                <InputOTPSlot index={3}/>
                            </InputOTPGroup>
                            <InputOTPSeparator/>
                            <InputOTPGroup>
                                <InputOTPSlot index={4}/>
                                <InputOTPSlot index={5}/>
                                <InputOTPSlot index={6}/>
                                <InputOTPSlot index={7}/>
                            </InputOTPGroup>
                        </InputOTP>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" onClick={handleSubmit} disabled={otp?.length !== 8}>
                            Verify
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default OtpVerificationDialog
