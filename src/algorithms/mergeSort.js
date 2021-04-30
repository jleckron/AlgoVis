import { setArray } from '../reducers/array/index'
import { setCurrentCompare } from '../reducers/currentCompare/index'
import { setCurrentSort } from '../reducers/currentSort/index'
import { setSorting } from '../reducers/sorting/index'
import { setCurrentSwap } from '../reducers/currentSwap/index'
import { setComparisons } from '../reducers/comparisons/index'
import { setNumSwaps } from '../reducers/numSwaps/index'

var arrayToRender = []

function mergeSort(array, dispatch, speed){
    let log = []
    array = array.slice(0)
    arrayToRender = array
    array = sort(array.map((num, indx) => [num, indx]), log, 0, array.length-1)
    log.push(array.slice(0))
    sendDispatch(array, log, dispatch, speed)
    return array
}

function sort(arr, log, start, end){
    if(arr.length<=1) return arr
    let finalMerge = false
    let mid = Math.floor(arr.length/2)
    let midIndex = Math.floor((end + start + 1)/2)
    let left = sort(arr.slice(0, mid), log, start, midIndex-1)
    let right = sort(arr.slice(mid), log, midIndex, end)
    if(left.length+right.length===arrayToRender.length) finalMerge=true
    return merge(left, right, log, start, end, finalMerge)
}

function merge(left, right, log, start, end, finalMerge){
    let arr = []
    let currIndex = start
    while(left.length && right.length){
        log.push(["comp"])
        log.push([left[0][1], right[0][1]])
        if(left[0][0] <= right[0][0]){
            arr.push(left.shift())
            currIndex++
        }
        else {
            log.push([])
            log.push([left[0][1], right[0][1], true])
            right[0][1] = currIndex++
            arr.push(right.shift())
            left.forEach(subArr => subArr[1]++)
            if(start===0){
                arrayToRender = arr.map(subArr => subArr[0])
                    .concat(left.map(subArr => subArr[0]))
                    .concat(right.map(subArr => subArr[0]))
                    .concat(arrayToRender.slice(end+1))
            }
            else {
                arrayToRender = arrayToRender.slice(0, start)
                    .concat(arr.map(subArr => subArr[0]))
                    .concat(left.map(subArr => subArr[0]))
                    .concat(right.map(subArr => subArr[0]))
                    .concat(arrayToRender.slice(end+1))
            }
            log.push(arrayToRender)
            log.push([])
            log.push([currIndex-1, currIndex])
        }
        if(finalMerge){
            log.push([true, currIndex-1])
            log.push([true, currIndex])
        }
    }
    return arr.concat(left).concat(right) 
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

export default mergeSort