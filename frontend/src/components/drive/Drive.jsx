import axios from 'axios';
import React, { useEffect, useState, createContext} from 'react';
import {useGetFolder} from '../api/getHooks/useGetFolder'
import { Navigate } from 'react-router-dom';
import Children from './Children';
import styles from '../../css/drive.module.css'
import DriveContext from './DriveContext';
import NewFolderButton from './NewFolderButton';
import NewFileButton from './NewFileButton';
const Drive = () => {
/*
at all times keep all parentid and  names, and childrens ids and names in state, render the rest
whatever is clickekd get that id
onload
useState parent = ''
contents = axios.get(/api/users/drive)
enter example folde photos
parent = driveid
children = axios.get(/api/users/drive/folder/:photosid)
keep all folders ids in array, get n whichever you click
enter example folder 4k
parent = photosid
children = axios.get(/api/users/drive/folder/:4kid)
get example file
get = axios.get(api/users/drive/file/:fileid)
go back to parent => 
parent = axios.get(api/users/drive/parentid)
children = axios.get(api/users/drive/parentid)
*/
    let {folder, loading, error, setRefresh, setCurrentFolderId} = useGetFolder()

    function onClickFile (fileId) {

    }

    let toReturn = <>Error...</>
    let notAuthorized = error && error.status == 401
    if (loading) {
        toReturn = <div>Loading...</div>
    } 
    else if (notAuthorized) {
        toReturn = <Navigate to={'/auth/sign-in'}></Navigate>
    } 
    else {
        toReturn =  
            <DriveContext.Provider value={
                {onClickFile, setRefresh, setCurrentFolderId}
            }>

                <div className={styles.contentsContainer}>
                    <Children 
                        childrenFolders={folder.childrenFolders}
                        files={folder.files}
                    ></Children>
                    <NewFolderButton
                        parentId = {folder.id}
                    ></NewFolderButton>
                    <NewFileButton
                        parentId = {folder.id}
                    ></NewFileButton>
                </div>
            </DriveContext.Provider>
    }

    return toReturn
}

export default Drive;
