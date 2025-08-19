import React, { useContext } from 'react'
import styles from '../../../css/sidebar.module.css'
import recent from '../../../assets/recent.svg'
import share from '../../../assets/share.svg'
import star from '../../../assets/star.svg'
import stored from '../../../assets/stored.svg'
import signOut from '../../../assets/sign-out.svg'
import {  useNavigate } from 'react-router-dom'
import apiSignOut from '../../api/signOut'
import useGetSelf from '../../api/useGetSelf'
import useStorageUnits from '../useStorageUnits'

function Sidebar({goToName}) {
    const navigate = useNavigate()
    function navigateToRecent () {
      goToName('recent')
      navigate('/drive/recent')
    }
    function navToStarred () {
      goToName('starred')
      navigate('/drive/starred')
    }
    function navToShared() {
      goToName('shared')
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
          <Stored/>
          <div onClick={handleSignOut} className={styles.sidebarChild + ` ` + styles.signOut}>
            <img src={signOut}  alt="" />
            <span>Sign Out</span>
          </div>
      </div>
    )
}
function Stored() {
    const user = useGetSelf()
    const totalStored = user.user.totalStored

    let storageSize = useStorageUnits(totalStored)
    let gbAmount = Math.round(totalStored/10737418)/100
    let percentage = Math.round(gbAmount/15)/100
    const styleAttr = {width: `${percentage}%`}
    return (
      <div className={styles.sidebarChild + ` ` + styles.stored}>
        <img src={stored} alt="" />
        <span>Stored</span>
        <div className={styles.storedBar}>
          <div className={styles.storedProgress} style={styleAttr}></div>
        </div>
        <div className={styles.storedTxt}>

          {storageSize} <b>/</b> 15GB
        </div>
      </div>
    )
}
  


export default Sidebar