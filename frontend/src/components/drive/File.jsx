import React, { useContext } from 'react';
import styles from '../../css/folder.module.css'
import {deleteFile, renameFile, shareFile, moveFile} from '../api/file'
import ActionForm from './ActionForm';
import DriveContext from './DriveContext';
const File = ({fileObj, onClickFile}) => {

    const {setRefesh} = useContext(DriveContext)
    console.log(fileObj);
    let {name, id} = fileObj

    function clickDeleteButton() {
        deleteFile(fileObj.id, setRefesh)
    }
    function clickShareButton() {
        
    }

    return (
        <div className={styles.folder}>
            <h2>File</h2>
            <button>Delete File</button>
            <button>Rename File</button>
            <button>Share File</button>
            <button>Move File</button>
            <button>Download File</button>
            <button>View Details</button>
        </div>
    );
}

export default File;
