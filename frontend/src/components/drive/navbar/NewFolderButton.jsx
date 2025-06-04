import React, { useContext,} from 'react'
import { newFolder } from '../../api/folder'
import DriveContext from '../DriveContext'
import PatchButton from '../PatchButton'
import { useState } from 'react'
import pbStyles from '../../../css/contentbar.module.css'

function NewFolderButton({parentId}) {
    let {setRefresh} = useContext(DriveContext)

    function submitForm (folderName) {
        newFolder(folderName, parentId, setRefresh)
    }

    return (

    
        <PatchButton
            buttonText={'New Folder'}
            onSubmit={submitForm}
            defaultValue='New Folder'
            buttonClass = {pbStyles.newFolderButton}
        ></PatchButton>
    
  )
}

export default NewFolderButton