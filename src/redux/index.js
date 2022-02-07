import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
import appReducer from './reducers'
import {tokenName, storageKey} from '../config.json'
const initialState = {};
const middleware = [thunk];



const persistConfig = {
    key: storageKey,
    storage,
}
export const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        storage.removeItem('persist:'+storageKey)
        localStorage.removeItem(tokenName)
        state = initialState;
        window.location = '/login'
    }  
    return appReducer(state, action)
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


const AppStore = createStore(
    persistedReducer,
    initialState,
    compose(
        applyMiddleware(...middleware)
    )
);

let persistor = persistStore(AppStore)
export { AppStore, persistor };