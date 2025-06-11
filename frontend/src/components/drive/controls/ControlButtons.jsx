import renameIcon from '../../../assets/rename.svg'
import shareIcon from '../../../assets/share.svg'
import deleteIcon from '../../../assets/delete.svg'
import starIcon from '../../../assets/star.svg'
import FormButton from './FormButton'

import styles from '../../../css/controls.module.css'

export function StarButton({forFile=false, submitFunction}) {
    
    return (
        <button className={styles.controlButton} onClick={submitFunction}>
            <img className={styles.buttonImg} src={starIcon} alt="" />
            <div className={styles.btnText}>
                Star {forFile? 'File':'Folder' }
            </div>
        </button>
    )
}
export function DeleteButton({forFile=false, submitFunction}) {
    
    return (
        <button className={styles.controlButton} onClick={submitFunction}>
            <img className={styles.buttonImg} src={deleteIcon} alt="" />
            <div className={styles.btnText}>
                Delete {forFile? 'File':'Folder' }
            </div>
        </button>
    )
}
export function RenameButton({forFile=false, submitFunction, toggleScaler}) {
    let props = {
        buttonText:'Rename ' + (forFile? 'File' : 'Folder'),
        buttonImg: renameIcon,
        formText: 'Rename ' + (forFile? 'File' : 'Folder'),
        placeHolder: 'Enter username',
        defaultValue: '',
        submitForm: submitFunction,
        toggleScaler
    }
    return (
        <FormButton {...props}/>
    )
}
export function ShareButton({forFile=false, submitFunction, toggleScaler}) {

    let props = {
        buttonText:'Share ' + (forFile? 'File' : 'Folder'),
        buttonImg: shareIcon,
        formText: 'Share ' + (forFile? 'File' : 'Folder'),
        placeHolder: 'Enter username',
        defaultValue: '',
        submitForm: submitFunction,
        toggleScaler
    }
    return (
        <FormButton {...props}/>
    )
}