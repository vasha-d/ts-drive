import React, { useContext,} from 'react'
import { newFolder } from '../../api/folder'
import DriveContext from '../DriveContext'
import { useState } from 'react'
import pbStyles from '../../../css/contentbar.module.css'
import ModalForm from '../ModalForm'
import folderIcon from '../../../assets/create-folder.svg'
import type { setResultType, setInProgressType } from '../../../types/statusTypes'
function NewFolderButton({currentFolder, setInProgress, setResult }: {
    setInProgress: setInProgressType,
    setResult: setResultType,
    currentFolder,
}) {
    let {parentId, childrenFolders} =currentFolder
    let {setRefresh} = useContext(DriveContext)
    let [formVisible, setFormVisible] = useState(false)
    function nameValid(newName) {
        let nameEmpty = newName.trim() == ''
        let nameTaken = !!(childrenFolders.some(f => {
                return f.name == newName
            })) 
        if (nameEmpty) {return 'Name cannot be empty!'}
        if (nameTaken) {return 'Folder with that name already exists!'}

        return 'valid'
    }
    function submitForm (folderName) {
        setInProgress('Create New Folder')
        let pr = newFolder(folderName, currentFolder.id, setRefresh)
        pr.then(() => {
            setResult('success')
        }).catch(() => [
            setResult('failure')
        ])
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
                isValid={nameValid}
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