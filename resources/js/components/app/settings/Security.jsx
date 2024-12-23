import React, {useState} from 'react';
import {toast} from "sonner"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {AlertCircle, KeyRound, Shield, Smartphone} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Switch} from "@/components/ui/switch"
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"

const Security = (user, setUser) => {
    const [isOpen, setIsOpen] = useState(false)
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleDelete = async () => {
        try {
            const res = await axios.delete(route('users.destroy', {user: user.id}), {
                data: {password},
            });

            if (res.status === 200) {
                toast('User deleted successfully.');
                setIsOpen(false)
                window.location.href = '/';
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data) {
                toast(error.response.data.message || 'Error deleting user. Please try again.');
                setError(error.response.data.message)
            } else {
                toast('An unexpected error occurred.');
            }
        }

    }
    return (
        <div className="w-full max-w-3xl mx-auto p-6 space-y-6">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold">Security Settings</h1>
                <p className="text-muted-foreground">
                    Manage your account security and authentication preferences
                </p>
            </div>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <KeyRound className="h-5 w-5"/>
                            Password
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <p className="text-sm text-muted-foreground mb-4">
                                Last changed 3 months ago
                            </p>
                            <Button>Change password</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Smartphone className="h-5 w-5"/>
                            Two-Factor Authentication
                        </CardTitle>
                        <CardDescription>
                            Add an extra layer of security to your account by requiring more than just a password to sign in.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <div className="font-medium">Authenticator app</div>
                                <div className="text-sm text-muted-foreground">
                                    Use an authentication app to generate one-time codes.
                                </div>
                            </div>
                            <Switch/>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <div className="font-medium">SMS recovery</div>
                                <div className="text-sm text-muted-foreground">
                                    Get codes sent to your phone for backup access.
                                </div>
                            </div>
                            <Switch/>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="h-5 w-5"/>
                            Security Log
                        </CardTitle>
                        <CardDescription>
                            Review your account activity and security events
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline">View security log</Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-red-600">
                            <AlertCircle className="h-5 w-5"/>
                            Danger Zone
                        </CardTitle>
                        <CardDescription>
                            Irreversible and destructive actions
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <div className="font-medium">Delete account</div>
                            <p className="text-sm text-muted-foreground">
                                Permanently delete your account and all associated data.
                                This action cannot be undone.
                            </p>
                            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="destructive">Delete account</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px] p-6">
                                    <DialogHeader>
                                        <DialogTitle className="flex items-center gap-2 text-red-600">
                                            <AlertCircle className="h-5 w-5"/>
                                            Delete Account
                                        </DialogTitle>
                                        <DialogDescription>
                                            This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="password" className="text-red-400">
                                                Type your account password to confirm
                                            </Label>
                                            <Input
                                                type="password"
                                                name="password"
                                                id="password"
                                                value={password}
                                                onChange={(e) => {
                                                    setPassword(e.target.value)
                                                    setError('')
                                                }}
                                                className="border-red-300 focus-visible:ring-red-500"
                                            />
                                            {error && <p className="text-sm text-red-600">{error}</p>}
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                                        <Button variant="destructive" onClick={handleDelete}>Delete Account</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog></div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}


export default Security;
