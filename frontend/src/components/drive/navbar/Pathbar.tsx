import { useEffect, useRef, useReducer } from 'react'
import DriveContext from '../DriveContext'
import chevronRight from '../../../assets/chevron-right.svg'
import styles from '../../../css/contentbar.module.css'
import React from 'react'

function isSwitchingToStarred(pathComp, displaying) {
    let c1 = pathComp.current.length == 2
    let c2 = pathComp.current[0]?.id == 'drive'
    let c3 = pathComp.current[1]?.id == 'starred'
    let c4 = displaying.current[1]?.id != 'starred'
    return c1 && c2 && c3 && c4
}
function isSwitchingToShared(pathComp, displaying) {
    let c1 = pathComp.current.length == 2
    let c2 = pathComp.current[0]?.id == 'drive'
    let c3 = pathComp.current[1]?.id == 'shared'
    let c4 = displaying.current[1]?.id != 'shared'
    return c1 && c2 && c3 && c4
}
function displayingReducer(displaying, action) {

    if (action.type == 'check') {
        let {overflowing} = action.payload
        
        let newCurrentPaths = [...displaying.current]
        newCurrentPaths[newCurrentPaths.length-1].uncertain = false
        newCurrentPaths[newCurrentPaths.length-1].overflowing = overflowing

        return {current: newCurrentPaths, fading: displaying.fading}
    }

    if (action.type =='updateComp') {

        let pathComp = action.payload
        let isAddingNew = pathComp.current.length > displaying.current.length
        let alreadyOverflowed = displaying.current[displaying.current.length-1].overflowing
        if (isSwitchingToStarred(pathComp, displaying)) {
            return {
                current: pathComp.current,
                fading: displaying.current.slice(2)
            }
        }
        if (isSwitchingToShared(pathComp, displaying)) {
            return {
                current: pathComp.current,
                fading: displaying.current.slice(2)
            }
        }
        if (isAddingNew) {
            
            if (alreadyOverflowed) return displaying;

            let newCurrentPaths = [...pathComp.current]
            newCurrentPaths[newCurrentPaths.length-1].uncertain = true

            return {current: newCurrentPaths, fading: pathComp.fading}     
        } else {
            let newLength = pathComp.current.length
            let newCurrentPaths = displaying.current.slice(0, newLength)
            let newFading = displaying.current.slice(newLength)
            return {current: newCurrentPaths, fading: newFading }
        }
    }

    
    return displaying
}
const PathBar = React.forwardRef<HTMLDivElement, any>(({pathComp, goBackToId}, ref) => {    
    let pbRef = useRef()
    let [displaying, dispatchDisplaying] = useReducer(displayingReducer, pathComp)
    let currentPaths = displaying.current.map(pObj => {  
        return (    
            <PathElement pObj={pObj} key={pObj.id}goBackToId = {goBackToId}
            />
        )
    })
    let fadingPaths = displaying.fading.map(pObj => {   
        return (
            <FadingPath pObj={pObj}  />
        )
    })
    useEffect(() => {

        dispatchDisplaying({type: 'updateComp', payload: pathComp})
    }, [pathComp])
    useEffect(() => {
        let currentPaths = displaying.current
        let lastElem = currentPaths[currentPaths.length-1] 
        if (!lastElem.uncertain) return;
        let isOverflowing = pbRef.current.scrollWidth > 630

        if (isOverflowing) {
            dispatchDisplaying({type: 'check', payload: {overflowing: true}})
        } else {
            dispatchDisplaying({type: 'check', payload: {overflowing: false}})
        }
    }, [displaying])
    //on pathcomp update, add the last element with opacity 0, meanig 
    //the last object has attributed hidden by default
    //this should be done in the reducer,
    //after dom is updated, check if the pathbar is overflowing
    //if it is not, then remove the hide attribute from the last element, if it is,
    //keep the hide to true, add overflowing attribute and set to true.
    //if overflwoing attribute is set, it meanns to render the ovf element
    //instead of the pathElement
    //on th next update, if the last element is still hidden, dont add others..
    // if it is nto hiddenm add the next element with the same prcess, hidden at the start etc...
    //on update, if the pathbar is going back, cut the displaying length to the same as the 
    //pathbar current length, and add all the other the fading class
    //
    return (
        <div className={styles.pathbar}>
            <div ref={pbRef} className={styles.listContainer}>
                {currentPaths}

            </div>
            <div className={styles.fadingContainer}>
                {fadingPaths}
            </div>
        </div>
    )
})

export default PathBar


function PathElement({pObj, goBackToId}) {
    let {id, uncertain, overflowing, name,} = pObj
    if (overflowing) {
        return <OverflowElement id={id}></OverflowElement>
    }
    let hideClass = uncertain ? styles.hidden : ''
    let clickPath = () => {goBackToId(id)}
    return (

        <div id={id} className={hideClass+` `+styles.pathbarChild} >
            <img className={styles.pbImg} src={chevronRight} alt="" />
            <div onClick={clickPath} className={styles.pathbarPath}>{name}</div>
        </div>
    )
}
function OverflowElement({id, fade}) {
    let fadeClass = fade ? styles.fadePath : ''
    return (
        <div key={id}  className={styles.overflowElement + ` ` + fadeClass}>
            <img src={chevronRight} className={styles.pbImg} alt="" />
            <span className={styles.overflowTxt}>......</span>
        </div>
    );
}
function FadingPath({pObj}) {
    let {id, overflowing, name} = pObj
    if (overflowing) return <OverflowElement fade={true} id={id}></OverflowElement>
    return (<div id={id} className={styles.pathbarChild + ` ` + styles.fadePath} key={id}>
            <img className={styles.pbImg} src={chevronRight} alt="" />
            <div className={styles.pathbarPath}>{name}</div>
        </div>);
}
  