import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

const store = createStore(
    reducers,
    {},
    applyMiddleware(ReduxThunk, createLogger({collapsed: true}))
);

export default store;
