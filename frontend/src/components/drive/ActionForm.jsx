import React, { useState, useRef } from 'react'
import axios from 'axios'


function ActionForm({useVisibleState, onSubmit, defaultValue=''}) {

    
    const [visible, setVisible] = useVisibleState
    const [fieldValue, setFieldValue] = useState(defaultValue)
    if (!visible) return 

    function handleSubmit(e) {
        e.stopPropagation()
        onSubmit(fieldValue)
    }
    function handleCancel(e) {
        e.stopPropagation()
        setFieldValue(defaultValue)
        setVisible(false)
    }
    function handleChange(e) { 
        setFieldValue(e.target.value)
    }
    return (
        <div>
            <label htmlFor="field">''</label>
            <input type="text" name='field' id='field' 
                value={fieldValue}
                onChange={handleChange}
            />
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}



export function FileActionForm({useVisibleState, onSubmit, defaultValue}) {

    
    const [visible, setVisible] = useState(false)
    let fileRef = useRef(null)
    if (!visible) return 

    function handleSubmit(e) {
        e.stopPropagation()
        onSubmit(fileRef.current)
    }
    function handleCancel(e) {
        e.stopPropagation()
        fileRef.current = 0
        setVisible(false)
    }
    function handleChange(e) { 
        
        fileRef.current = e.target.files[0]

        if (fileRef.current.size == 0) {
            alert('Cannot upload empty files!')
            fileRef.current = null
            return
        }
        console.log(fileRef.current)
    }
    if (!visible) {
        
    }
    return (
        <div>
            <label htmlFor="field">Upload file</label>
            <input type="file" name='field' id='field' 
                onChange={handleChange}
            />
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}


export default ActionForm
