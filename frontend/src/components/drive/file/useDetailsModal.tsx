import { useState } from "react";
import type { FileObjType } from "../../../types/main";
export default function useDetailsModal() {

    const [modalVisible, setModalVisible] = useState(false)
    const [modalObj, setModalObj] = useState<FileObjType | null>(null)
    function openModal(fileObj: FileObjType) {
        setModalVisible(true)
        setModalObj(fileObj)
    }
    function closeModal() {
        setModalVisible(false)
    }
    function toggleModal(fileObj: FileObjType) {
        if (modalObj == fileObj) {
            setModalVisible(v => !v)
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