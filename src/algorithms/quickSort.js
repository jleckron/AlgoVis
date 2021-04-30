import { setArray } from '../reducers/array/index'
import { setPivot } from '../reducers/compPivot/index'
import { setCurrentSort } from '../reducers/currentSort/index'
import { setSorting } from '../reducers/sorting/index'
import { setCurrentSwap } from '../reducers/currentSwap/index'
import { setCurrentCompare } from '../reducers/currentCompare/index'
import { setComparisons } from '../reducers/comparisons/index'
import { setNumSwaps } from '../reducers/numSwaps/index'

function quickSort(array, dispatch, speed){
    let log = []
    array = array.slice(0)
    array = quickHelper(array, 0, array.length-1, log)
    sendDispatch(array, log, dispatch, speed)
    return array
}

function quickHelper(arr, low, high, log){
    if(low>=high) log.push([true, low])
    if(low<high){
        let partition = findPartition(arr, low, high, log)
        quickHelper(arr, low, partition-1, log)
        quickHelper(arr, partition+1, high, log)
    }
    return arr
}

function findPartition(arr, low , high, log){
    log.push(high)
    let pivot = arr[high]
    let i = low-1
    for(let j=low; j<high; j++){
        log.push([i+1, j])
        log.push(["comp"])
        if(arr[j]<=pivot){
            i++
            if(i!==j){
                log.push([])
                log.push([i, j, true])
                let temp = arr[i]
                arr[i] = arr[j]
                arr[j] = temp
                log.push(["swap"])
                log.push(arr.slice(0))
                log.push([])
            }
        }
    }
    if(i+1!==high){
        log.push([i+1, high])
        log.push([i+1, high, true])
        log.push(["swap"])
        let temp = arr[i+1]
        arr[i+1] = arr[high]
        arr[high] = temp
        log.push(arr.slice(0))
        log.push([])
     }
    log.push(-1)
    log.push([true, i+1])
    return i+1
}

function sendDispatch(sorted, log, dispatch, speed){
    if(!log.length){
        dispatch(setPivot(null))
        dispatch(setCurrentCompare([]))
        setTimeout(() => {
            dispatch(setCurrentCompare([]))
            dispatch(setCurrentSort([]))
            dispatch(setSorting(false))
        }, 500);
        return
    }
    let logInstruction = !(log[0] instanceof Array) ? setPivot
        : log[0].length > 3 ? setArray
        : log[0].length===3 || log[0].length===0 ? setCurrentSwap
        : log[0].length===2 && typeof log[0][0]==="boolean" ? setCurrentSort
        : log[0].length===1 ? (log[0]=="comp" ? setComparisons : setNumSwaps)
        : setCurrentCompare
    dispatch(logInstruction(log.shift()))
    setTimeout(() => {
        sendDispatch(sorted, log, dispatch, speed)
    }, speed)
}


export default quickSort