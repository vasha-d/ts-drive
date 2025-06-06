import React, {useContext} from 'react';
import Folder from './Folder';
import File from './File';
import DriveContext from './DriveContext'
import styles from '../../css/children.module.css'
function childrenList (childrenFolders, files) {
    childrenFolders = childrenFolders.map(folder => {
        let newFolder = Object.assign({type: 'folder'}, folder)
        return newFolder
    })
    files = files.map(file => {
        let newFile = Object.assign({type: 'file'}, file)
        return newFile
    })  

    let toReturn = [...childrenFolders, ...files]
    return toReturn
}

const Children = () => {

    let {currentFolder} = useContext(DriveContext);
    let {childrenFolders, files} = currentFolder

    let folderElements = childrenFolders.map(folder => {
        return <Folder 
           key={`folder-${folder.id}`} 
           folderObj={folder}
        >

        </Folder>
    })
    let fileElements = files.map(file => {
        return <File 
            key={`file-${file.id}`} 
            fileObj={file}
        >

        </File>
    })
    return (
        <div className={styles.childrenContainer}>
            <div className={styles.foldersSection}>
                <h2>Folders</h2>
                <div className={styles.foldersGrid}>
                    {folderElements}
                </div>
            </div>
            <div className={styles.filesSection}>
                <h2>Files</h2>
                <div className={styles.filesGrid}>
                    {fileElements}   
                </div>
            </div>

        </div>
    );
}

export default Children;
