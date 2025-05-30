import React, {useContext, useState} from 'react'
import {newFile} from '../api/file'
import DriveContext from './DriveContext'
import {FileActionForm} from './ActionForm'

function NewFileButton({parentId}) {

    let {setRefresh} = useContext(DriveContext)

    let [formVisible, setFormVisible] = useState(false)
    function submitForm (file) {
        newFile(file, parentId, setRefresh)
        setFormVisible(false)
    }
    function clickButton (e) {
        setFormVisible(true)
    }

    return (
        <div>
            <button onClick={clickButton}><h2>New File</h2></button>
            <FileActionForm
                useVisibleState={[formVisible, setFormVisible]}
                onSubmit={submitForm}
                defaultValue=''
                isFileForm={true}
            ></FileActionForm>
        </div>
    
    )
}

export default NewFileButton;