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
import Status from './Status';
import useStatus from './useStatus';
import { useRef } from 'react';
import statusStyles from '../../css/status.module.css'
import useSortChildren from './useSortChildren';
const Drive = () => {
    const {folder, loading, error, setRefresh, setCurrentFolderId} = useGetFolder()
    const  {addToDir, goBackToId, goBackOne, goToName, status} = usePath(
        {folder, setCurrentFolderId}
    )
    let toReturn = <>Error...</>
    const path = useLocation().pathname
    const driveMode = path.split('/')[2]

    const statusDivRef = useRef<HTMLDivElement>(null)
    const statusHook = useStatus(statusDivRef)
    let [sortedFolders, sortedFiles] = useSortChildren(
            driveMode, folder?.childrenFolders, folder?.files
        ) || []
    if (error.message && error.status == 401) {
        toReturn = <Navigate to={'/auth/sign-in'}></Navigate>
    } 
    else if (loading || folder == null) {
        toReturn = <div>Loading...</div>
    } 
    else {
        
  
        toReturn =  
            <DriveContext.Provider value={
                { setRefresh, setCurrentFolderId, currentFolder: folder}}>  
                <div className={styles.drive}>
                        <Navbar></Navbar>
                        {/* status, pass to children all ocmmands for using it */}
                        <ContentBar goBackOne={goBackOne} 
                            setInProgress={statusHook.setInProgress}
                            setResult={statusHook.setResult}
                        >
                            <PathBar 
                                status={status}
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
                                setInProgress={statusHook.setInProgress}
                                setResult={statusHook.setResult}
                                addToDir={addToDir}
                                >
                            </Children>
            
                        </div>
                        {
                        !statusHook.visible ? null :
                        <div ref={statusDivRef} className={statusStyles.floater+` `+statusStyles.lift}>
                            <Status 
                                status={statusHook.status}
                                text={statusHook.text}
                                
                            />
                        </div>
                        }

                </div>

            </DriveContext.Provider>
    }

    return toReturn
}


export default Drive;
