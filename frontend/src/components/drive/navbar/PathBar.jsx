import React, { useContext, useEffect, useState, useRef} from 'react'
import DriveContext from '../DriveContext'
import NewFolderButton from '../NewFolderButton';
import NewFileButton from '../NewFileButton';
import styles from '../../../css/drive.module.css'

function PathBar() {

    let {currentFolder, setCurrentFolderId} = useContext(DriveContext)
    let {id, parentId} = currentFolder
    let [pathComp, setPathComp] = useState({})
    let didMount = useRef(false)
    function clickBackButton() {
        if (!parentId) return;
        setCurrentFolderId(parentId)
    }
    useEffect(() => {
        //change pathcomp to an array of objects
        if (!didMount.current) {
            didMount.current = true
            return
        }        
        if (pathComp[id]) {
            setPathComp(p => {
                let newPathComp = {} 
                for (const key in p) {
                    let property = {[key]: p[key]}
                    Object.assign(newPathComp, property)
                    if (key == id) {break;}
                }
                return newPathComp
            })
        } else {
            let toAdd = {[id]: currentFolder.name}
            setPathComp(p => {
                return Object.assign(toAdd, p)
            })
        }
       
    }, [id])
    return (
        <div className={styles.pathbar}>
            {Object.values(pathComp).toString()}
            <button onClick={clickBackButton}>Go back</button>
            <NewFolderButton
                parentId = {id}
            ></NewFolderButton>
            <NewFileButton
                parentId = {id}
            ></NewFileButton>
        </div>
    )
}

export default PathBar