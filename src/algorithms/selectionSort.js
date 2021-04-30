import { setArray } from '../reducers/array/index'
import { setCurrentCompare } from '../reducers/currentCompare/index'
import { setCurrentSort } from '../reducers/currentSort/index'
import { setSorting } from '../reducers/sorting/index'
import { setCurrentSwap } from '../reducers/currentSwap/index'
import { setComparisons } from '../reducers/comparisons/index'
import { setNumSwaps } from '../reducers/numSwaps/index'

function selectionSort(array, dispatch, speed){
    let log = []
    array = array.slice(0)
    for(let i=0; i<array.length;i++){
        let min = i
        for(let j=i; j<array.length; j++){
            log.push(["comp"])
            log.push([i,j])
            if(array[min] > array[j]){
                log.push([])
                log.push([i, j, true])
                min = j
            }
        }
        log.push(["swap"])
        let temp = array[i]
        array[i] = array[min]
        array[min] = temp
        log.push([i, min])
        log.push(array.slice(0))
        log.push([])
        log.push([true, i])
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

export default selectionSort