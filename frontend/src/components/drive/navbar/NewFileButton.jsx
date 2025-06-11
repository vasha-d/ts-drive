import React, {useContext, useState} from 'react'
import {newFile} from '../../api/file'
import DriveContext from '../DriveContext'
import {FilePatchButton} from '../PatchButton'
import pbStyles from '../../../css/contentbar.module.css'
import ModalForm from '../ModalForm'
function NewFileButton({parentId}) {

    let {setRefresh} = useContext(DriveContext)
    let [formVisible, setFormVisible] = useState(false)
    function clickButton() {
        console.log('running');
        setFormVisible(true)
    }
    function submitForm (file) {
        newFile(file, parentId, setRefresh)
    }
    function cancelForm () {
        setFormVisible(false)
    }

    let form = !formVisible ? null :
        <ModalForm
            onCancel = {cancelForm}
            onSubmit = {submitForm}
            formText={'Upload File'}
            defaultValue={null}
            isFile={true}
        >
        </ModalForm> 
    
    return (
       
        <div>
            <button className={pbStyles.newFileButton} onClick={clickButton}>New File</button>
            {form}
        </div>
    
    )
}

export default NewFileButton;