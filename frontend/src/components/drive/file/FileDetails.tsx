import DetailsStar from './DetailsStar'
import type { FileObjType } from '../../../types/main'
import styles from '../../../css/children.module.css'
import DetailsImg from '../../../assets/details.svg'
type FileDetailsType = {
    fileObj: FileObjType,
    openModal: (fileObj: FileObjType) => void,
}
function FileDetails({fileObj, openModal}: FileDetailsType) {

    
    function clickViewDetails () {
        openModal(fileObj)
    }
    return (    
        <>
            <button className={styles.viewDetails} onClick={clickViewDetails}>
                <img className={styles.detailsImg} src={DetailsImg} alt="" />
            </button>
            <DetailsStar starred={fileObj.starred}></DetailsStar>
        </>
    )
}

export default FileDetails