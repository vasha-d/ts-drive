import React, {useContext, useState} from 'react'
import {newFile} from '../../api/file'
import DriveContext from '../DriveContext'
import pbStyles from '../../../css/contentbar.module.css'
import ModalForm from '../ModalForm'
import fileIcon from '../../../assets/create-file.svg'
import type { setInProgressType, setResultType } from '../../../types/statusTypes'

function NewFileButton({parentId, setInProgress, setResult }: {
    setInProgress: setInProgressType,
    setResult: setResultType,
    parentId
}) {

    let {setRefresh} = useContext(DriveContext)
    let [formVisible, setFormVisible] = useState(false)
    function clickButton() {
        
        console.log('running');
        setFormVisible(true)
    }
    function submitForm (file) {
        console.log(setInProgress)
        setInProgress('Upload File...')
        let pr = newFile(file, parentId, setRefresh)
        pr.then(() => {
            setResult('success')
        }).catch(() => [
            setResult('failure')
        ])
        //activate in progress
        //.then resolve
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
            placeHolder={''}
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