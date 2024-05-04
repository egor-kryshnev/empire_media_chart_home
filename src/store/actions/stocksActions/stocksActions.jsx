import { SET_STOCKS, SET_INTERVAL } from "../../types/types"

export const setStocks = (payload) => {
    return {
        type: SET_STOCKS,
        payload
    }
}

export const setTimeInterval = (payload) => {
    return {
        type: SET_INTERVAL,
        payload
    }
}