import { createAction, handleActions } from 'redux-actions'

const initialState = null

export const SET_PIVOT = "SET_PIVOT"
export const setPivot = createAction(SET_PIVOT)

export const pivot = handleActions({
    SET_PIVOT: (state, {payload}) => {
        return payload
    }
}, initialState)