import React, { useContext} from 'react'
import NewFolderButton from './NewFolderButton';
import NewFileButton from './NewFileButton';
import mainStyles from '../../../css/drive.module.css'
import pbStyles from '../../../css/contentbar.module.css'
import back from '../../../assets/back.svg'
import DriveContext from '../DriveContext'
import PathBar from './Pathbar';
import type { setInProgressType, setResultType } from '../../../types/statusTypes';
let styles = Object.assign({}, mainStyles, pbStyles)    



function ContentBar({children, goBackOne, setInProgress, setResult}: {
    setInProgress: setInProgressType, setResult: setResultType,
    children, goBackOne
}) {
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
                    currentFolder = {currentFolder}
                    setInProgress = {setInProgress}
                    setResult = {setResult}

                    ></NewFolderButton>
                <NewFileButton
                    setInProgress = {setInProgress}
                    setResult = {setResult}
                    parentId = {id}
                ></NewFileButton>
            </div>
        </div>
    )
}

export default ContentBar