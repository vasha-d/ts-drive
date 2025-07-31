import React, { useEffect } from 'react'
import styles from '../../../css/contentbar.module.css'
import { useState, useRef } from 'react'

 function NewChildForm({visible, onCancel, onSubmit, isFile=false}) {
    let defaultValue = isFile ? null : ''
    let [value, setValue] = useState(defaultValue)
    let unclickRef = useRef()
    let formRef = useRef()
    function handleTextChange (e) {
        setValue(e.target.value)
    }
    function handleFileChange (e) {
        let file = e.target.files[0]
        setValue(file)
    }
    function initCancel(e) {
        // document.body.style.overflowY = 'visible'
        formRef.current.classList.add(styles.fadeOut)
        formRef.current.addEventListener('animationend', cancelForm)
    }
    function cancelForm(e) {
        setValue(defaultValue)
        onCancel()
    }
    function submitForm() {
        onSubmit(value)
    }
    useEffect(() => {
        if (visible) {
            // document.body.style.overflowY = 'hidden' 
            unclickRef.current.addEventListener('click', initCancel)
            return
        } 
        return () => {
            formRef.current.classList.remove(styles.fadeOut)
            formRef.current.removeEventListener('animationend', cancelForm)
            unclickRef.current.removeEventListener('click', initCancel)
        }

    }, [visible])

    let input = isFile ? 
        <div className={styles.fileInputContainer}>
            Drag Here
            <input className={styles.fileInput}type='file' name='value' onChange={handleFileChange}/>
        </div>
        :
        <input type="text" className={styles.textInput} name='value' value={value} onChange={handleTextChange}/>


    if (!visible) return 'null';
    
    return (
        <div className={styles.cover}>
            <div ref={unclickRef} className={styles.unclick}></div>
            <div ref={formRef} className={styles.newForm}>
                <label htmlFor="value">
                    <h1>
                    {isFile? 'Upload File' : 'Create Folder'}
                    </h1>
                </label>
                {input}
                <div className={styles.newFormButtons}>
                    
                    <button className={styles.newFormButton} onClick={submitForm}>Confirm</button>
                    <button className={styles.newFormButton} onClick={initCancel}>Cancel</button>
                </div>
            </div>
        </div>
    )
}


export default NewChildForm
