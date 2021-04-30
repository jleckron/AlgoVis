import { createAction, handleActions } from 'redux-actions'

const initialState = false

export const SET_SORTING = "SET_SORTING"
export const setSorting = createAction(SET_SORTING)
export const sorting = handleActions({
    SET_SORTING: (state, {payload}) => {
        return payload
    }
}, initialState)

