import { useState } from "react";
import type { FileObjType } from "../../../types/main";
export default function useDetailsModal() {

    const [modalVisible, setModalVisible] = useState(false)
    const [modalObj, setModalObj] = useState<FileObjType | null>(null)
    function openModal(fileObj: FileObjType) {

        setModalVisible(true)
        setModalObj(fileObj)
    }

    function closeModal(modalRef: React.RefObject<HTMLDivElement | null>, fadeOutClass: string, fadeInClass: string) {
        // play aanimation
        console.log('doing close modal')
        let modalEl = modalRef.current?.children[0] as HTMLDivElement
        modalEl?.classList.remove(fadeInClass)
        void modalEl?.offsetWidth
        modalEl?.classList.add(fadeOutClass)

        modalEl?.addEventListener('animationend', onCloseAnimEnd)
        function onCloseAnimEnd() {
            setModalVisible(false)
            modalEl?.removeEventListener('animationend', onCloseAnimEnd)
        }   
    }
    function toggleModal(fileObj: FileObjType, modalRef: React.RefObject<HTMLDivElement | null>, fadeOutClass, fadeInClass) {
        console.log('toggling modal', modalRef.current?.classList)
        if (modalObj == fileObj) {
            if (modalVisible) {
                closeModal(modalRef, fadeOutClass, fadeInClass)
            } else {
                console.log('----doing open modal')
                
                openModal(fileObj)
            }
        } else if (fileObj != modalObj) {
            setModalVisible(true)
            setModalObj(fileObj)
        } 
    }

    return {
        modalObj,
        setModalObj,
        modalVisible,
        openModal,
        closeModal,
        toggleModal,
    }

}