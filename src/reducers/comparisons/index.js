import { createAction, handleActions } from 'redux-actions'

const initialState = 0

export const SET_COMPARISONS = "SET_COMPARISONS"
export const setComparisons = createAction(SET_COMPARISONS)
export const comparisons = handleActions({
    SET_COMPARISONS: (state, {payload}) => {
        if(payload===0) return 0
        return state += 1
    }
}, initialState)

