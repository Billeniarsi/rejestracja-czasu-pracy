import axios from "axios";
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';
import { GET_OVERVIEW, CLEAR_OVERVIEW } from "./types";

export const getOverview = (body) => (dispatch, getState) => {
    axios.post(`/api/projects/${body.projectID}/overviews/`, {
        "start_date": body.startDate,
        "end_date": body.endDate
    },
        tokenConfig(getState),
        { withCredentials: true })
        .then(res => {
            dispatch({
                type: GET_OVERVIEW,
                payload: res.data,
            });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const clearOverview = (id) => (dispatch) => {
    dispatch({
        type: CLEAR_OVERVIEW,
    });
};