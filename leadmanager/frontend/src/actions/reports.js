import axios from "axios";
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_REPORTS, DELETE_REPORT, ADD_REPORT, CLEAR_REPORTS } from "./types";

// GET REPORTS
export const getReports = (data, showMessage = false) => (dispatch, getState) => {
    let request = "?";
    if (data.date)
        request += `date=${data.date}&`
    if (data.employee)
        request += `employee=${data.employee}&`
    if (data.project)
        request += `project=${data.project}`

    if (request !== "?") {
        axios
            .get(`/api/reports/${request}`, tokenConfig(getState))
            .then((res) => {
                dispatch({
                    type: GET_REPORTS,
                    payload: res.data,
                });
                if (showMessage) dispatch(createMessage({ pullReports: 'Raporty zostały pobrane' }));
            })
            .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
    }
    else
        dispatch(createMessage({ enterData: 'Wprowadź dane' }));
};

// ADD REPORT
export const addReport = (report) => (dispatch, getState) => {
    axios
        .post("/api/reports/", report, tokenConfig(getState))
        .then((res) => {
            dispatch(createMessage({ addReport: 'Raport dodany' }));
            dispatch({
                type: ADD_REPORT,
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

// CLEAR REPORTS
export const clearReports = (id) => (dispatch, getState) => {
    dispatch({
        type: CLEAR_REPORTS,
    });
};