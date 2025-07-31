import { useContext } from 'react';
import DriveContext from '../../DriveContext'
import mainStyles from '../../../../css/move.module.css'
import otherStyles from '../../../../css/controls.module.css'
import enterDirImg from '../../../../assets/enter-dir.svg'
import folderImg from '../../../../assets/folder-dir.svg'
let styles = {...mainStyles, ...otherStyles}

import React from 'react'

function DirList({toMoveId, folder, enterDir, selected, setSelected}) {
    console.log(folder);
    if (!folder) {return}
    console.log('running the rest')

    let dirList = folder.childrenFolders.map(f => {
        console.log('enteridg f obj-----', f)
        let isDisabled = toMoveId == f.id
        let isSelected = selected == f.id
        console.log(selected);
        return (
            <FolderDir isSelected={isSelected}  
                      fObj={f} enterDir={enterDir} 
                      setSelected={setSelected} isDisabled={isDisabled}/>
        )
    })

    return (
        <div className={styles.dirList}>
            {dirList}
        </div>
    )
}

function FolderDir({fObj, enterDir, setSelected, isDisabled, isSelected}) {
    console.log(fObj);
    const {id, name} = fObj
    let clickEnter = isDisabled ? null : () => {
        enterDir(id)
    }
    let selectSelf = isDisabled ? null : () => {
        console.log('setting selectetd');
        setSelected(id)
    }

    let enterButton = isDisabled ? null : 
        <div className={styles.enterDir} onClick={clickEnter}>
            <img src={enterDirImg} alt="" />
        </div>

    let whiteBorder = isSelected ? styles.dirSelected : ''
    let disabledClass = isDisabled ? styles.dirDisabled : ''
    let finalClassName = `${styles.directory} ${whiteBorder} ${disabledClass}`
    return (
        <div onClick={selectSelf} key={id} className={finalClassName}>
            <img className={styles.folderImg} src={folderImg}></img>
            {name}
            {fObj.childrenFolders.length ? enterButton : null}
        </div>
        );
}
  
export default DirList