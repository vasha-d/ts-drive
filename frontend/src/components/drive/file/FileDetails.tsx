import React, { useState } from 'react'

function FileDetails({fileObj}) {

    let [visible, setVisible] = useState(false)
    let {createdAt, extension, name, size, } = fileObj
    let date = new Date(createdAt)
    date = date.toDateString()
    function clickViewDetails () {
        setVisible(v => !v) 
    }

    let details = !visible ? null :
        <div>
            File name : {name}
            <br />
            Date created: {date}
            <br />
            Extension: {extension}
            <br />
            Size: {`${size} Bytes`}
        </div>

    return (    
        <>
            {details}
            <button onClick={clickViewDetails}>View File Details</button>
        </>
    )
}

export default FileDetails