import React, { useContext,} from 'react'
import { newFolder } from '../api/folder'
import DriveContext from './DriveContext'
import PatchButton from './PatchButton'
import { useState } from 'react'
function NewFolderButton({parentId}) {
    let {setRefresh} = useContext(DriveContext)

    function submitForm (folderName) {
        newFolder(folderName, parentId, setRefresh)
    }

    return (
    <div>
        

        <PatchButton
            buttonText={'New Folder'}
            onSubmit={submitForm}
            defaultValue='New Folder'
        ></PatchButton>
    </div>
  )
}

export default NewFolderButton