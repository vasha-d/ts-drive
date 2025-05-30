import React, {useContext, useState} from 'react'
import {newFile} from '../api/file'
import DriveContext from './DriveContext'
import {FilePatchButton} from './PatchButton'

function NewFileButton({parentId}) {

    let {setRefresh} = useContext(DriveContext)

    function submitForm (file) {
        newFile(file, parentId, setRefresh)
    }

    return (
        <div>
            <FilePatchButton
                buttonText={'New File'}
                onSubmit={submitForm}
                defaultValue=''
            ></FilePatchButton>
        </div>
    
    )
}

export default NewFileButton;