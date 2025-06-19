import { useContext } from 'react';
import DriveContext from '../../DriveContext'
import mainStyles from '../../../../css/move.module.css'
import otherStyles from '../../../../css/controls.module.css'
import enterDirImg from '../../../../assets/enter-dir.svg'
import folderImg from '../../../../assets/folder-dir.svg'
let styles = {...mainStyles, ...otherStyles}

import React from 'react'

function DirList({toMoveId, folder, enterDir, selected, setSelected}) {

    if (!folder) {return}


    let dirList = folder.childrenFolders.map(f => {
        if (f.id == toMoveId) return null
        function clickEnter() {
            enterDir(f.id)
        }
        function selectSelf() {
            setSelected(f.id)
        }
        let enterButton = 
            <div className={styles.enterDir} onClick={clickEnter}>
                <img src={enterDirImg} alt="" />
            </div>
        let whiteBorder = selected == f.id ? styles.dirSelected : ''
        return (
            <div onClick={selectSelf}key={f.id} className={styles.directory + ` ` + whiteBorder}>
                <img className={styles.folderImg} src={folderImg}></img>
                {f.name}
                {f.childrenFolders.length ? enterButton : null}
            </div>
        )
    })

    return (
        <div className={styles.dirList}>
            {dirList}
        </div>
    )
}

export default DirList