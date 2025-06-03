import { useEffect, useState } from 'react';
import folderStyles from '../../css/folder.module.css'
import { useContext } from 'react';
import DriveContext from './DriveContext';
import PatchButton from './PatchButton';
import { renameFolder, shareFolder, deleteFolder, starFolder } from '../api/folder';
import childrenStyles from '../../css/children.module.css'
import wrenchIcon from '../../assets/wrench.svg'
import folderIcon from '../../assets/folder.svg'
import renameIcon from '../../assets/rename.svg'
import shareIcon from '../../assets/share.svg'
import deleteIcon from '../../assets/delete.svg'
import starIcon from '../../assets/star.svg'
import moveIcon from '../../assets/move.svg'


let styles = Object.assign({}, childrenStyles, folderStyles)


const Folder = ({folderObj}) => {
    let {name, id} = folderObj
    let {setCurrentFolderId, setRefresh} = useContext(DriveContext)
    let [controlsOpen, setControlsOpen] = useState(false)
    function handleClick(e) {
        if (e.target !== e.currentTarget) return;
        setCurrentFolderId(id)
    }
    function submitRenameForm(newName) {
        setControlsOpen(false)

        renameFolder(id, newName, setRefresh)
    }
    function submitShareForm(usernameToShareWith) {
        setControlsOpen(false)
        shareFolder(id, usernameToShareWith, setRefresh)
    }
    function clickDeleteFolder(e) {
        e.stopPropagation()
        deleteFolder(id, setRefresh)
        setControlsOpen(false)
    }
    function clickStarFolder(e) {
        e.stopPropagation()
        starFolder(id, setRefresh)
        setControlsOpen(false)
    }
    function clickOpenControls(e) {
        e.stopPropagation()
        setControlsOpen(o => !o)
    }

    useEffect(() => {
        function closeControls (e) {
            setControlsOpen(false)
        }
        if (controlsOpen) {
            console.log('running');
            document.addEventListener('click', closeControls)
        } else {
            document.removeEventListener('click', closeControls)
        }

        return () => {
            document.removeEventListener('click', closeControls)
        }

    }, [controlsOpen])

    let controls = !controlsOpen ? null : 
            <div className={styles.controls}>
                <PatchButton 
                    buttonText={'Rename Folder'}
                    onSubmit = {submitRenameForm}
                    defaultValue={name}
                    imgSrc = {renameIcon}
                ></PatchButton>
                <PatchButton 
                    buttonText={'Share Folder'}
                    onSubmit= {submitShareForm}
                    imgSrc = {shareIcon}
                ></PatchButton>
                <button onClick={clickDeleteFolder}>
                    <img src={deleteIcon} alt="" />
                    Delete Folder</button>
                <button onClick={clickStarFolder}>
                    <img src={starIcon} alt="" />
                    Star Folder</button>
                <button>
                    <img src={moveIcon} alt="" />
                    Move Folder</button>
            </div>

    return (
        <div className={styles.folder}onClick={handleClick}>
            <div className={styles.folderIcon}>
                <img src={folderIcon} alt="" />
            </div>
            <h3>{name}</h3>
            <div onClick={clickOpenControls} className={styles.openControls}>
                <img src={wrenchIcon} alt="" />
                {controls}
            </div>
        </div>
    );
}

export default Folder;
