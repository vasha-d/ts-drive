import React, { useContext,} from 'react'
import { newFolder } from '../../api/folder'
import DriveContext from '../DriveContext'
import { useState } from 'react'
import pbStyles from '../../../css/contentbar.module.css'
import ModalForm from '../ModalForm'
import folderIcon from '../../../assets/create-folder.svg'
function NewFolderButton({parentId}) {
    let {setRefresh} = useContext(DriveContext)
    let [formVisible, setFormVisible] = useState(false)

    function submitForm (folderName) {
        newFolder(folderName, parentId, setRefresh)
        setFormVisible(false)
        
    }
    function clickButton() {
        setFormVisible(true)
    }
    function cancelForm () {
        setFormVisible(false)
    }
    
    let form = !formVisible ? null : 
            <ModalForm
                headerImg={folderIcon}
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