import { combineReducers } from "redux";
import { array } from './array/index'
import { algorithm } from './algorithm/index'
import { sorting } from './sorting/index'
import { currentSort } from './currentSort/index'
import { currentCompare } from './currentCompare/index'
import { currentSwap } from './currentSwap/index'
import { pivot} from './compPivot/index'
import { comparisons } from './comparisons/index'
import { numSwaps } from './numSwaps/index'


export default combineReducers({
    array, 
    algorithm,
    sorting,
    currentSort,
    currentCompare,
    currentSwap,
    pivot,
    comparisons,
    numSwaps,
})