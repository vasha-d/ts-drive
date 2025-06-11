import React, { useState, useRef } from 'react'
import styles from '../../../css/controls.module.css'
import {RenameButton, ShareButton, DeleteButton, StarButton} from './ControlButtons'
import wrenchIcon from '../../../assets/wrench.svg'

/* Both: Rename, Share, Delete, Star, Move
 * File only: download, view details 
 * Each button will have submit, so submit delete or submitRename
 * Button = {onSubmit, buttonText, buttonImg, form}
 * Form = {formText, placeHolder, defaultValue, submitForm}
 * FormButton makes it so that form is create and handle when buutton is clicked
*/

function Controls({forFile=false, onSubmits, controlsOpenPrio, toggleScaler}) {

    let [visible, setVisible] = useState(false)
    let controlsRef = useRef()
    let wrenchRef = useRef()
    function handleClick(e) {
        if (visible) {
            setVisible(false)   
            controlsOpenPrio() 
        } else {
            setVisible(true)
            document.addEventListener('click', closeControls)
            controlsOpenPrio()
        }
    }   
    function closeControls(e) {
        if (!controlsRef.current || !wrenchRef.current) return;
        let clickedInsideControls = controlsRef.current.contains(e.target)
        let clickedWrench = wrenchRef.current.contains(e.target)
        if (clickedInsideControls || clickedWrench) return;
        setVisible(false)
        document.removeEventListener('click', closeControls)    
        controlsOpenPrio()
    }               
    return (    
        <>
            <div ref={wrenchRef}onClick={handleClick} id="controls" className={styles.openControls}>
                <img src={wrenchIcon} alt="" />
            </div>            
            <ControlsList
                visible={visible}
                forFile={forFile}
                onSubmits={onSubmits}
                ref = {controlsRef}
                toggleScaler={toggleScaler}
            />
        </>
    )
}

let ControlsList = React.forwardRef(({visible, forFile, onSubmits, toggleScaler}, ref) => {

    if (!visible) return null;
    return (
        <div ref={ref} id="controls" className={styles.controlsList}>
            <RenameButton 
                forFile={forFile}
                submitFunction={onSubmits[0]}
                toggleScaler={toggleScaler}
            />
            <ShareButton 
                forFile={forFile}
                submitFunction={onSubmits[1]}
                toggleScaler={toggleScaler}
            />
            <DeleteButton
                forFile={forFile}
                submitFunction={onSubmits[2]}
            />
            <StarButton
                forFile={forFile}
                submitFunction={onSubmits[3]}
            />
        </div>
    )
})

export default Controls

