import React from 'react'
import styles from '../../../css/sidebar.module.css'
import recent from '../../../assets/recent.svg'
import share from '../../../assets/share.svg'
import star from '../../../assets/star.svg'
import stored from '../../../assets/stored.svg'


function Sidebar() {

  return (
    <div className={styles.sidebar}>
        <div className={styles.sidebarChild}>
          <img src={recent} alt="" />
          Recent
        </div>
        <div className={styles.sidebarChild}>
          <img src={star} alt="" />
          <span>Starred</span>
        </div>
        <div className={styles.sidebarChild}>
          <img src={share} alt="" />
          <span>Shared</span>
        </div>
        <div className={styles.sidebarChild}>
          <img src={stored}  alt="" />
          <span>Stored</span>
        </div>
    </div>
  )
}

export default Sidebar