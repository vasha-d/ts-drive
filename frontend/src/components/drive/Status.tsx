


import React, { useEffect } from 'react'
import type {  statusObjType, statusType } from '../../types/statusTypes'
import inProgressImg from '../../assets/in-progress.svg'
import successImg from '../../assets/success.svg'
import failureImg from '../../assets/cancel.svg'
import styles from '../../css/status.module.css'

function Status({status, text, visible}: {
    visible: boolean,
    status: statusType,
    text: string
}) {
    return (
        <>
            <StatusImg
                status = {status}
            />
            <div className={styles.statusText}>
                {text}
            </div>
        </>
    )
}

function StatusImg ({status}:{status: statusType}) {

    console.log(status)
    if (status == 'inProgress') {
        console.log('rreturnign img')
        return <img src={inProgressImg}className={styles.statusImg+` `+styles.spinAnimation} />
    }
    if (status == 'failure') {
        return <img src={failureImg}className={styles.statusImg+` `} />
    }
    if (status == 'success') {
        return <img src={successImg}className={styles.statusImg+` `} />
    }
    return 
}

export default Status