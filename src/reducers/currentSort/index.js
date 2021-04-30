import { createAction, handleActions } from 'redux-actions'

const initialState = []

export const SET_CURRENT_SORT = "SET_CURRENT_SORT"
export const setCurrentSort = createAction(SET_CURRENT_SORT)
export const currentSort = handleActions({
    SET_CURRENT_SORT: (state, {payload}) => {
        if(payload.length) return state.concat(payload)
        else return []
    }
}, initialState)

