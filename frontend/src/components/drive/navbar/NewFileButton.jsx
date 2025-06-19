import React, {useContext, useState} from 'react'
import {newFile} from '../../api/file'
import DriveContext from '../DriveContext'
import pbStyles from '../../../css/contentbar.module.css'
import ModalForm from '../ModalForm'
import fileIcon from '../../../assets/create-file.svg'

function NewFileButton({parentId}) {

    let {setRefresh} = useContext(DriveContext)
    let [formVisible, setFormVisible] = useState(false)
    function clickButton() {
        console.log('running');
        setFormVisible(true)
    }
    function submitForm (file) {
        newFile(file, parentId, setRefresh)
        setFormVisible(false)
    }
    function cancelForm () {
        setFormVisible(false)
    }

    let form = !formVisible ? null :
        <ModalForm
            headerImg={fileIcon}
            onCancel = {cancelForm}
            onSubmit = {submitForm}
            formText={'Upload File'}
            defaultValue={null}
            creatingFile={true}
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