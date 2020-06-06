import { GET_REPORTS, DELETE_REPORT } from '../actions/types';

const initialState = {
    reports: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_REPORTS:
            return {
                ...state,
                reports: action.payload
            };
        case DELETE_REPORT:
            return {
                ...state,
                reports: state.reports.filter(report => report.id !== action.payload)
            };
        default:
            return state;
    }
}