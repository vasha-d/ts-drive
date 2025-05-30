import React, { useContext } from 'react';
import styles from '../../css/folder.module.css'
import {deleteFile, renameFile, shareFile, moveFile, downloadFile} from '../api/file'
import PatchButton from './PatchButton';
import DriveContext from './DriveContext';
import FileDetails from './FileDetails';
const File = ({fileObj, onClickFile}) => {

    const {setRefresh} = useContext(DriveContext)
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


    return (
        <div className={styles.folder}>
            <h2>{name}</h2>
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
            <FileDetails fileObj={fileObj}></FileDetails>
        </div>
    );
}

export default File;
