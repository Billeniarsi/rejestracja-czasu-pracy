import axios from "axios";
import { returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_TASKS } from "./types";


// GET TASKS
export const getTasks = (projectID) => (dispatch, getState) => {
    axios
        .get(`/api/projects/${projectID}/tasks/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: GET_TASKS,
                payload: res.data,
            });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};