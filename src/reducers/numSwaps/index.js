import { createAction, handleActions } from 'redux-actions'

const initialState = 0

export const SET_NUM_SWAPS = "SET_NUM_SWAPS"
export const setNumSwaps = createAction(SET_NUM_SWAPS)
export const numSwaps = handleActions({
    SET_NUM_SWAPS: (state, {payload}) => {
        if(payload===0) return 0
        return state += 1
    }
}, initialState)

