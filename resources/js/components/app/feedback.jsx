import React, {useState} from 'react';
import {toast} from "sonner"
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button"
import {Label} from "@/components/ui/label"
import {useQuery, useQueryClient} from "@tanstack/react-query"
import FroalaEditor from "react-froala-wysiwyg"
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins/align.min.js';
import 'font-awesome/css/font-awesome.css';
import 'froala-editor/js/third_party/font_awesome.min.js';
import {AlertCircle} from "lucide-react"

const config = {
    placeholderText: 'Edit Your Feedback Here!',
    charCounterCount: false
}

const regex = /<script.*?>.*?<\/script>/g

const Feedback = ({open, setOpen, user}) => {
    const client = useQueryClient()

    const [feedback, setFeedback] = useState()
    const {data} = useQuery({
        queryKey: ["feedback-request"],
        queryFn: async () => {
            const res = await axios.get(route('feedback.request'))
            return res.status === 200;
        },
        refetchOnWindowFocus: false,
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (regex.test(feedback)) {
            toast.error('Invalid feedback. Please try again.')
            return
        }
        const res = await axios.post(route('feedback.send'), {feedback})
        if (res.status === 200) {
            toast.success('Feedback submitted successfully!')
        } else {
            toast.error('An error occurred. Please try again later.')
        }
        await client.invalidateQueries(["feedback-request"])
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="[min-width:calc(min(80%,_700px))] max-h-screen p-4">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Provide Feedback</DialogTitle>
                        <DialogDescription>
                            We value your input. Please share your thoughts with us.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4 mt-4">
                        {!data ?
                        <div className="flex gap-4">
                            <AlertCircle color="red"/>
                            You have already provided feedback. Thank you!
                        </div> :
                        <div className="grid w-full gap-2">
                            <Label htmlFor="feedback">Your feedback</Label>
                            <FroalaEditor config={config} tag="textarea" onModelChange={(e) => setFeedback(e)}/>
                        </div>}
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={!data}>Submit Feedback</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default Feedback;
