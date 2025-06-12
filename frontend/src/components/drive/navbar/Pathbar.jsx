import { useContext, useState, useEffect, useRef } from 'react'
import DriveContext from '../DriveContext'
import chevronRight from '../../../assets/chevron-right.svg'
import styles from '../../../css/contentbar.module.css'
import React from 'react'



const PathBar = React.forwardRef((props, ref) => {    

    let [sizeMultipliers, setSizeMultipliers] = useState([])

    let {imgHeight, fontSize} = elemSizes(sizeMultipliers)

    let {currentFolder, setCurrentFolderId} = useContext(DriveContext)
    let pbRef = useRef()
    let [pathComp, setPathComp] = useState([])
    let imgStyle = {height: `${imgHeight}vh`}
    let textStyle = {fontSize: `${fontSize}vh`}

    useEffect(() => {
        let {id} = currentFolder
        

        setPathComp(pathComp => {
            let cleanedComp = pathComp.filter(pObj => !pObj.fade)
            let isGoingBack = cleanedComp.some(pObj => pObj.id == id)
            if (isGoingBack) {
                let spliceIndex = cleanedComp.findIndex(pObj => pObj.id == id) + 1
                let copy = cleanedComp
                let splicedElems = cleanedComp.splice(spliceIndex)
                splicedElems.forEach(pObj => pObj.fade = true)
                return [...copy, ...splicedElems]
            }
            if (!isGoingBack) {
                let newComp = [...cleanedComp, {id, name: currentFolder.name, fade: false}]
                return newComp
            }
        })

    }, [currentFolder])

    useEffect(() => {
        return () => setPathComp([])
    }, [])


    let elements = pathComp.map(pObj => {   
        let {id, name} = pObj 
        function clickPath() {
            setCurrentFolderId(id)
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