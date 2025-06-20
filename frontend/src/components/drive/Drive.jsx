import React, { useState } from 'react';
import {useGetFolder} from '../api/getHooks/useGetFolder'
import { Navigate, useLocation } from 'react-router-dom';
import Children from './Children';
import styles from '../../css/drive.module.css'
import DriveContext from './DriveContext';
import Navbar from './navbar/Navbar'
import Sidebar from './sidebar/Sidebar';
import ContentBar from './navbar/ContentBar';
const Drive = () => {

    let {folder, loading, error, setRefresh, setCurrentFolderId} = useGetFolder()
    let [curDir, setCurDir] = useState({current: [{name: 'drive', id: 'drive'}], fading: []})
    let toReturn = <>Error...</>
    let notAuthorized = error && error.status == 401
    let path = useLocation().pathname
    let driveMode = path.split('/')[2]

    if (loading) {
        toReturn = <div>Loading...</div>
    } 
    else if (notAuthorized) {
        toReturn = <Navigate to={'/auth/sign-in'}></Navigate>
    } 
    else {
        function addToDir(name, id) {
            console.log('adding', name);
            let newObj = {name, id}
            setCurDir(currentDir =>{
                let newDir = [...currentDir.current, newObj]
                return {current: newDir, fading: []}
            })
        }
        function goBackToId(id) {
            setCurDir(currentDir => {
                let lastIndex = currentDir.current.findIndex(obj => obj.id == id)
                let newDir = currentDir.current.slice(0, lastIndex + 1)
                let newFading = currentDir.current.slice(lastIndex+1)
                console.log(newDir, newFading);
                setCurrentFolderId(id)
                return {
                    current: newDir,
                    fading: newFading
                }
            })
        }
        function goBackOne() {
            console.log('going back one');
            console.log(curDir.length);
            if (curDir.current.length == 1) {return}
            setCurDir(currentDir => {
                let newDir = currentDir.current.slice(0, -1)
                let fadingOne = currentDir.current.slice(-1)
                let [lastElement] = newDir.slice(-1)
                setCurrentFolderId(lastElement.id)
                return {
                    current: newDir,
                    fading: fadingOne
                }
            })
        }
        function goToRecent() {
            setCurDir(curDir =>{
                let fading = curDir.current.slice(1)
                return {

                    current: [{name: 'drive', id: 'drive'}],
                    fading
                }
            })
            setCurrentFolderId('drive')
        }
        function goToStarred() {
            if (folder.isStarredFolder) return;
            let inStarredFolder = curDir.current[1]?.id == 'starred'
            if (inStarredFolder) {
                goBackToId('starred')
                return
            }
            setCurrentFolderId('starred')  
            setCurDir(curDir =>{
                let fading = curDir.current.slice(1)
                return {

                    current: [{name: 'drive', id: 'drive'}, {name: 'starred', id: 'starred'}],
                    fading
                }
            })
        }
        function goToShared() {
            if (folder.isSharedFolder) return;
            let inSharedFolder = curDir.current[1]?.id == 'shared'
            if (inSharedFolder) {
                goBackToId('shared')
                return
            }
            setCurrentFolderId('shared')
            setCurDir(curDir =>{
                let fading = curDir.current.slice(1)
                return {
                    current: [{name: 'drive', id: 'drive'}, {name: 'shared', id: 'shared'}],
                    fading
                }
            })
        }
        let [sortedFolders, sortedFiles] = sortChildren(
            driveMode, folder.childrenFolders, folder.files
        )
        console.log(curDir);
        toReturn =  
            <DriveContext.Provider value={
                { setRefresh, setCurrentFolderId, currentFolder: folder}}>  
                <div className={styles.drive}>
                        <Navbar></Navbar>
                        <ContentBar
                            goBackOne={goBackOne}
                            goBackToId={goBackToId}
                            pathComp={curDir}
                        ></ContentBar>   
                        <Sidebar
                            goToRecent={goToRecent}
                            goToStarred = {goToStarred}
                            goToShared = {goToShared}

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
