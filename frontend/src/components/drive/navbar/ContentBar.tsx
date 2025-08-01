import React, { useContext} from 'react'
import NewFolderButton from './NewFolderButton';
import NewFileButton from './NewFileButton';
import mainStyles from '../../../css/drive.module.css'
import pbStyles from '../../../css/contentbar.module.css'
import back from '../../../assets/back.svg'
import DriveContext from '../DriveContext'
import PathBar from './Pathbar';

let styles = Object.assign({}, mainStyles, pbStyles)    



function ContentBar({children, goBackOne}) {
    const {currentFolder, setCurrentFolderId} = useContext(DriveContext)
    let {id, parentId} = currentFolder
    function clickBackButton() {
        goBackOne()
    }
    const [pathBar] = React.Children.toArray(children)
    return (
        <div className={styles.contentbar}>
            <div className= {styles.backButton}onClick={clickBackButton}>
                <img src={back} alt="" />
            </div>
            <div className={styles.pbWrapper}>
                {pathBar}
            </div>
            <div className={styles.newButtonsContainer}>
                <NewFolderButton
                    parentId = {id}
                    currentFolder = {currentFolder}
                ></NewFolderButton>
                <NewFileButton
                    parentId = {id}
                ></NewFileButton>
            </div>
        </div>
    )
}

export default ContentBar