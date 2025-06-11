import React, { useContext, useState, useRef } from 'react';
    import childrenStyles from '../../../css/children.module.css'
import {deleteFile, renameFile, shareFile, moveFile, downloadFile, starFile} from '../../api/file'
import DriveContext from '../DriveContext';
import FileDetails from './FileDetails';
import fileIcon from '../../../assets/file.svg'
import Controls from '../controls/Controls';
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
    let fileRef = useRef()

    let {name, id, link} = fileObj

    function DeleteFile() {
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
    function StarFile() {
        starFile(id, setRefresh)
    }
    function controlsOpenPrio() {
        fileRef.current.classList.toggle(styles.zprio)
    }
    function toggleScaler() {
        console.log('toggling scaler');
        fileRef.current.classList.toggle(styles.childScaler)
    }
    let onSubmits = [submitRenameForm, submitShareForm, DeleteFile, StarFile]


    return (
        <div ref={fileRef} className={styles.file + ` ` + styles.childScaler}>
            <div className={styles.fileIcon}>
                <img src={fileIcon} alt="" />
            </div>
            <div>{name}</div>
            <Controls
                forFile={true}
                onSubmits={onSubmits}
                controlsOpenPrio={controlsOpenPrio}
                toggleScaler={toggleScaler}
            />
        </div>
    );
}

export default File;
