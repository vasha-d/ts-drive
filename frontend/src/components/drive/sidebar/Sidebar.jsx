import React from 'react'
import styles from '../../../css/drive.module.css'

function Sidebar() {
  return (
    <div className={styles.sidebar}>
        <h3>Starred</h3>
        <h3>Recent</h3>
        <h3>Shared</h3>
        <h3>Stored</h3>
    </div>
  )
}

export default Sidebar