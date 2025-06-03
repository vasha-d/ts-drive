import React, { useEffect } from 'react'
import useGetSelf from '../../api/useGetSelf'
import styles from '../../../css/drive.module.css'

function Navbar() {


    let {error, loading, user} = useGetSelf()

    return (
        <div className={styles.navbar}>
            <h1>Ovur.drive</h1>
            <h2>
                {user.username}
            </h2>
        </div>
    ) 
}

export default Navbar