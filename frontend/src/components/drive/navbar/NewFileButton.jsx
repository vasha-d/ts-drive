import React, {useContext, useState} from 'react'
import {newFile} from '../../api/file'
import DriveContext from '../DriveContext'
import {FilePatchButton} from '../PatchButton'
import pbStyles from '../../../css/contentbar.module.css'

function NewFileButton({parentId}) {

    let {setRefresh} = useContext(DriveContext)

    function submitForm (file) {
        newFile(file, parentId, setRefresh)
    }

    return (
            <FilePatchButton
                buttonText={'New File'}
                onSubmit={submitForm}
                defaultValue=''
                buttonClass={pbStyles.newFileButton}
            ></FilePatchButton>

    
    )
}

export default NewFileButton;