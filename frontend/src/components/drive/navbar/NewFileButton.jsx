import React, {useContext, useState} from 'react'
import {newFile} from '../../api/file'
import DriveContext from '../DriveContext'
import {FilePatchButton} from '../PatchButton'
import pbStyles from '../../../css/contentbar.module.css'
import NewChildForm from './NewChildForm'
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
        <NewChildForm
            visible = {formVisible}
            onCancel = {cancelForm}
            onSubmit = {submitForm}
            isFile={true}
        >
        </NewChildForm> 
    
    return (
       
        <div>
            <button className={pbStyles.newFileButton} onClick={clickButton}>New File</button>
            {form}
        </div>
    
    )
}

export default NewFileButton;