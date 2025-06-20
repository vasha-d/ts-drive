import React from 'react'
import styles from '../../css/modalForm.module.css'
import { useState, useRef } from 'react'
import cancelIcon from '../../assets/cancel.svg'
import confirmIcon from '../../assets/confirm.svg'
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

function NewChildForm({headerImg, formText, placeHolder, defaultValue, onCancel, onSubmit, creatingFile=false, isValid=null}) {
    let [value, setValue] = useState(defaultValue)
    let [fileName, setFileName] = useState('')
    let [invalidMsg, setInvalidMsg] = useState('')
    let formRef = useRef()
    function handleTextChange (e) {
        setValue(e.target.value)
    }
    function handleFileChange (e) {
        let file = e.target.files[0]
        
        setFileName(file.name)
        setValue(file)
    }
    function doClose(e, didSubmit=false) {
        formRef.current.classList.add(styles.fadeOut)
        function cancelForm() {
            formRef.current.classList.remove(styles.fadeOut)
            formRef.current.removeEventListener('animationend', cancelForm)
            setValue(defaultValue)
            if (didSubmit) {onSubmit(value)}
            if(!didSubmit) {onCancel(e)}
        }
        formRef.current.addEventListener('animationend', cancelForm)
    }
    function clickCancel(e) {
        let clickedOnCover = e.target.id == 'cover'
        console.log(e.target.id);
        if (!clickedOnCover) return;
        console.log('canceling from ')
        e.stopPropagation()
        doClose(e, false)
       
    }
    function clickCancelButton(e) {
        e.stopPropagation()
        doClose(e, false)
    }
    function submitForm(e) {
        if (isValid) {
            if (isValid(value) == 'valid') {
                console.log(isValid(value), value);
                doClose(e, true)
            } { 
                console.log('Invalid form');
                setInvalidMsg(isValid(value))
            }
        } else {
            doClose(e, true)
        }
    }
    
    let inputClass = styles.textInput + ` ` + (invalidMsg ? styles.formInvalid : '')
    let input = creatingFile ? 
        <div className={styles.fileInputContainer}>
            {fileName || 'Click Here'} 
            <input placeholder={placeHolder} className={styles.fileInput}
            type='file'  name='fileUpload' onChange={handleFileChange}/>
        </div>
        :
        <div>
            <input placeholder={placeHolder }type="text" 
            className={inputClass} name='value' value={value} onChange={handleTextChange}/>    
            <div className={styles.formMsg}>
                {invalidMsg}
            </div>
        </div>
    return (
        <div onClick={clickCancel} id='cover' className={styles.cover}>
            <div ref={formRef} className={styles.newForm}>
                <label htmlFor="value">
                    <h1 className={styles.formHeader}>
                    <img src={headerImg} className={styles.headerImg} alt="" />
                    {formText}

                    </h1>
                </label>
                {input}
                <div className={styles.newFormButtons}>
                    
                    <button id="confirm" className={styles.newFormButton} onClick={submitForm}>
                        <img className={styles.confirmImg}src={confirmIcon} alt="" />
                        Confirm
                    </button>
                    <button id="cancel" className={styles.newFormButton} onClick={clickCancelButton}>
                        <img className={styles.cancelImg}src={cancelIcon} alt="" />
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}


export default NewChildForm
