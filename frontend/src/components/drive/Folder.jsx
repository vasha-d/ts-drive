import { useState } from 'react';
import styles from '../../css/folder.module.css'
import { useContext } from 'react';
import DriveContext from './DriveContext';
import PatchButton from './PatchButton';
import { renameFolder, shareFolder, deleteFolder, starFolder } from '../api/folder';

const Folder = ({folderObj}) => {
    let {name, id} = folderObj
    let {setCurrentFolderId, setRefresh} = useContext(DriveContext)
    function handleClick(e) {
        if (e.target !== e.currentTarget) return;
        setCurrentFolderId(id)
    }
    function submitRenameForm(newName) {
        renameFolder(id, newName, setRefresh)
    }
    function submitShareForm(usernameToShareWith) {
        shareFolder(id, usernameToShareWith, setRefresh)
    }
    function clickDeleteFolder() {
        deleteFolder(id, setRefresh)
    }
    function clickStarFolder() {
        starFolder(id, setRefresh)
    }
    return (
        <div className={styles.folder}onClick={handleClick}>
            <h2>Folder</h2>
            {name}
            <div className={styles.controls}>
                <PatchButton 
                    buttonText={'Rename Folder'}
                    onSubmit = {submitRenameForm}
                    defaultValue={name}
                ></PatchButton>
                <PatchButton 
                    buttonText={'Share Folder'}
                    onSubmit= {submitShareForm}
                ></PatchButton>
                <button onClick={clickDeleteFolder}>Delete Folder</button>
                <button onClick={clickStarFolder}>Star Folder</button>
                {folderObj.starred ? `Starred!!!` : `Not Starred`}
                <button>Move Folder</button>
            </div>
        </div>
    );
}

export default Folder;
