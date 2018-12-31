import { createStore, applyMiddleware } from 'redux';
import modules from './modules';

import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

/* 로그 미들웨어를 생성할 때 설정을 커스터마이징 할 수 있습니다.
    https://github.com/evgenyrodionov/redux-logger#options
 */
const logger = createLogger();
const customizedPromiseMiddleware = promiseMiddleware({
    promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'FAILURE']
});

const store = createStore(modules, applyMiddleware(logger, ReduxThunk, customizedPromiseMiddleware))

export default store;