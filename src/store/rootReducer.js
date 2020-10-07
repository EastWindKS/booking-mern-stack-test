import accessReducer from "./reducer";
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    access: accessReducer
});

export default rootReducer;