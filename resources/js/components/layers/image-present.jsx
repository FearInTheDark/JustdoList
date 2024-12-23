import React from 'react';
import {Dialog, DialogContent} from "@/components/ui/dialog"

const ImagePresent = ({img, setOpen}) => {
    return (
        <Dialog open={img} onOpenChange={setOpen}>
            <DialogContent className="p-0">
                <img src={img} alt="Image" className="object-contain"/>
            </DialogContent>
        </Dialog>
    );
};

export default ImagePresent;
