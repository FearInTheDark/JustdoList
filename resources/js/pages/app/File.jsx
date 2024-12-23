'use client'

import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import {Upload} from 'lucide-react'
import AppLayout from "@/layouts/AppLayout"
import {Button} from "@/components/ui/button"
import {toast} from "sonner"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"

const SHEET_SIDES = ["top", "right", "bottom", "left"]


const File = () => {
    const [file, setFiles] = useState()

    const onDrop = useCallback((files) => {
        setFiles(files[0])
    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.svg']
        },
        multiple: false,
        // Max 5MB
        maxSize: 5242880,
        onDropAccepted: files => {
            toast("File has been dropped", {
                description: () => `File: ${files}`,
                action: {
                    label: "OK",
                    onClick: () => {}
                }
            })
        }
    })

    const removeFile = () => {
        setFiles(null)
    }

    const handleClick = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('file', file);

        try {
            await axios.post(route('post_file'), formData)
            location.reload()
        } catch (e) {
            console.log(e);
        }
    }

    const handleBtn = async () => {
        const res = await axios.get(route('summarize-last-week'))
        console.log(res.data)
    }

    return (
        <div className="p-6 rounded-lg max-w-md mx-auto object-cover size-fit flex flex-col gap-2">
            {file ? (
                <>
                    <div className="mt-6">
                        <h4 className="text-lg font-semibold mb-3">Uploaded Files:</h4>
                        <li className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                            <img src={URL.createObjectURL(file)} alt="Image" className="rounded-md filter drop-shadow-md"/>
                        </li>
                    </div>
                    <Button onClick={removeFile} className="mt-4" variant="outline">Remove</Button>
                    <Button variant="default" className="ml-3 bg-blue-400" onClick={handleClick}>Save</Button>
                </>

            ) : <div
                {...getRootProps()}
                className={`p-8 border-4 border-dashed rounded-lg text-center cursor-pointer transition-colors
                ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}>
                <input {...getInputProps()} />
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4"/>
                {isDragActive ? (<p className="text-lg font-semibold text-blue-500">Drop the images here ...</p>) : (
                    <p className="text-lg font-semibold text-gray-700">
                        Drag 'n' drop some images here, or click to select files
                    </p>
                )}
                <p className="text-sm text-gray-500 mt-2">Only *.jpeg, *.jpg, *.png and *.gif images will be accepted</p>
            </div>}
            <div className="grid grid-cols-2 gap-2">
                {SHEET_SIDES.map((side) => (
                    <Sheet key={side}>
                        <SheetTrigger asChild>
                            <Button variant="outline">{side}</Button>
                        </SheetTrigger>
                        <SheetContent side={side}>
                            <SheetHeader>
                                <SheetTitle>Edit profile</SheetTitle>
                                <SheetDescription>
                                    Make changes to your profile here. Click save when you're done.
                                </SheetDescription>
                            </SheetHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Name
                                    </Label>
                                    <Input id="name" value="Pedro Duarte" className="col-span-3"/>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="username" className="text-right">
                                        Username
                                    </Label>
                                    <Input id="username" value="@peduarte" className="col-span-3"/>
                                </div>
                            </div>
                            <SheetFooter>
                                <SheetClose asChild>
                                    <Button type="submit">Save changes</Button>
                                </SheetClose>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                ))}
            </div>
            <div className="flex items-center justify-center">
                <Button onClick={handleBtn}>Click me</Button>
            </div>
        </div>
    )
}

File.layout = page => <AppLayout children={page}/>

export default File
