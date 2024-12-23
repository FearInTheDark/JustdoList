import React, {useRef} from 'react';
import {useDropzone} from "react-dropzone"
import {toast} from "sonner"
import {Upload} from "lucide-react"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Button} from "@/components/ui/button"
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import {Switch} from "@/components/ui/switch"

const Profile = (user, setUser) => {
    const fileInputRef = useRef(null);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.svg']
        },
        multiple: false,
        maxSize: 5242880,
        onDropAccepted: async (files) => {
            const formData = new FormData()
            formData.append('file', files[0])
            const res = await axios.post(route('post_file'), formData)
            if (res.status === 200) {
                toast("File has been dropped", {
                    description: () => `File: ${files[0].name}`,
                    action: {
                        label: "OK",
                        onClick: () => {}
                    }
                })
                setTimeout(() => setUser(pre => ({...pre, image: res.data.file.split('/')[2]})), 2000)
            }
        }
    })

    const handleChangePhotoClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log('Selected file:', file);
        }
    };
    return (
        <div className="w-full max-w-2xl mx-auto p-6 space-y-8">
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Photo</h3>
                <div className="flex items-center gap-4">
                    <div className="" {...getRootProps()}>
                        <input {...getInputProps()} ref={fileInputRef}/>
                        {isDragActive ?
                            <div className="relative w-32 h-32 flex justify-center items-center">
                                <div className="absolute size-full  rounded-full border-4 border-dashed border-blue-500 animate-spin duration-100 [animation-duration:10000ms]"></div>
                                <Upload className="absolute w-12 h-12 text-gray-400 mx-auto mb-4"/>
                            </div>
                            : <Avatar className="w-32 h-32 cursor-pointer">
                                <AvatarImage src={`/storage/app/avatars/${user.image || 'default.jpg'}`} alt="Profile photo" className="rounded-full p-0.5 border-2 object-cover"/>
                                <AvatarFallback>VP</AvatarFallback>
                            </Avatar>
                        }
                    </div>
                    <div className="space-y-2">
                        <div className="flex gap-2">
                            <Button variant="secondary" onClick={handleChangePhotoClick}>Change photo</Button>
                            <Button variant="outline" className="text-red-500">Remove photo</Button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Pick a photo up to 4MB. Your avatar photo will be public.
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <div className="relative">
                    <Input
                        id="name"
                        defaultValue="Anonymous"
                        maxLength={255}
                        value={user.name}
                    />
                    <span className="absolute right-2 top-2.5 text-sm text-muted-foreground">
            7/255
          </span>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="space-y-2">
                    <Input
                        id="email"
                        type="email"
                        defaultValue="example@mail.com"
                        value={user.email}
                        disabled
                    />
                    <Button variant="secondary" onClick={() => toast.error("Unavailable")}>Change email</Button>
                </div>
            </div>

            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Password</h3>
                <Button variant="secondary">Add password</Button>
            </div>

            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Two-factor authentication</h3>
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label htmlFor="2fa">2FA is disabled on your JustdoList account.</Label>
                    </div>
                    <Switch id="2fa"/>
                </div>
            </div>
        </div>
    )
}


export default Profile;
