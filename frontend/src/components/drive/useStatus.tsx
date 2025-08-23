import { useState } from "react"
import type { setInProgressType, setResultType, statusObjType, statusType } from "../../types/statusTypes"
import styles from '../../css/status.module.css'

type useStatusReturnType = {
    setInProgress: setInProgressType,
    setResult: setResultType,
    status: statusType,
    text: string
}

export default function useStatus (elementRef: React.RefObject<HTMLDivElement | null>): useStatusReturnType {

    const [status, setStatus] = useState<statusType>('success')
    const [text, setText] = useState<string>('doing file')
    const [visible, setVisible] = useState(true)
    // pop up status
    // to export
    // setInProgres
    //set fail or success 
    // the animations will be handled internally 

    function popUpDiv () {
        setVisible(true)
        elementRef.current?.classList.remove(styles.lift, styles.drop)
        void elementRef.current?.offsetWidth
        elementRef.current?.classList.add(styles.lift)

    }
    function dropDiv () {
        elementRef.current?.classList.remove(styles.lift, styles.drop)
        void elementRef.current?.offsetLeft
        elementRef.current?.classList.add(styles.drop)
        function onAnimEnd () {
            elementRef.current?.removeEventListener('animationend', onAnimEnd)
            setVisible(false)
        }
        elementRef.current?.addEventListener('animationend', onAnimEnd)
    }

    function setInProgress (text: string) {
        popUpDiv()
        setText(text)
        setStatus('inProgress')
        //animatie element ref to pop up
        // set the text and status as necesseary 
    }    
    function setResult(result: 'success' | 'failure') {
        // change text and image
        // pop down after 1
        setStatus(result)
        function afterTimer() {
            clearTimeout(id)
            dropDiv()
        }
        const id = setTimeout(afterTimer, 3000)
    }

    return {
        setInProgress,
        setResult,
        status,
        text
    }
}   