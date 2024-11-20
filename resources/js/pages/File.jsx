'use client'

import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import {Upload} from 'lucide-react'
import AppLayout from "@/layouts/AppLayout"
import {Button} from "@/components/ui/button"
import {toast} from "sonner"
import {Inertia} from "@inertiajs/inertia"

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

        Inertia.post(route('post_file'), formData, {
            onStart: () => console.log("Uploading..."),
            onFinish: (response) => console.log(response),
            onError: error => console.error(error)
        })
    }

    return (
        <div className="p-6 rounded-lg max-w-md mx-auto object-cover size-fit">
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
        </div>
    )
}

File.layout = page => <AppLayout children={page}/>

export default File
