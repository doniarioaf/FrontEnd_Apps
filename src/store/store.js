import { createStore, applyMiddleware,compose } from 'redux';
import reducers from './reducers/reducers';
import middlewares from './middlewares/middlewares'

import { updateTheme } from './middlewares/themes.middleware.js';

import { persistedState, saveState } from './persisted.store.js';

import createSagaMiddleware from 'redux-saga';

import {
    watchLogin,
    watchAdmin,
}                           from "./sagas";
import {routerMiddleware} from 'connected-react-router';
import {history} from './history';

export default function configureStore() {

    let composeEnhancers = null;
    if (process.env.NODE_ENV === 'development') {
        composeEnhancers = window?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    } else {
        composeEnhancers = compose;
    }

    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        reducers,
        persistedState, // second argument overrides the initial state
        applyMiddleware(
            ...middlewares,routerMiddleware(history), sagaMiddleware
        )
    );

    // add a listener that will be invoked on any state change
    store.subscribe(() => {
        saveState(store.getState());
    });

    // Update the initial theme
    updateTheme(store.getState())

    sagaMiddleware.run(watchLogin);
    sagaMiddleware.run(watchAdmin);
    return store;

}