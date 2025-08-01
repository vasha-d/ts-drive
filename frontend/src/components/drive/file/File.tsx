import React, { useContext, useState, useRef } from 'react';
    import childrenStyles from '../../../css/children.module.css'
import {deleteFile, renameFile, shareFile, moveFile, downloadFile, starFile} from '../../api/file'
import DriveContext from '../DriveContext';
import FileDetails from './FileDetails';
import fileIcon from '../../../assets/file.svg'
import Controls from '../controls/Controls';
import starIcon from '../../../assets/star-enabled.svg'

let styles = Object.assign({}, childrenStyles)


const File = ({fileObj}) => {
    const {setRefresh} = useContext(DriveContext)
    const fileRef = useRef(null)
    const {name, id, link} = fileObj
    console.log(fileObj)
    console.log('entered file')
    function DeleteFile() {
        deleteFile(fileObj.id, setRefresh)
    }
    function clickViewDetails() {

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
    function clickDownloadFile() {
        downloadFile(id)
    }
    function controlsOpenPrio() {
        fileRef.current.classList.toggle(styles.controlsOpenPrio)
    }
    function toggleScaler() {
        console.log('toggling scaler');
        fileRef.current?.classList.toggle(styles.childScaler)
        fileRef.current?.classList.toggle(styles.modalOpenPrio)
    }
    let onSubmits = [submitRenameForm, submitShareForm, DeleteFile, StarFile, clickDownloadFile]
    function renameValid(newName) {
        let nameEmpty = newName.trim() == ''
        console.log(fileObj);
        let nameTaken = !!(fileObj.parentFolder.childrenFolders.some(f => {
                return f.name == newName
            })) 
        if (nameEmpty) {return 'Name cannot be empty!'}
        if (nameTaken) {return 'Folder with that name already exists!'}
        return 'valid'
    }
    function shareValid(username) {
        let nameEmpty = username.trim() == ''
        if (nameEmpty) {return 'Name cannot be empty'}
        return 'valid'
    }
    let isValids = [renameValid, shareValid]
    const starImg = !fileObj.starred ? null: 
                <div className={styles.star}>
                    <img className={styles.starSpin} src={starIcon} alt="" />
                </div>   
    return (
        <div ref={fileRef} className={styles.file + ` ` + styles.childScaler}>
            <div className={styles.fileIcon}>
                <img src={fileIcon} alt="" />
            </div>
            <div>{name + fileObj.extension}</div>
             <div className={styles.iconRow}>
                {starImg}
                <Controls
                    toMoveId={fileObj.id}
                    forFile={true}
                    onSubmits={onSubmits}
                    controlsOpenPrio={controlsOpenPrio}
                    toggleScaler={toggleScaler}
                    isValids={isValids}
                />
            </div>
        </div>
    );
}

export default File;
