import Folder from './folder/Folder';
import File from './file/File';
import styles from '../../css/children.module.css'


const Children = ({childrenFolders, files, addToDir}) => {

    const folderElements = childrenFolders.map(folder => {
        return <Folder 
           key={`folder-${folder.id}`} 
           folderObj={folder}
           addToDir={addToDir}
        >
        </Folder>
    })
    const fileElements = files.map(file => {
        return <File 
            key={`file-${file.id}`} 
            fileObj={file}
        >
        </File>
    })
    const isDirectoryEmpty = !folderElements.length && !fileElements.length
    const emptyMessage = !isDirectoryEmpty ? null :
        <h2 className={styles.emptyMessage}>
            This directory is currently empty...
        </h2>

    return (
        <div className={styles.childrenContainer}>
            <div className={styles.foldersSection}>
                {folderElements.length ?
                    <h2>Folders</h2>
                 : ''}
                <div className={styles.foldersGrid}>
                    {folderElements}
                </div>
            </div>
            <div className={styles.filesSection}>
                
                {fileElements.length ?
                    <h2>Files</h2>
                 : ''}
                <div className={styles.filesGrid}>
                    {fileElements}   
                </div>
            </div>
            {emptyMessage}
        </div>
    );
}

export default Children;
