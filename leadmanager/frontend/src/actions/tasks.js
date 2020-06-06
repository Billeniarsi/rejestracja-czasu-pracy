import axios from "axios";
import { returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_TASKS } from "./types";


// GET TASKS
export const getTasks = () => (dispatch, getState) => {
    axios
        .get(`/api/projects/`, tokenConfig(getState))
        .then((res) => {
            res.data.forEach(project => {
                axios
                    .get(`/api/projects/${project.id}/tasks/`, tokenConfig(getState))
                    .then((res) => {
                        dispatch({
                            type: GET_TASKS,
                            payload: res.data,
                        });
                    })
                    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
            })
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};