import {useGetFolder} from '../api/getHooks/useGetFolder'
import { Navigate, useLocation } from 'react-router-dom';
import Children from './Children';
import styles from '../../css/drive.module.css'
import DriveContext from './DriveContext';
import Navbar from './navbar/Navbar'
import Sidebar from './sidebar/Sidebar';
import ContentBar from './navbar/ContentBar';
import PathBar from './navbar/Pathbar';
import usePath from './usePath';
const Drive = () => {
    const {folder, loading, error, setRefresh, setCurrentFolderId} = useGetFolder()
    const  {addToDir, goBackToId, goBackOne, curDir, goToName} = usePath(
        {folder, setCurrentFolderId}
    )
    let toReturn = <>Error...</>
    const path = useLocation().pathname
    const driveMode = path.split('/')[2]
    if (error.message && error.status == 401) {
        toReturn = <Navigate to={'/auth/sign-in'}></Navigate>
    } 
    else if (loading || folder == null) {
        toReturn = <div>Loading...</div>
    } 
    else {
        let [sortedFolders, sortedFiles] = sortChildren(
            driveMode, folder.childrenFolders, folder.files
        )
        toReturn =  
            <DriveContext.Provider value={
                { setRefresh, setCurrentFolderId, currentFolder: folder}}>  
                <div className={styles.drive}>
                        <Navbar></Navbar>
                        <ContentBar goBackOne={goBackOne}>
                            <PathBar 
                                pathComp={curDir}
                                goBackToId={goBackToId}
                            />    
                        </ContentBar>   
                        <Sidebar
                            goToName={goToName}
                        ></Sidebar>
                        <div className={styles.contentsWrapper}>
                            <Children
                                childrenFolders={sortedFolders}
                                files={sortedFiles}
                                addToDir={addToDir}
                                >
                            </Children>
                        </div>
                </div>

            </DriveContext.Provider>
    }

    return toReturn
}
function sortChildren(driveMode, folders, files) {
    if (!driveMode) {
        driveMode = ''
    }
    if (driveMode == '') {
        return sortByDates(folders, files, 'dateCreated')
    } else
    if (driveMode == 'recent') {
        return sortByDates(folders, files, 'dateModified')
    }
    if (driveMode == 'starred') {
        return sortByDates(folders, files, 'dateModified')
    }
    if (driveMode == 'shared') {
        return sortByDates(folders, files, 'dateModified')
        
    }

}

function sortByDates(folders, files, type) {
    let sortFunction = {}
    sortFunction.dateCreated = 
        (f1, f2) => {
            let d1 = new Date(f1.createdAt)
            let d2 = new Date(f2.createdAt)
            return d2 - d1
        }
    sortFunction.dateModified = 
        (f1, f2) => {
            let d1 = new Date(f1.lastModified)
            let d2 = new Date(f2.lastModified)
            return d2 - d1
        }
    let funcToUse = sortFunction[type]
    let childrenFolders = folders.sort(
        funcToUse
    )
    let childrenFiles = files.sort(
        funcToUse
    )
    return [childrenFolders, childrenFiles]

}

export default Drive;
