import { combineReducers } from "redux";
import stocksReducer from "./reducers/stocksReducer";
import { thunk } from "redux-thunk";
import { Tuple, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage
};

const rootReducer = combineReducers({
    stocks: stocksReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

let middleware = [thunk];

const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: () => new Tuple(...middleware)
});

const persistor = persistStore(store);

export { store, persistor };