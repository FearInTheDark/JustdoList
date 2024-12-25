import React from 'react';
import {Dialog, DialogContent} from "@/components/ui/dialog"

const ImagePresent = ({img, setOpen}) => {
    return (
        <Dialog open={img} onOpenChange={setOpen}>
            <DialogContent className="p-0 size-fit overflow-hidden">
                <img src={img} alt="Image" className="object-cover"/>
            </DialogContent>
        </Dialog>
    );
};

export default ImagePresent;
