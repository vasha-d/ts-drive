import React, { useEffect } from 'react'
import useGetSelf from '../../api/useGetSelf'
import styles from '../../../css/navbar.module.css'
import logo from '../../../assets/logo.png'
import accountImg from '../../../assets/account.svg'
function Navbar() {


    let {error, loading, user} = useGetSelf()

    return (
        <div className={styles.navbar}>
            <h1 className={styles.logoHeader}>
                <img src={logo} className={styles.logoImg }alt="" />
                ovur.drive
            </h1>
            <h2 className={styles.account}> 
                <img className={styles.accountImg} src={accountImg} alt="" />
                {user.username}
            </h2>
        </div>
    ) 
}

export default Navbar