import React, { useEffect } from 'react'
import useGetSelf from '../../api/useGetSelf'
import PathBar from './PathBar'
import styles from '../../../css/drive.module.css'

function Navbar() {


    let {error, loading, user} = useGetSelf()

    return (
        <div className={styles.navbar}>
            <h1>Ovur.drive</h1>
            <h2>Search Bar</h2>
            <div>
                {user.username}
            </div>
        </div>
    ) 
}

export default Navbar