import React, {useState} from 'react';
import {Dialog, DialogContent, DialogFooter} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {LockIcon} from "lucide-react"
import {Button} from "@/components/ui/button"
import {usePage} from "@inertiajs/react"
import {toast} from "sonner"

const DeleteConfirmation = ({open, setOpen}) => {
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState('')
    const {user} = usePage().props

    const handleDelete = async () => {
        setLoading(true)
        try {
            const res = await axios.delete(route('users.destroy', {user: user.id}), {
                data: {password},
            });

            if (res.status === 200) {
                toast('User deleted successfully.');
                window.location.href = '/';
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data) {
                toast(error.response.data.message || 'Error deleting user. Please try again.');
            } else {
                toast('An unexpected error occurred.');
            }
        }
        setLoading(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="p-2">
                <div className="flex size-full flex-col gap-3">
                    <span className="text-lg font-semibold font-tiktok mx-auto">Delete Confirmation</span>

                    <span className="text-center">
                        You are about to delete this account. <br/>
                        Please confirm your password to proceed or cancel to abort.
                    </span>

                    <div className="relative mx-auto">
                        <Input className="pl-10 dark:bg-gray-700 dark:text-white dark:border-gray-600 w-[300px]"
                               name="password" type="password" id="password" required
                               value={password} onChange={(e) => setPassword(e.target.value)}
                               placeholder={"Enter your password"}
                        />
                        <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400 dark:text-gray-500"/>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(pre => !pre)}>Cancel</Button>
                    <Button onClick={handleDelete} disabled={loading}>Delete !!!</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteConfirmation;
