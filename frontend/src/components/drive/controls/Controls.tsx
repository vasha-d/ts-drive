import React, { useState, useRef } from 'react'
import styles from '../../../css/controls.module.css'
import {RenameButton, ShareButton, DeleteButton, StarButton, DownloadButton} from './ControlButtons'
import wrenchIcon from '../../../assets/wrench.svg'
import MoveButton from './MoveModal/MoveButton'
import SetColor from './SetColor'


    
function Controls({toMoveId, forFile=false, onSubmits, controlsOpenPrio, toggleScaler, isValids, folderObj=null}) {

    let [visible, setVisible] = useState(false)
    let [adjustPosition, setAdjustPosition] = useState([false, false])
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
            positionRelativeToPage()
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
    function positionRelativeToPage() {
        const elemHeight = 160 + 40 * !!forFile
        const elemWidth = 150 + 20
        
        const positions = wrenchRef.current.getBoundingClientRect()
        const overflowingBottom = positions.bottom + elemHeight> window.innerHeight
        const overflowingRight = positions.right + elemWidth > window.innerWidth
        
        setAdjustPosition([overflowingRight, overflowingBottom])
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
                adjustPosition={adjustPosition}
                folderObj={folderObj}
            />
        </>
    )
}

let ControlsList = React.forwardRef(({folderObj, toMoveId, visible, forFile, onSubmits, toggleScaler, isValids, adjustPosition}, ref) => {

    if (!visible) return null;

    let classes = styles.foldingWrapper
    console.log(adjustPosition);
    if (adjustPosition[0]) classes += ` ${styles.adjustHorizontal}`
    if (adjustPosition[1]) classes += ` ${styles.adjustVertical}`
    console.log(classes, styles.adjustHorizontal);

    return (
        <div className={classes}>    
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
                    isValid={isValids[1]}
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

                {forFile ? null : 
                <SetColor
                    folderName='dummy string'
                    folderId={0}
                    toggleScaler={toggleScaler}
                    submitFunction={onSubmits[4]}
                    folderObj={folderObj}
                ></SetColor>}
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

