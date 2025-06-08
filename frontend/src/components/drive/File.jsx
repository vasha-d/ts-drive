import React, { useContext, useState, useRef, useEffect } from 'react';
import childrenStyles from '../../css/children.module.css'
import {deleteFile, renameFile, shareFile, moveFile, downloadFile, starFile} from '../api/file'
import PatchButton from './PatchButton';
import DriveContext from './DriveContext';
import FileDetails from './FileDetails';
import wrenchIcon from '../../assets/wrench.svg'
import fileIcon from '../../assets/file.svg'
let styles = Object.assign({}, childrenStyles)


function isTargetControls (e, current) {
    let children = current.children[0]
    let nested = children.children[0]
    let all = [children, nested]
    
    return all.includes(e.target)
}


const File = ({fileObj}) => {

    const {setRefresh} = useContext(DriveContext)
    const [controlsOpen, setControlsOpen] = useState(false)
    const wrenchRef = useRef()
    let controlsRef = useRef()

    let {name, id, link} = fileObj

    function clickDeleteButton() {
        deleteFile(fileObj.id, setRefresh)
    }
    function clickViewDetails() {

    }
    function clickDownloadFile () {
        downloadFile(link, name)

    }
    function submitShareForm(usernameToShareWith) {
        shareFile(id, usernameToShareWith, setRefresh)
    }
    function submitRenameForm(newName) {
        renameFile(id, newName, setRefresh)
    }
    function submitMoveForm(newParentId) {
        moveFile(id, newParentId, setRefresh)
    }
    function clickStarFile() {
        starFile(id, setRefresh)
    }
    function clickOpenControls(e) {
        let button = wrenchRef.current
        console.log(button);
        button.classList.remove(styles.wrenchShake)

        void button.clientWidth

        console.log(button);
        button.classList.add(styles.wrenchShake)
        setControlsOpen(o => !o)
    }
    useEffect(() => {
        function closeControls (e) {
            if (isTargetControls(e, controlsRef.current)) return;
            setControlsOpen(false)
        }   
        if (controlsOpen) {
            controlsRef.current.classList.add(styles.zprio)
            document.addEventListener('click', closeControls)
        } else {
            controlsRef.current.classList.remove(styles.zprio)
            document.removeEventListener('click', closeControls)

        }

        return () => {
            document.removeEventListener('click', closeControls)
        }

    }, [controlsOpen])
    let controls = !controlsOpen ? null : 
        <div className={styles.controls}>
            <PatchButton
                buttonText={'Rename File'}
                onSubmit={submitRenameForm}
                defaultValue={name}
            ></PatchButton>
            <PatchButton
                buttonText={'Share File'}
                onSubmit={submitShareForm}
            ></PatchButton>
            <button onClick={clickDeleteButton}>Delete File</button>
            <button>Move File</button>
            <button onClick={clickDownloadFile}>Download File</button>
            <button onClick={clickStarFile}>Star File</button>
            <FileDetails fileObj={fileObj}></FileDetails>
            {fileObj.starred ? `Starred!!!` : `Not Starred`}
        </div>

    return (
        <div className={styles.file}>
            <div className={styles.fileIcon}>
                <img src={fileIcon} alt="" />
            </div>
            <div>{name}</div>

            <div ref={controlsRef} className={styles.openControlsWrapper}>
                <div onClick={clickOpenControls} className={styles.openControls}>
                    <img ref={wrenchRef} src={wrenchIcon} className={styles.wrench} alt="" />
                </div>
                {controls}
            </div>
        </div>
    );
}

export default File;
