import renameIcon from '../../../assets/rename.svg'
import shareIcon from '../../../assets/share.svg'
import deleteIcon from '../../../assets/delete.svg'
import starIcon from '../../../assets/star.svg'
import downloadIcon from '../../../assets/download.svg'
import OpenModalButton from './OpenModalButton'
import styles from '../../../css/controls.module.css'



export function DownloadButton({submitFunction}) {
    

    return (
        <button className={styles.controlButton +` `+ styles.forFile} onClick={submitFunction}>
            <img className={styles.buttonImg} src={downloadIcon} alt="" />
            <div className={styles.btnText}>
                Download
            </div>
        </button>
    )
}

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
export function RenameButton({forFile=false, submitFunction, toggleScaler, isValid}) {
    let props = {
        buttonText:'Rename ' + (forFile? 'File' : 'Folder'),
        buttonImg: renameIcon,
        formText: 'Rename ' + (forFile? 'File' : 'Folder'),
        placeHolder: 'Enter new name',
        defaultValue: '',
        submitForm: submitFunction,
        toggleScaler,
        modalImg: renameIcon,
        isValid
    }
    return (
        <OpenModalButton {...props}/>
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
        toggleScaler,
        modalImg: shareIcon
    }
    return (
        <OpenModalButton {...props}/>
    )
}