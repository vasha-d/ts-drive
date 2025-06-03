import React, { useContext, useEffect, useState, useRef} from 'react'
import DriveContext from '../DriveContext'
import NewFolderButton from '../NewFolderButton';
import NewFileButton from '../NewFileButton';
import mainStyles from '../../../css/drive.module.css'
import pbStyles from '../../../css/contentbar.module.css'
import back from '../../../assets/back.svg'
import chevronRight from '../../../assets/chevron-right.svg'


let styles = Object.assign({}, mainStyles, pbStyles)    

function elemSizes(multipliers) {
    let fontSize = 3
    let imgHeight = 4
    let n = 8
    for (const m of multipliers) {
        fontSize = Math.floor(fontSize*m*n)/10
        imgHeight = Math.floor(imgHeight*m*n)/10
    }
    return {fontSize, imgHeight}
}

const PathBar = React.forwardRef(({pathComp, imgHeight, fontSize}, ref) => {    
    let imgStyle = {height: `${imgHeight}vh`}
    let textStyle = {fontSize: `${fontSize}vh`}
    let elements = pathComp.map(pObj => {      
        return (
            <div className={styles.pathbarChild} key={pObj.id}>
                <img style={imgStyle}src={chevronRight} alt="" />
                <div style={textStyle}className={styles.pathbarPath}>{pObj.name}</div>
            </div>
        )
    })
    return (
      <div ref={ref}className={styles.pathbar}>
        {elements}
      </div>
    )
})


function ContentBar() {

    let {currentFolder, setCurrentFolderId} = useContext(DriveContext)
    let {id, parentId} = currentFolder
    let [pathComp, setPathComp] = useState([])
    let didMount = useRef(false)
    let pbRef = useRef()
    let [sizeMultipliers, setSizeMultipliers] = useState([])
    function clickBackButton() {
        if (!parentId) return;
        setCurrentFolderId(parentId)
    }
    useEffect(() => {
        if (!didMount.current) {
            didMount.current = true
            return
        }        
        let goingBack = pathComp.some(val => val.id == currentFolder.id)
        if (goingBack) {
            if (sizeMultipliers.length) {
                console.log(sizeMultipliers, 'changingnow');
                setSizeMultipliers(m => {
                    let copy = m
                    copy.splice(-1)
                    return copy
                })
                console.log(sizeMultipliers);
            }
            setPathComp(p => {
                let newPathComp = []
                for (const obj of p) {
                    newPathComp.push(obj)
                    if (obj.id == id) break;
                }
                return newPathComp
            })
        } else {
            setPathComp(p => {
                let toAdd = {id: id, name: currentFolder.name}
                return [...p, toAdd]
            }) 
        }
   
    }, [id])
    useEffect(() => {
        let ref = pbRef.current
        if (!ref) return;
        console.log(ref);
        let approximatedContentWidth = ref.clientWidth 
        if (ref.scrollWidth > approximatedContentWidth) {
            console.log('adding multiplier');
            let multiplier = approximatedContentWidth/ref.scrollWidth        
            setSizeMultipliers(m => {
                return  [...m, multiplier]
            })
        }
    }, [pathComp]) 
    let {imgHeight, fontSize} = elemSizes(sizeMultipliers)
    console.log(imgHeight, fontSize);
    console.log(sizeMultipliers);
    return (
        <div className={styles.contentbar}>
            <div className= {styles.backButton}onClick={clickBackButton}>
                <img src={back} alt="" />
            </div>
            <PathBar ref={pbRef}
                pathComp={pathComp}
                imgHeight={imgHeight}    
                fontSize={fontSize}
            ></PathBar>
            <NewFolderButton
                parentId = {id}
            ></NewFolderButton>
            <NewFileButton
                parentId = {id}
            ></NewFileButton>
        </div>
    )
}

export default ContentBar