import Folder from './folder/Folder';
import File from './file/File';
import styles from '../../css/children.module.css'
import DetailsModal from './file/DetailsModal';
import useDetailsModal from './file/useDetailsModal';
import detModalStyles from './file/details.module.css'
import { useRef } from 'react';

const Children = ({childrenFolders, files, addToDir}) => {

    const {
        modalObj,
        modalVisible,
        closeModal,
        toggleModal
    } = useDetailsModal()
    const modalWrapperRef = useRef<HTMLDivElement>(null)
    function modalToggler(fileObj) {
        toggleModal(fileObj, modalWrapperRef, detModalStyles.modalFadeOut, detModalStyles.modalFadeIn)
    }
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
            toggleModal={modalToggler}
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
            
            <div ref={modalWrapperRef}>
                <DetailsModal
                    visible={modalVisible}
                    fileObj={modalObj}
                    modalToggler={modalToggler}
                ></DetailsModal>
            </div> 
          
        </div>
    );
}

export default Children;
