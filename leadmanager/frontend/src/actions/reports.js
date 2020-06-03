import axios from "axios";
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_REPORTS } from "./types";

// GET REPORTS
export const getReports = () => (dispatch, getState) => {
    axios
        .get("/api/reports/", tokenConfig(getState))
        .then((res) => {
            console.log(res.data)
            dispatch({
                type: GET_REPORTS,
                payload: res.data,
            });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};