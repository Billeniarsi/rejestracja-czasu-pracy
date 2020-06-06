import axios from "axios";
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_REPORTS, DELETE_REPORT } from "./types";

// GET REPORTS
export const getReports = (date) => (dispatch, getState) => {
    axios
        .get(`/api/reports/?date=${date}`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: GET_REPORTS,
                payload: res.data,
            });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// DELETE REPORT
export const deleteReport = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/reports/${id}/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: DELETE_REPORT,
                payload: id,
            });
            dispatch(createMessage({ deleteRaport: 'Usunięto raport' }));
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};