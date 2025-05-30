import React, { useContext,} from 'react'
import { newFolder } from '../api/folder'
import DriveContext from './DriveContext'
import ActionForm from './ActionForm'
import { useState } from 'react'
function NewFolderButton({parentId}) {
    let {setRefresh} = useContext(DriveContext)

    let [formVisible, setFormVisible] = useState(false)
    function submitForm (folderName) {

        newFolder(folderName, parentId, setRefresh)
        setFormVisible(false)
    }
    function clickButton (e) {
        setFormVisible(true)
    }

    return (
    <div>
        

        <button onClick={clickButton}><h2>New Folder</h2></button>
        <ActionForm
            useVisibleState={[formVisible, setFormVisible]}
            onSubmit={submitForm}
            defaultValue='New Folder'
        ></ActionForm>
    </div>
  )
}

export default NewFolderButton