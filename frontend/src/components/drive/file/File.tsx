import  { useContext, useRef } from 'react';
    import childrenStyles from '../../../css/children.module.css'
import {deleteFile, renameFile, shareFile, downloadFile, starFile} from '../../api/file'
import DriveContext from '../DriveContext';
import FileDetails from './FileDetails';
import fileIcon from '../../../assets/file.svg'
import Controls from '../controls/Controls';
import type { DriveContextType, FileObjType, FolderObj} from '../../../types/main';
let styles = Object.assign({}, childrenStyles)
import type { setResultType, setInProgressType } from "../../../types/statusTypes";

type FileProps = {
    fileObj: FileObjType,
    toggleModal: (fileObj: FileObjType) => void,
    setResult: setResultType,
    setInProgress: setInProgressType
}

const File = ({fileObj, toggleModal, setInProgress, setResult}: FileProps) => {
    const {setRefresh} = useContext<DriveContextType>(DriveContext)
    const fileRef = useRef<HTMLDivElement>(null)
    const {name, id} = fileObj
    function DeleteFile() {
        setInProgress('Delete File')

        deleteFile(fileObj.id, setRefresh)
       .then(() => {
            setResult('success')
        }).catch(() => [
            setResult('failure')
        ])
    }
    function submitShareForm(usernameToShareWith) {
        setInProgress('Share File')
        shareFile(id, usernameToShareWith, setRefresh)
        .then(() => {
            setResult('success')
        }).catch(() => [
            setResult('failure')
        ])
    }
    function submitRenameForm(newName) {
        setInProgress('Rename File')

        renameFile(id, newName, setRefresh)
       .then(() => {
            setResult('success')
        }).catch(() => [
            setResult('failure')
        ])
    }
    function StarFile() {
        const floaterText = fileObj.starred ? 'Unstar File' : 'Star File'
        setInProgress(floaterText)
        starFile(id, setRefresh)
        .then(() => {
            setResult('success')
        }).catch(() => [
            setResult('failure')
        ])
    }
    function clickDownloadFile() {
        setInProgress('Download File')
    
        downloadFile(id)
       .then(() => {
            setResult('success')
        }).catch(() => [
            setResult('failure')
        ])
    }
    function controlsOpenPrio() {
        fileRef.current?.classList.toggle(styles.controlsOpenPrio)
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
        let nameTaken = !!(fileObj.parentFolder.childrenFolders.some((f: FolderObj) => {
                if('name' in f) {
                    return f.name == newName
                } else  {
                    
                    return false 
                }
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

    return (
        <div ref={fileRef} className={styles.file + ` ` + styles.childScaler}>
            <div className={styles.fileIcon}>
                <img src={fileIcon} alt="" />
            </div>
            <div className={styles.childText}>{name + fileObj.extension}</div>
             <div className={styles.iconRow}>
                <FileDetails fileObj={fileObj}
                    toggleModal={toggleModal}
                />
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
