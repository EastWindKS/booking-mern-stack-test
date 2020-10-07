import {UPDATE_ACCESS} from "./actions";

const accessReducer = (state = {access: false}, action) => {
    switch (action.type) {
        case UPDATE_ACCESS:
            return {...state, access: true};
        default:
            return {...state};
    }
};

export default accessReducer;