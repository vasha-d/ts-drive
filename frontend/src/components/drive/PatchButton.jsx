import React, { useState, useRef } from 'react'
import ModalForm from './ModalForm'


function PatchButton({buttonText, onSubmit, defaultValue='', imgSrc=null, buttonClass=''}) {
    const [visible, setVisible] = useState(false)
    function clickOnButton(e) {
        e.stopPropagation()
        setVisible(true)
    }
    function handleSubmitForm(val) {
        setVisible(false)
        onSubmit(val)
    }
    function handleCancelForm() {
        setVisible(false)
    }
    let form = !visible ? null :
        <ModalForm
            visible = {visible}
            formText={'Create Folder'}
            onCancel = {handleCancelForm}
            onSubmit = {handleSubmitForm}
            placeHolder={'Enter folder name...'}
            defaultValue={''}           
        >
        </ModalForm> 
    
    return (
        <>
        <button className={buttonClass} onClick={clickOnButton}>
            <img src={imgSrc} alt="" />
            {buttonText}
        </button>
        {form}
        </>
    )
}



export function FilePatchButton({buttonText, buttonClass = '', onSubmit, defaultValue}) {

    
    const [visible, setVisible] = useState(false)
    let fileRef = useRef(null)
    function clickOnButton(e) {
        if (e.target !== e.currentTarget) return;
        setVisible(true)
    }
    function handleSubmitForm() {
        onSubmit(fileRef.current)
    }
    function handleCancelForm() {
        fileRef.current = 0
        setVisible(false)
    }
    function handleChangeForm(e) {   
        fileRef.current = e.target.files[0]
        if (fileRef.current.size == 0) {
            alert('Cannot upload empty files!')
            fileRef.current = null
            return
        }
        console.log(fileRef.current)
    }
    let form = !visible ? null :
        <div>
            <label htmlFor="field">Upload file</label>
            <input type="file" name='field' id='field' 
                onChange={handleChangeForm}
            />
            <button onClick={handleCancelForm}>Cancel</button>
            <button onClick={handleSubmitForm}>Submit</button>
        </div>
    
    return (
        <>
        <button className={buttonClass} onClick={clickOnButton}>{buttonText}</button>
        {form}
        </>
    )
}


export default PatchButton
