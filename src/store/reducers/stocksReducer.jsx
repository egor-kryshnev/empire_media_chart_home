import { produce } from "immer";
import { SET_STOCKS, SET_INTERVAL } from "../types/types";


const stocksReducer = produce(
    (state, action) => {
        switch (action.type) {
            case SET_STOCKS: {
                state.data = action.payload
                return state;
            }
            case SET_INTERVAL: {
                state.interval = action.payload
                return state;
            }
            default:
                return state;
        }
    },
    {
        data: null,
        interval: {
            value: 1,
            precision: "hour"
        }
    }
);
export default stocksReducer;