import axios from "axios";
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';
import { GET_SUMMARY, CLEAR_SUMMARY } from "./types";

export const getSummary = (body) => (dispatch, getState) => {
    axios.post(`/api/users/${body.employeeID}/summaries/`, {
        "start_date": body.startDate,
        "end_date": body.endDate
    },
        tokenConfig(getState),
        { withCredentials: true })
        .then(res => {
            dispatch({
                type: GET_SUMMARY,
                payload: res.data,
            });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const clearSummary = (id) => (dispatch) => {
    dispatch({
        type: CLEAR_SUMMARY,
    });
};