import React from 'react';
import {Modal, ModalBody, ModalContent, ModalTrigger} from "@/components/ui/AnimatedModal";
import {WhiteRainbowButton} from "@/components/ui/WhiteRainbowButton";

const AniModal = () => {
    return (
        <div>
            <Modal>
                <ModalTrigger>
                    <WhiteRainbowButton>
                        That's shit
                    </WhiteRainbowButton>
                </ModalTrigger>
                <ModalBody>
                    <ModalContent>
                        <div className="w-[100px] aspect-square rounded-lg shadow border m-3 p-3">

                        </div>
                    </ModalContent>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default AniModal;
