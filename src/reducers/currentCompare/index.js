import { createAction, handleActions } from 'redux-actions'

const initialState = []

export const SET_CURRENT_COMPARE = "SET_CURRENT_COMPARE"
export const setCurrentCompare = createAction(SET_CURRENT_COMPARE)
export const currentCompare = handleActions({
    SET_CURRENT_COMPARE: (state, {payload}) => {
        return payload;
    }
}, initialState);