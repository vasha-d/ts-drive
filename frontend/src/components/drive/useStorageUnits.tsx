
function useStorageUnits(bytes: number | undefined) {
    if (bytes == undefined) return 
    const kbdecimal = Math.round(bytes/10)/100
    const kbround = Math.round(bytes/1000)
    const mb = Math.round(bytes/10000)/100
    const gb = Math.round(bytes/10000000)/100

    let amount = kbdecimal
    let unit = 'kb'
    if (kbround >= 1) {
        amount = kbround
    }
    if (mb > 1)  {  
        unit = 'mb'
        amount = mb
    }
    if (gb > 1) {
        amount = gb
        unit = 'gb'
    }
    return `${amount}${unit}`

}

export default useStorageUnits