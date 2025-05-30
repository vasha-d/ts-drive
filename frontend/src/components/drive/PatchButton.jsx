import React, { useState, useRef } from 'react'
import axios from 'axios'


function PatchButton({buttonText, onSubmit, defaultValue=''}) {
    const [visible, setVisible] = useState(false)
    const [fieldValue, setFieldValue] = useState(defaultValue)

    function clickOnButton(e) {
        if (e.target !== e.currentTarget) return;
        setVisible(true)
    }
    function handleChangeForm(e) { 
        setFieldValue(e.target.value)
    }
    function handleSubmitForm(e) {
        setVisible(false)
        onSubmit(fieldValue)
    }
    function handleCancelForm(e) {
        setFieldValue(defaultValue)
        setVisible(false)
    }

    let form = !visible ? null :
    <div onClick={clickOnButton}>
        <label htmlFor="field"> </label>
        <input type="text" name='field' id='field' 
            value={fieldValue}
            onChange={handleChangeForm}
        />
        <button onClick={handleCancelForm}>Cancel</button>
        <button onClick={handleSubmitForm}>Submit</button>
    </div>
    
    return (
        <>
        <button onClick={clickOnButton}>{buttonText}</button>
        {form}
        </>
    )
}



export function FilePatchButton({buttonText, onSubmit, defaultValue}) {

    
    const [visible, setVisible] = useState(false)
    let fileRef = useRef(null)
    function clickOnButton(e) {
        if (e.target !== e.currentTarget) return;
        setVisible(true)
    }
    function handleSubmitForm(e) {
        onSubmit(fileRef.current)
    }
    function handleCancelForm(e) {
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
        <button onClick={clickOnButton}>{buttonText}</button>
        {form}
        </>
    )
}


export default PatchButton
