import { GET_REPORTS } from '../actions/types';

const initialState = {
    startDate: "",
    endDate: "",
    reports: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_REPORTS:
            console.log("save in state")
            return {
                ...state,
                reports: action.payload
            };
        default:
            return state;
    }
}