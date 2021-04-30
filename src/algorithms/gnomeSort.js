import { setArray } from '../reducers/array/index'
import { setCurrentCompare } from '../reducers/currentCompare/index'
import { setCurrentSort } from '../reducers/currentSort/index'
import { setSorting } from '../reducers/sorting/index'
import { setCurrentSwap } from '../reducers/currentSwap/index'
import { setComparisons } from '../reducers/comparisons/index'
import { setNumSwaps } from '../reducers/numSwaps/index'



function gnomeSort(array, dispatch, speed){
    let log = []
    array = array.slice(0)
    let index = 0
    while(index<array.length){
        log.push([index, index-1])
        if(index===0) index++
        log.push(["comp"])
        if(array[index] >= array[index-1]) {
            index++
        }
        else{
            log.push([])
            log.push([index, index-1, true])
            let temp = 0
            temp = array[index]
            array[index] = array[index-1]
            array[index-1] = temp
            log.push(["swap"])
            log.push(array.slice(0))
            log.push([])
            index--
        }
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

export default gnomeSort