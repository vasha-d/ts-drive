import { useContext, useState } from 'react';
import DriveContext from '../../DriveContext'
import mainStyles from '../../../../css/move.module.css'
import otherStyles from '../../../../css/controls.module.css'
import {useGetFolder} from '../../../api/getHooks/useGetFolder'
import DirList from './DirList';
import backImg from '../../../../assets/back-dir.svg'
import confirmImg from '../../../../assets/confirm-move.svg'
import cancelImg from '../../../../assets/cancel.svg'
import { moveFolder } from '../../../api/folder';
import { moveFile } from '../../../api/file';
let styles = {...mainStyles, ...otherStyles}
function MoveModal ({toMoveId, modalVisible, closeModal, forFile}) {
    let {currentFolder, setRefresh} = useContext(DriveContext)
    let {loading, folder, error, setCurrentFolderId} = useGetFolder(currentFolder.id)
    let [selected, setSelected] = useState(null)

    

    function enterDirectory (id) {
        setCurrentFolderId(id)
    }
    function stopPropag(e) {
        e.stopPropagation()
    }
    function goBack() {
        setCurrentFolderId(folder.parentId)
    }
    function submitForm(e) {
        console.log(toMoveId);

        if (forFile) {
            moveFile(toMoveId, selected, setRefresh)
        } else {
            moveFolder(toMoveId, selected, setRefresh)
        }

        
        closeModal(e)
    }
    function cancelForm(e) {
        setSelected(null)
        closeModal(e)
    }
    
    if (!modalVisible) return <div></div>

    let goBackDiv = 
            <div className={styles.goBack} onClick={goBack}>
                    <img src={backImg}  />
                    {/* {`/` + folder.parentFolder?.name} */}
                    Select Folder
            </div>
    if (loading) {
        return <div>Loading...</div>
    }
    return (
        <div onClick={closeModal} className={styles.cover}>
            <div onClick={stopPropag}className={styles.moveModal}>
                {goBackDiv}
             
                <DirList
                    toMoveId={toMoveId}
                    folder={folder}
                    enterDir={enterDirectory}
                    selected={selected}
                    setSelected={setSelected}
                />

                <div className={styles.formButtons}>
                    <div onClick={submitForm} className={styles.confirm}>
                        <img src={confirmImg} alt="" />
                    </div>
                    <div onClick={cancelForm}className={styles.cancel}>
                        <img src={cancelImg} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MoveModal