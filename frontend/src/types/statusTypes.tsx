



export type statusType = 'inProgress' | 'success' | 'failure'


export type statusObjType = {
    status: statusType,
    text: string
}


export type setInProgressType = (text: string) => void
export type setResultType = (result: 'success' | 'failure') => void