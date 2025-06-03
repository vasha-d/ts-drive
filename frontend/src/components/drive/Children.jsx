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
    let childrenElements = childrenList(childrenFolders, files)
        .map(child => {
            if (child.type == 'folder') {
                return <Folder 
                key={`folder-${child.id}`} 
                folderObj={child}
                ></Folder>
            }
            if (child.type == 'file') {
                return <File 
                key={`file-${child.id}`} 
                fileObj={child}
                ></File>
            }
        })

    return (
        <div className={styles.childrenGrid}>
            {childrenElements}
        </div>
    );
}

export default Children;
