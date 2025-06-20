import { useContext, useRef } from 'react';
import DriveContext from '../DriveContext';
import { renameFolder, shareFolder, deleteFolder, starFolder } from '../../api/folder';
import childrenStyles from '../../../css/children.module.css'
import folderIcon from '../../../assets/folder.svg'
import Controls from '../controls/Controls';
import starIcon from '../../../assets/star-enabled.svg'
import useValidate from '../useValidate';


let styles = Object.assign({}, childrenStyles)

function renameValid (newName, parentFolder) {

 
}


const Folder = ({folderObj}) => {
    let {name, id} = folderObj
    let {setCurrentFolderId, setRefresh} = useContext(DriveContext)
    let folderRef = useRef()
    function handleClick(e) {
        let path = e.nativeEvent.composedPath()
        let isFromControls = path.some(element => element.id =='controls')  
        if (isFromControls) return;
        setCurrentFolderId(id)
    }
    function renameValid(newName) {
             let nameEmpty = newName.trim() == ''
        let nameTaken = !!(folderObj.parentFolder.childrenFolders.some(f => {
                return f.name == newName
            })) 
        if (nameEmpty) {return 'Name cannot be empty!'}
        if (nameTaken) {return 'Folder with that name already exists!'}

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
        folderRef.current.classList.toggle(styles.controlsOpenPrio)
    }
    function toggleScaler() {
        console.log('toggling scaler');
        folderRef.current.classList.toggle(styles.childScaler)
        folderRef.current.classList.toggle(styles.modalOpenPrio)
    }
    let onSubmits = [submitRenameForm, submitShareForm, DeleteFolder, StarFolder]
    let isValids = [renameValid]
    let starImg = !folderObj.starred ? null: 
                <div className={styles.star}>
                    <img className={styles.starSpin} src={starIcon} alt="" />
                </div>       
    return (
        <div ref={folderRef} className={styles.folder + ` ` + styles.childScaler}onClick={handleClick}>
            <div className={styles.folderIcon}>
                <img src={folderIcon} alt="" />
            </div>
            <div>{name}</div>

            <div className={styles.iconRow}>
                {starImg}
                <Controls
                    toMoveId={folderObj.id}
                    forFile={false}
                    onSubmits={onSubmits}
                    controlsOpenPrio={controlsOpenPrio}
                    toggleScaler={toggleScaler}
                    isValids={isValids}
                />
            </div>
        </div>
    );
}

export default Folder;
