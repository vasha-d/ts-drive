import { useEffect, useRef, useReducer, act } from 'react'
import chevronRight from '../../../assets/chevron-right.svg'
import styles from '../../../css/contentbar.module.css'
import React from 'react'
import type { PathBarProps, pathStatusType } from '../../../types/pbtypes'


type actionType = {
    type: 'check', 
    payload: {overflowing: boolean}
} | {
    type: 'updateComp',
    payload: pathStatusType
}
function displayingReducer(displaying, action: actionType) {

    if (action.type == 'check') {
        let {overflowing} = action.payload
        
        let newCurrentPaths = [...displaying.current]
        newCurrentPaths[newCurrentPaths.length-1].uncertain = false
        newCurrentPaths[newCurrentPaths.length-1].overflowing = overflowing

        return {current: newCurrentPaths, fading: displaying.fading}
    }

    if (action.type =='updateComp') {
        let {curDir, lastAction} = action.payload
                let alreadyOverflowed = displaying.current[displaying.current.length-1].overflowing
        
        if (lastAction=='goToStarred') {
            return {
                current: curDir.current,
                fading: displaying.current.slice(2)
            }
        }
        if (lastAction=='goToShared') {
            return {
                current: curDir.current,
                fading: displaying.current.slice(2)
            }
        }
        if (lastAction=="addToDir") {
            
            if (alreadyOverflowed) return displaying;

            let newCurrentPaths = [...curDir.current]
            newCurrentPaths[newCurrentPaths.length-1].uncertain = true

            return {current: newCurrentPaths, fading: curDir.fading}     
        } 
        if (lastAction=="goBackOne" || lastAction =="goBackToId" || lastAction=="goToRecent") {
            let newLength = curDir.current.length
            let newCurrentPaths = displaying.current.slice(0, newLength)
            let newFading = displaying.current.slice(newLength)
            return {current: newCurrentPaths, fading: newFading }
        }
    }

    
    return displaying
}

const PathBar = React.forwardRef<HTMLDivElement, PathBarProps>(({status, goBackToId}, ref) => {    
    let pbRef = useRef<HTMLDivElement>(null)
    let {curDir, lastAction} = status
    let [displaying, dispatchDisplaying] = useReducer(displayingReducer, curDir)
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

        dispatchDisplaying({type: 'updateComp', payload: status})
    }, [status])
    useEffect(() => {
        //check if pathbar is overflowing
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
    //on curDir update, add the last element with opacity 0, meanig 
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
  