import React, { useEffect, useRef, useState } from 'react'
import type { FolderObj } from '../../../types/main'
import mainStyles from './setcolor.module.css'
import colorImg from '../../../assets/set-color.svg'
import otherStyles from '../../../css/controls.module.css'
import confirmImg from '../../../assets/check.svg'
import cancelImg from '../../../assets/cancel.svg'
import iro from '@jaames/iro'

const styles = Object.assign({}, mainStyles, otherStyles)
type colorButtonProps = {
    folderObj: FolderObj
    toggleScaler: () => void,
    submitFunction: (color:string) => void
}
type colorModalProps = {
    visible: boolean
    currentColor: string | undefined
    folderName: string | undefined,
    folderId: number
    closeModal:(elementRef: React.RefObject<HTMLDivElement | null>) => void
    submitModal: (color: string, modalRef: React.RefObject<HTMLDivElement | null>) => void
}

function SetColor({folderObj, toggleScaler, submitFunction}: colorButtonProps) {


    const [visible, setVisible] = useState<boolean>(false)

 
 

    function openModal() {
        setVisible(true)
        toggleScaler()    
    }
    function closeModal(elementRef: React.RefObject<HTMLDivElement | null>){
        elementRef.current?.classList.remove(styles.modalFadeIn)
        void elementRef.current?.offsetWidth;
        elementRef.current?.classList.add(styles.modalFadeOut)
        elementRef.current?.addEventListener('animationend', onFadeOutEnd)
        function onFadeOutEnd () {
            elementRef.current?.removeEventListener('animationend', onFadeOutEnd)
            toggleScaler()
            setVisible(false)
        }
    }
    function submitModal (color: string, modalRef: React.RefObject<HTMLDivElement | null>) {
        submitFunction(color)
        closeModal(modalRef)
    }
       const modal = <ColorInputModal 
            visible={visible}
            currentColor={folderObj.color || '#a6cef3'}
            closeModal={closeModal}
            folderName={folderObj.name}
            folderId={0}
            submitModal={submitModal}
            ></ColorInputModal>

    return (
        <>        
        <button className={styles.controlButton} onClick={openModal}>
            <img className={styles.buttonImg }src={colorImg} alt="" />
            <div className={styles.btnText}>Set Color</div>
        </button>
        {modal}
        </>
        
    )
}


function ColorInputModal ({visible, currentColor, closeModal,folderName, submitModal}: colorModalProps) {

    const [color, setColor] = useState(currentColor)
    const elementRef = useRef<HTMLDivElement>(null)

    function stopPropag(e) {
        e.stopPropagation()
    }
    function clickSubmit() {
        submitModal(color as string, elementRef)
    }
    function closeForm() {
        closeModal(elementRef)
    }
    if (!visible) return null

    return (
        <div ref={elementRef} onClick={closeForm} className={styles.cover+` `+styles.modalFadeIn}>
            <div onClick={stopPropag}className={styles.colorModal}>

                <div className={styles.folderName}>{folderName}</div>
                <label className={styles.label} htmlFor="color">
                    Choose a new color
                </label>
                <ColorPicker
                    currentColor={currentColor}
                    setColor={setColor}
                >
                </ColorPicker>
                <div className={styles.formButtons}>
                    <div onClick={clickSubmit} className={styles.confirm}>
                        <img src={confirmImg} alt="" />
                    </div>
                    <div onClick={closeForm}className={styles.cancel}>
                        <img src={cancelImg} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )

    
}
function ColorPicker ({currentColor, setColor}) {

    const pickerParent = useRef<HTMLDivElement>(null)

    useEffect(() => {
    let parent = pickerParent.current as HTMLDivElement
    
        const colorPicker = iro.ColorPicker(parent, {
            color: currentColor,
            width: 160,
            layout: [
            { 
            component: iro.ui.Wheel,
            },
            { 
            component: iro.ui.Slider,
            },
        ]
    
        })
        function onColorChange (color) {
            setColor(color.hexString)
        }
        colorPicker.on('color:change', onColorChange)
        return () => {
            colorPicker.off('color:change', onColorChange)
            parent?.replaceChildren()
        }
    }, [pickerParent,currentColor, setColor]) 
    return <div ref={pickerParent}>aa </div>
    

}
export default SetColor