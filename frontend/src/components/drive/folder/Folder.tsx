import { useContext, useRef } from 'react';
import DriveContext from '../DriveContext';
import { renameFolder, shareFolder, deleteFolder, starFolder, setFolderColor } from '../../api/folder';
import childrenStyles from '../../../css/children.module.css'
import folderIcon from '../../../assets/folder.svg'
import Controls from '../controls/Controls';
import starIcon from '../../../assets/star-enabled.svg'

const styles = Object.assign({}, childrenStyles)


import type { FolderObj } from '../../../types/main';

const Folder = ({folderObj , addToDir} : {
    folderObj: FolderObj, addToDir: (name, id) => void
}) => {
    const {name, id} = folderObj
    let {setCurrentFolderId, setRefresh} = useContext(DriveContext)
    const folderRef = useRef<HTMLDivElement>(null)
    function handleClick(e) {
        const path = e.nativeEvent.composedPath()
        const isFromControls = path.some(element => element.id =='controls')  
        if (isFromControls) return;
        setCurrentFolderId(id)
        addToDir(name, id)
    }
    function renameValid(newName) {
        const nameEmpty = newName.trim() == ''
        const nameTaken = !!(folderObj.parentFolder.childrenFolders.some(f => {
                return f.name == newName
            })) 
        if (nameEmpty) {return 'Name cannot be empty!'}
        if (nameTaken) {return 'Folder with that name already exists!'}

        return 'valid'
    }
    function shareValid(username) {
        const nameEmpty = username.trim() == ''
        if (nameEmpty) {return 'Name cannot be empty'}
        return 'valid'
    }
    function submitRenameForm(newName) { 
        console.log('running');
        renameFolder(id, newName, setRefresh)
    }
    function submitShareForm(usernameToShareWith) {
        shareFolder(id, usernameToShareWith, setRefresh)
    }
    function DeleteFolder() {
        deleteFolder(id, setRefresh)
    }
    function StarFolder() {
        starFolder(id, setRefresh)
    }
    function controlsOpenPrio() {
        folderRef.current?.classList.toggle(styles.controlsOpenPrio)
    }
    function submitColorForm(color: string) {
        setFolderColor(id, color, setRefresh)
    }
    function toggleScaler() {
        console.log('toggling scaler');
        folderRef.current?.classList.toggle(styles.childScaler)
        folderRef.current?.classList.toggle(styles.modalOpenPrio)
    }
    const onSubmits = [submitRenameForm, submitShareForm, DeleteFolder, StarFolder, submitColorForm]
    const isValids = [renameValid, shareValid]
    const starImg = !folderObj.starred ? null: 
                <div className={styles.star}>
                    <img className={styles.starSpin} src={starIcon} alt="" />
                </div>       
    return (
        <div style={{backgroundColor: folderObj.color}} className={styles.folderWrapper+` `+styles.childScaler} ref={folderRef}>
            <div  className={styles.folder}onClick={handleClick}>
                <div className={styles.folderIcon}>
                    <img src={folderIcon} alt="" />
                </div>
                <div className={styles.childText}>{name}</div>

                <div className={styles.iconRow}>
                    {starImg}
                    <Controls
                        toMoveId={folderObj.id}
                        forFile={false}
                        onSubmits={onSubmits}
                        controlsOpenPrio={controlsOpenPrio}
                        toggleScaler={toggleScaler}
                        isValids={isValids}
                        folderObj={folderObj}
                    />
                </div>
            </div>
        </div>

    );
}

export default Folder;
