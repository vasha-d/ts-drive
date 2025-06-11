import { useEffect, useState } from 'react';
import { useContext, useRef } from 'react';
import DriveContext from '../DriveContext';
import PatchButton from '../PatchButton';
import { renameFolder, shareFolder, deleteFolder, starFolder } from '../../api/folder';
import childrenStyles from '../../../css/children.module.css'
import folderIcon from '../../../assets/folder.svg'
import Controls from '../controls/Controls';



let styles = Object.assign({}, childrenStyles)



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
    function submitRenameForm(newName) {
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
    return (
        <div ref={folderRef} className={styles.folder + ` ` + styles.childScaler}onClick={handleClick}>
            <div className={styles.folderIcon}>
                <img src={folderIcon} alt="" />
            </div>
            <div>{name}</div>
            <Controls
                forFile={false}
                onSubmits={onSubmits}
                controlsOpenPrio={controlsOpenPrio}
                toggleScaler={toggleScaler}
            />
        </div>
    );
}

export default Folder;
