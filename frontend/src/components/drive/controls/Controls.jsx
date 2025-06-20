import React, { useState, useRef } from 'react'
import styles from '../../../css/controls.module.css'
import {RenameButton, ShareButton, DeleteButton, StarButton, DownloadButton} from './ControlButtons'
import wrenchIcon from '../../../assets/wrench.svg'
import MoveButton from './MoveModal/MoveButton'


    
function Controls({toMoveId, forFile=false, onSubmits, controlsOpenPrio, toggleScaler, isValids}) {

    let [visible, setVisible] = useState(false)
    let controlsRef = useRef()
    let wrenchRef = useRef()
    function animateWrench() {
        function removeShake() {
                wrenchRef.current.classList.remove(styles.wrenchShake)
                wrenchRef.current.removeEventListener('animationend', removeShake)
            }
            wrenchRef.current.classList.add(styles.wrenchShake)
            wrenchRef.current.addEventListener('animationend', removeShake)
    }
    function handleClick() {
        if (visible) {
            setVisible(false)   
            controlsOpenPrio() 
            animateWrench()
        } else {
            setVisible(true)
            document.addEventListener('click', closeControls)
            controlsOpenPrio()
            animateWrench()
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
                toMoveId={toMoveId}
                visible={visible}
                forFile={forFile}
                onSubmits={onSubmits}
                ref = {controlsRef}
                toggleScaler={toggleScaler}
                isValids={isValids}
            />
        </>
    )
}

let ControlsList = React.forwardRef(({toMoveId, visible, forFile, onSubmits, toggleScaler, isValids}, ref) => {

    if (!visible) return null;
    return (
        <div className={styles.foldingWrapper}>    
            <div ref={ref} id="controls" className={styles.controlsList}>

                <RenameButton
                    forFile={forFile}
                    submitFunction={onSubmits[0]}
                    toggleScaler={toggleScaler}
                    isValid={isValids[0]}
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
                <MoveButton
                    toMoveId={toMoveId}
                    forFile={forFile}
                    toggleScaler={toggleScaler}
                ></MoveButton>
                {!forFile ? null :
                    <DownloadButton
                        submitFunction={onSubmits[4]}
                    />
                }
            </div>
            <div className={styles.heightFixer}></div>
        </div>
    )
})

export default Controls

