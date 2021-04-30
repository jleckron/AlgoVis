import { setArray } from '../reducers/array/index'
import { setCurrentCompare } from '../reducers/currentCompare/index'
import { setCurrentSort } from '../reducers/currentSort/index'
import { setSorting } from '../reducers/sorting/index'
import { setCurrentSwap } from '../reducers/currentSwap/index'
import { setComparisons } from '../reducers/comparisons/index'
import { setNumSwaps } from '../reducers/numSwaps/index'

function bubbleSort(array, dispatch, speed){
    array = array.slice(0)
    let n = array.length
    let log = []
    for(let i=0; i<n-1; i++){
        for(let j=0; j<n-i-1; j++){
            log.push([j, j+1])
            log.push(["comp"])
            if(array[j] > array[j+1]){
                log.push([j, j+1, true])
                let temp = array[j]
                array[j] = array[j+1]
                array[j+1] = temp
                log.push(["swap"])
                log.push(array.slice(0))
                log.push([])
            }
        }
        log.push([true, n-i-1])
    }
    sendDispatch(array, log, dispatch, speed)
    return array
}

function sendDispatch(sorted, log, dispatch, speed){
    if(!log.length){
        dispatch(setCurrentCompare([]))
        setTimeout(() => {
            dispatch(setCurrentCompare([]))
            dispatch(setCurrentSort([]))
            dispatch(setSorting(false))
        }, 500);
        return
    }
    let logInstruction = log[0].length > 3 ? setArray
        : log[0].length===3 || log[0].length===0 ? setCurrentSwap
        : log[0].length===2 && typeof log[0][0]==="boolean" ? setCurrentSort
        : log[0].length===1 ? (log[0]=="comp" ? setComparisons : setNumSwaps)
        : setCurrentCompare
    dispatch(logInstruction(log.shift()))
    setTimeout(() => {
        sendDispatch(sorted, log, dispatch, speed)
    }, speed)
}

export default bubbleSort