import { setArray } from '../reducers/array/index'
import { setCurrentCompare } from '../reducers/currentCompare/index'
import { setCurrentSort } from '../reducers/currentSort/index'
import { setSorting } from '../reducers/sorting/index'
import { setCurrentSwap } from '../reducers/currentSwap/index'
import { setComparisons } from '../reducers/comparisons/index'
import { setNumSwaps } from '../reducers/numSwaps/index'


function heapSort(array, dispatch, speed){
    let log = []
    array = array.slice(0)
    sort(array, log)
    sendDispatch(array, log, dispatch, speed)
    return array
}

function sort(arr, log){
    buildMaxHeap(arr, log)
    let lastElement = arr.length-1
    while(lastElement>0){
        log.push([lastElement, lastElement, lastElement])
        log.push([0, lastElement, true])
        let temp = arr[0]
        arr[0] = arr[lastElement]
        arr[lastElement] = temp
        log.push(arr.slice(0))
        log.push([])
        log.push([true, lastElement])
        heapify(arr, 0, lastElement, log)
        lastElement--
    }
    return arr
}

function buildMaxHeap(arr, log){
    let i = Math.floor(arr.length/2 - 1)
    while(i>=0){
        heapify(arr, i, arr.length, log)
        i--
    }
}

function heapify(arr, start, end, log){
    if(start >= Math.floor(end/2)) return 
    let left = start * 2 + 1
    let right = left + 1 < end ? left + 1 : null
    let swap
    if(right) swap = arr[left] > arr[right] ? left : right
    else swap = left
    log.push([start, swap, right])
    log.push(["comp"])
    if(arr[start] < arr[swap]){
        log.push([start, swap, true])
        let temp = arr[swap]
        arr[swap] = arr[start]
        arr[start] = temp
        log.push(["swap"])
        log.push(arr.slice(0))
        log.push([])
        heapify(arr, swap, end, log)
    }
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
        : (log[0].length===3 && typeof log[0][2] === "boolean") || log[0].length===0 ? setCurrentSwap
        : log[0].length===2 && typeof log[0][0]==="boolean" ? setCurrentSort
        : log[0].length===1 ? (log[0]=="comp" ? setComparisons : setNumSwaps)
        : setCurrentCompare
    dispatch(logInstruction(log.shift()))
    setTimeout(() => {
        sendDispatch(sorted, log, dispatch, speed)
    }, speed)
}

export default heapSort