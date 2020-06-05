import axios from "axios";
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';
import { GET_SUMMARY } from "./types";

axios.defaults.withCredentials = true;

export const getSummary = (body) => (dispatch, getState) => {
    axios.post(`/api/users/${body.userID}/summaries/`, {
        "start_date": body.startDate,
        "end_date": body.endDate
    },
        tokenConfig(getState),
        { withCredentials: true })
        .then(res => {
            console.log(res)
            dispatch({
                type: GET_SUMMARY,
                payload: res.data,
            });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
}