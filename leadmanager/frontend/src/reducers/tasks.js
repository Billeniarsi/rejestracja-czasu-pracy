import { GET_TASKS } from '../actions/types';

const initialState = {
    tasks: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_TASKS:
            return {
                ...state,
                tasks: action.payload
            };
        default:
            return state;
    }
}