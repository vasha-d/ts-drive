import React, { useContext } from 'react'
import styles from '../../../css/sidebar.module.css'
import recent from '../../../assets/recent.svg'
import share from '../../../assets/share.svg'
import star from '../../../assets/star.svg'
import stored from '../../../assets/stored.svg'
import signOut from '../../../assets/sign-out.svg'
import {  useNavigate } from 'react-router-dom'
import apiSignOut from '../../api/signOut'

function Sidebar({goToRecent, goToStarred, goToShared}) {
    let navigate = useNavigate()
 
    function navigateToRecent () {
      goToRecent()
      navigate('/drive/recent')
    }
    function navToStarred () {
      goToStarred()
      navigate('/drive/starred')
    }
    function navToShared() {
      goToShared()
      navigate('/drive/shared')
    }
    function handleSignOut() {
      apiSignOut()
    }
    return (
      <div className={styles.sidebar}>
          <div onClick={navigateToRecent} className={styles.sidebarChild}>
            <img src={recent} alt="" />
            Recent
          </div>
          <div onClick={navToStarred}className={styles.sidebarChild}>
            <img src={star} alt="" />
            <span>Starred</span>
          </div>
          <div onClick={navToShared}className={styles.sidebarChild}>
            <img src={share} alt="" />
            <span>Shared</span>
          </div>
          <div className={styles.sidebarChild}>
            <img src={stored}  alt="" />
            <span>Stored</span>
          </div>

          <div onClick={handleSignOut} className={styles.sidebarChild + ` ` + styles.signOut}>
            <img src={signOut}  alt="" />
            <span>Sign Out</span>
          </div>
      </div>
    )
}

export default Sidebar