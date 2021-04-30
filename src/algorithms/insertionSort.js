import { setArray } from '../reducers/array/index'
import { setCurrentCompare } from '../reducers/currentCompare/index'
import { setCurrentSort } from '../reducers/currentSort/index'
import { setSorting } from '../reducers/sorting/index'
import { setCurrentSwap } from '../reducers/currentSwap/index'
import { setComparisons } from '../reducers/comparisons/index'
import { setNumSwaps } from '../reducers/numSwaps/index'

function insertionSort(array, dispatch, speed){
    array = array.slice(0)
    let log = []
    log.push([true, 0])
    for(let i=1; i<array.length;i++){
        let key = array[i]
        let j = i - 1
        log.push([i,i])
        log.push(["comp"])
        while(j>=0 && array[j]>key){
            log.push(["comp"])
            //log.push([])
            log.push([j,j,true])
            array[j+1] = array[j]
            j--
        }
        array[j+1] = key
        log.push([j+1, j+1])
        log.push(array.slice(0))
        log.push([true, i])
        log.push([])
        log.push(["swap"])

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

export default insertionSort