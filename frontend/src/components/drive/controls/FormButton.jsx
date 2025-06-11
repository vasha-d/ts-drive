import React, { useState } from 'react'
import styles from '../../../css/controls.module.css'
import ModalForm from '../ModalForm'


function FormButton({buttonText, buttonImg, formText, placeHolder, defaultValue, submitForm, toggleScaler=null}) {
    
    let [formVisible, setFormVisible] = useState(false)
    function clickButton(e) {
        e.stopPropagation()
        setFormVisible(true)
        console.log('running toggle and make visible');
        if(toggleScaler) {
            console.log(toggleScaler);
            toggleScaler()
        }
    }
    function handleCancelForm() {
        setFormVisible(false)
        if(toggleScaler) {
            toggleScaler()
        }
    }
    function handleSubmitForm(val) {
        submitForm(val)
    }
    let form = formVisible ?
        <ModalForm
            formText={formText}
            placeHolder={placeHolder}
            defaultValue={defaultValue}           
            onCancel = {handleCancelForm}
            onSubmit = {handleSubmitForm}
        >
        </ModalForm> : null
  
    return (
        <>

            <button className={styles.controlButton} onClick={clickButton}>
                <img className={styles.buttonImg} src={buttonImg} alt="" />
                <div className={styles.btnText}>
                    {buttonText}
                </div>
            </button>
            {form}
        </>
        
    )
}

export default FormButton