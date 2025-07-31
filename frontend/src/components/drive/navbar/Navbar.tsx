import React, { useEffect } from 'react'
import useGetSelf from '../../api/useGetSelf'
import styles from '../../../css/navbar.module.css'
import logo from '../../../assets/logo.png'
function Navbar() {


    let {error, loading, user} = useGetSelf()

    return (
        <div className={styles.navbar}>
            <h1 className={styles.logoHeader}>
                <img src={logo} className={styles.logoImg }alt="" />
                ovur.drive
            </h1>
            <h2>
                {user.username}
            </h2>
        </div>
    ) 
}

export default Navbar