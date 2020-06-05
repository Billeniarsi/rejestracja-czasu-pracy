import axios from "axios";
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';
import { GET_OVERVIEW } from "./types";

axios.defaults.withCredentials = true;

export const getOverview = (date) => (dispatch, getState) => {
    console.log(date.startDate);
    axios.post("/api/reports/overviews/", {
        "start_date": date.startDate,
        "end_date": date.endDate,
        "employee": "1"
    },
        tokenConfig(getState),
        { withCredentials: true })
        .then(res => {
            console.log(res)
            dispatch({
                type: GET_OVERVIEW,
                payload: res.data,
            });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
}