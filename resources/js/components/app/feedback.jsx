import React, {useState} from 'react';
import {toast} from "sonner"
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import {useQuery} from "@tanstack/react-query"
import FroalaEditor from "react-froala-wysiwyg"

const Feedback = ({open, setOpen, user}) => {
    const [feedback, setFeedback] = useState("")
    const {data} = useQuery({
        queryKey: ["feedback-request"],
        queryFn: async () => {
            const res = await axios.get(route('feedback.request'))
            console.log(res)
            return res.status === 200;
        },
        refetchOnWindowFocus: false,
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (feedback.trim()) {
            console.log("Feedback submitted:", feedback)
            toast({
                title: "Feedback Submitted",
                description: "Thank you for your feedback!",
            })
            setFeedback("")
            setOpen(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px] max-h-screen p-4">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Provide Feedback</DialogTitle>
                        <DialogDescription>
                            We value your input. Please share your thoughts with us.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid w-full gap-1.5">
                            <Label htmlFor="feedback">Your feedback</Label>
                            {/*<Textarea*/}
                            {/*    id="feedback"*/}
                            {/*    placeholder="Type your feedback here."*/}
                            {/*    value={feedback}*/}
                            {/*    disabled={!data}*/}
                            {/*    onChange={(e) => setFeedback(e.target.value)}*/}
                            {/*    className="min-h-[100px]"*/}
                            {/*/>*/}
                            <FroalaEditor/>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={!feedback.trim()}>Submit Feedback</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default Feedback;
