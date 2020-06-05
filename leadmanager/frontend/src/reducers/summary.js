import { GET_SUMMARY } from '../actions/types';

const initialState = {
    summary: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_SUMMARY:
            return {
                ...state,
                summary: action.payload
            };
        default:
            return state;
    }
}