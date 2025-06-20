import { useContext, useState, useEffect, useRef } from 'react'
import DriveContext from '../DriveContext'
import chevronRight from '../../../assets/chevron-right.svg'
import styles from '../../../css/contentbar.module.css'
import React from 'react'



const PathBar = React.forwardRef(({pathComp, goBackToId}, ref) => {    

    let [sizeMultipliers, setSizeMultipliers] = useState([])

    let {imgHeight, fontSize} = elemSizes(sizeMultipliers)

    let {currentFolder, setCurrentFolderId} = useContext(DriveContext)
    let pbRef = useRef()
    let imgStyle = {height: `${imgHeight}vh`}
    let textStyle = {fontSize: `${fontSize}vh`}
    let fadingPaths = [...pathComp.fading]
    fadingPaths = fadingPaths.map(pObj => {
        let newObj = {...pObj, fade: true}
        return newObj
    })
    let combined = [...pathComp.current, ...fadingPaths]
    let elements = combined.map(pObj => {   
        let {id, name} = pObj 
        function clickPath() {
            goBackToId(id)
        }  
        let fadeClass = pObj.fade ? styles.fadePath : styles.pathbarChild 

        return (
            <div id={id} className={styles.pathbarChild + ` ` + fadeClass} key={id}>
                <img style={imgStyle}src={chevronRight} alt="" />
                <div onClick={clickPath} style={textStyle}className={styles.pathbarPath}>{name}</div>
            </div>
        )
    })
    return (
      <div ref={pbRef}className={styles.pathbar}>
        {elements}
      </div>
    )
})

export default PathBar


function elemSizes(multipliers) {
    let fontSize = 2.8  
    let imgHeight = 2.5
    let n = 7
    for (const m of multipliers) {
        fontSize = Math.floor(fontSize*m*n)/10
        imgHeight = Math.floor(imgHeight*m*n)/10
    }
    return {fontSize, imgHeight}
}