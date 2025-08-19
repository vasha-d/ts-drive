import type { FileObjType } from '../../../types/main'
import cancelImg  from '../../../assets/chevron-right.svg'
import fileImg from '../../../assets/file-d.svg'
import dateCreatedImg from '../../../assets/date-created.svg'
import dateAccImg from '../../../assets/date-accessed.svg'
import fileSizeImg from '../../../assets/file-size.svg'
import parentFolderImg from '../../../assets/parent-folder.svg'
import extensionImg from '../../../assets/extension.svg'
import detailsImg from '../../../assets/details-img.svg'
import mainStyles from '../../../css/children.module.css'
import detStyles from './details.module.css'
import useStorageUnits from '../useStorageUnits'

const styles = Object.assign({}, mainStyles, detStyles)

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
    const dateCrStr = dateCr.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",  
        day: "numeric"
    })
    const dateMod = new Date(lastAccessed)
    const dateModStr = dateMod.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",  
        day: "numeric"
    })
    console.log(fileObj)
    const fileSize = useStorageUnits(fileObj.size)
    return  (
        <div className={styles.detailsModal}> 
            <div className={styles.detailIcons}>
                <img src={detailsImg} alt="" />
                <h2 className={styles.detailName}>{name}</h2> 

                <button className={styles.closeModalBtn} onClick={closeModal}>
                    <img src={cancelImg} alt="" />  
                </button>
            </div>
        
            <div className={styles.detailsList}>
                <div className={styles.fileDet}>
                    <img src={dateCreatedImg} alt="" />
                    <div className={styles.dateWrapper}>
                        <span className={styles.detailName}>Date created: </span>
                        <div className={styles.detailDate}>{dateCrStr}</div>
                    </div>
                </div>
                <div className={styles.fileDet}>
                    <img src={dateAccImg} alt="" />
                    <div className={styles.dateWrapper}>
                        <span className={styles.detailName}>Last Accessed: </span>
                        <div className={styles.detailDate}>{dateModStr}</div>
                    </div>
                </div>
            
                <div className={styles.fileSizeDet}>
                    <span className={styles.detailNameWrapper}>
                        <img src={fileSizeImg} alt="" />
                        <span className={styles.detailName}>File Size:  </span>
                        <span className={styles.detail}>{fileSize}</span>
                    </span>
                </div>
                <div className={styles.extensionDetail}>
                    <span className={styles.detailNameWrapper}>
                        <img src={extensionImg} alt="" />
                        <span className={styles.detailName}>Extension: </span>
                    </span>
                    <span className={styles.detail}>{extension}</span>
                </div>
            </div>
        </div>
    )



}

export default DetailsModal