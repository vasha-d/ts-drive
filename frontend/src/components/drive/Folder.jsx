import { useState } from 'react';
import styles from '../../css/folder.module.css'
import { useContext } from 'react';
import DriveContext from './DriveContext';
import ActionForm from './ActionForm';
import { renameFolder, shareFolder, deleteFolder } from '../api/folder';
const Folder = ({folderObj}) => {
    let {name, id} = folderObj
    let {setCurrentFolderId, setRefresh} = useContext(DriveContext)

    let [shareFormVisible, setShareFormVisible] = useState(false)
    let [renameFormVisible, setRenameFormVisible] = useState(false)
    function handleClick(e) {
        if (e.target !== e.currentTarget) return;
        setCurrentFolderId(id)
    }

    function clickRenameButton (e) {
        e.stopPropagation()
        setRenameFormVisible(true)
    }
    function clickShareButton (e) {
        e.stopPropagation()
        setShareFormVisible(true)
    }
    function submitRenameForm(newName) {
        renameFolder(id, newName, setRefresh)
        setRenameFormVisible(false)
    }
    function submitShareForm(usernameToShareWith) {
        shareFolder(id, usernameToShareWith, setRefresh)
        setShareFormVisible(false)
    }
    function clickDeleteFolder() {
        deleteFolder(id, setRefresh)

    }
    return (
        <div className={styles.folder}onClick={handleClick}>
            <h2>Folder</h2>
            {name}

            <div className={styles.controls}>
                <button onClick={clickRenameButton}>Rename</button>
                <ActionForm 
                    useVisibleState={[renameFormVisible, setRenameFormVisible]}
                    onSubmit = {submitRenameForm}
                    defaultValue={name}
                ></ActionForm>
                <button onClick={clickShareButton}>Share Foldeer</button>
                <ActionForm 
                    useVisibleState={[shareFormVisible, setShareFormVisible]}
                    onSubmit= {submitShareForm}
                ></ActionForm>
                <button onClick={clickDeleteFolder}>Delete Folder</button>
                <button>Move Folder</button>
            </div>
        </div>
    );
}

export default Folder;
