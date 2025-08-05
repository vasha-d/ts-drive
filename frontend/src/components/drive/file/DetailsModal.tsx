import type { FileObjType } from '../../../types/main'
import cancelImg  from '../../../assets/cancel.svg'
import styles from '../../../css/children.module.css'
type DetailsModalType = {
    visible: boolean,
    fileObj: FileObjType | null,
    closeModal: () => void
}

function DetailsModal({visible, fileObj, closeModal}: DetailsModalType) {

    if (!visible) return null
    if (fileObj == null) return null
    const {createdAt, extension, name, size, lastAccessed} = fileObj
    const dateCr = new Date(createdAt)
    const dateCrStr = dateCr.toDateString()
    const dateMod = new Date(lastAccessed)
    const dateModStr = dateMod.toDateString()
    console.log(fileObj)
    return  (
        <div className={styles.detailsModal}> 
            <button className={styles.closeModalBtn} onClick={closeModal}>
                <img src={cancelImg} alt="" />
            </button>
            <div className={styles.detailsList}>
                <div>
                    <span className={styles.detailName}>File name :</span> {name}
                </div>
                <div>
                    <span className={styles.detailName}>Date created: </span>{dateCrStr}
                </div>
                <div>
                    <span className={styles.detailName}>Last Accessed: </span>{dateModStr}
                </div>
                <div>
                    <span className={styles.detailName}>Extension: </span> {extension}
                </div>
                <div>
                    <span className={styles.detailName}>Size: </span>{`${size} Bytes`}
                </div>
                <div>
                    <span className={styles.detailName}>Parent Folder: </span>{'/'+fileObj.parentFolder.name}
                </div>
            </div>
        </div>
    )



}

export default DetailsModal