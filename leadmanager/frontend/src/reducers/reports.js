import { GET_REPORTS, DELETE_REPORT, ADD_REPORT, CLEAR_REPORTS, ACCEPT_REPORT } from '../actions/types';

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
        case ADD_REPORT:
            return {
                ...state,
                reports: [...state.reports, action.payload]
            }
        case DELETE_REPORT:
            return {
                ...state,
                reports: state.reports.filter(report => report.id !== action.payload)
            };
        case CLEAR_REPORTS:
            return {
                ...state,
                reports: []
            };
        case ACCEPT_REPORT:
            return {
                ...state,
                reports: state.reports.map(report => {
                    if (action.payload !== report.id)
                        return report;
                    report.is_accepted = true;
                    return report;
                })
            };
        default:
            return state;
    }
}