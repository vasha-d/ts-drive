import { useEffect, useState } from 'react';
import folderStyles from '../../css/child.module.css'
import { useContext, useRef } from 'react';
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


function isTargetControls (e, current) {
    let children = current.children[0]
    let nested = children.children[0]
    let all = [children, nested]
    
    return all.includes(e.target)
}

const Folder = ({folderObj}) => {
    let {name, id} = folderObj
    let {setCurrentFolderId, setRefresh} = useContext(DriveContext)
    let [controlsOpen, setControlsOpen] = useState(false)
    let wrenchRef = useRef()
    let controlsRef = useRef()
    function handleClick(e) {
        if (isTargetControls(e, controlsRef.current)) {return}
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
        let button = wrenchRef.current
        button.classList.remove(styles.wrenchShake)
        void button.clientWidth

        button.classList.add(styles.wrenchShake)
        setControlsOpen(o => !o)

    }
    useEffect(() => {
        function closeControls (e) {
            if (isTargetControls(e, controlsRef.current)) {return}
            setControlsOpen(false)
        }   
        if (controlsOpen) {
            controlsRef.current.parentNode.classList.add(styles.zprio)
            document.addEventListener('click', closeControls)
        } else {
            controlsRef.current.parentNode.classList.remove(styles.zprio)

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
            <div>{name}</div>

            <div ref={controlsRef} className={styles.openControlsWrapper}>
                <div onClick={clickOpenControls} className={styles.openControls}>
                    <img ref={wrenchRef} src={wrenchIcon} className={styles.wrench} alt="" />
                </div>
                {controls}
            </div>
        </div>
    );
}

export default Folder;
