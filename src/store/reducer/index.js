import { createStore, combineReducers } from 'redux';
import getCurNews from './redux'


let store = createStore(combineReducers({ news: getCurNews }));

export default store