import { store } from "../store";

export const getStocks = (state = store.getState()) => state.stocks.data;
export const getInterval = (state = store.getState()) => state.stocks.interval;