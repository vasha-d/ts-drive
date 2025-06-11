import React from 'react'
import styles from '../../css/modalForm.module.css'
import { useState, useRef } from 'react'


/**
 * 
 * Types: Create file, Create Folder
 * Share File to username 
 * Share folder to username
 * Rename folder
 * Rename file
 * 
 * all normal text inputs except create file
 */



function NewChildForm({formText, placeHolder, defaultValue, onCancel, onSubmit, creatingFile=false}) {
    let [value, setValue] = useState(defaultValue)
    let formRef = useRef()
    function handleTextChange (e) {
        setValue(e.target.value)
    }
    function handleFileChange (e) {
        let file = e.target.files[0]
        setValue(file)
    }
    function clickCancel(e) {
        let clickedOnCover = e.target.id == 'cover'
        if (!clickedOnCover) return;
        e.stopPropagation()
        formRef.current.classList.add(styles.fadeOut)
        function cancelForm() {
            formRef.current.classList.remove(styles.fadeOut)
            formRef.current.removeEventListener('animationend', cancelForm)
            setValue(defaultValue)
            onCancel(e)
        }
        formRef.current.addEventListener('animationend', cancelForm)
    }
    function submitForm() {
        onSubmit(value)
    }


    let input = creatingFile ? 
        <div className={styles.fileInputContainer}>
            Drag Here
            <input placeholder={placeHolder} className={styles.fileInput}
            type='file'  name='fileUpload' onChange={handleFileChange}/>
        </div>
        :
        <input placeholder={placeHolder }type="text" 
        className={styles.textInput} name='value' value={value} onChange={handleTextChange}/>    
    return (
        <div onClick={clickCancel} id='cover' className={styles.cover}>
            <div ref={formRef} className={styles.newForm}>
                <label htmlFor="value">
                    <h1>
                    {formText}
                    </h1>
                </label>
                {input}
                <div className={styles.newFormButtons}>
                    
                    <button className={styles.newFormButton} onClick={submitForm}>Confirm</button>
                    <button className={styles.newFormButton} onClick={clickCancel}>Cancel</button>
                </div>
            </div>
        </div>
    )
}


export default NewChildForm
