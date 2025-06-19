import React, {useState } from 'react'
import MoveModal from './MoveModal'
import mainStyles from '../../../../css/move.module.css'
import otherStyles from '../../../../css/controls.module.css'
import moveImg from '../../../../assets/move.svg'
let styles = {...mainStyles, ...otherStyles}


function MoveButton({toMoveId, forFile, toggleScaler}) {


    let [modalVisible, setModalVisible] = useState(false)


    function openModal() {
        toggleScaler()
        setModalVisible(true)
    }
    function closeModal(e) {
        e.stopPropagation()
        setModalVisible(false)
        toggleScaler()
    }
  

    return (
        <>

        <button className={styles.controlButton} onClick={openModal}>
            <img className={styles.buttonImg }src={moveImg} alt="" />
            <div className={styles.btnText}>Move {forFile? 'File' : 'Folder'}</div>
        </button>
        <MoveModal
            toMoveId={toMoveId}
            closeModal={closeModal}
            modalVisible={modalVisible}
        />
        </>

    )
}

export default MoveButton