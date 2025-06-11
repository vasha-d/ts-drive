import React, { useContext,} from 'react'
import { newFolder } from '../../api/folder'
import DriveContext from '../DriveContext'
import { useState } from 'react'
import pbStyles from '../../../css/contentbar.module.css'
import ModalForm from '../ModalForm'

function NewFolderButton({parentId}) {
    let {setRefresh} = useContext(DriveContext)
    let [formVisible, setFormVisible] = useState(false)

    function submitForm (folderName) {
        newFolder(folderName, parentId, setRefresh)
    }
    function clickButton() {
        console.log('running');
        setFormVisible(true)
    }
    function cancelForm () {
        setFormVisible(false)
    }
    
    let form = !formVisible ? null : 
            <ModalForm
                formText={'Create Folder'}
                onCancel = {cancelForm}
                onSubmit = {submitForm}
                placeHolder={'Enter folder name...'}
                defaultValue={''}
            >
            </ModalForm> 
    
    return (
        <div className={pbStyles.newFolderButtonContainer}>
            <button className={pbStyles.newFolderButton} onClick={clickButton}>New Folder</button>
            {form}
        </div>
    
  )
}

export default NewFolderButton