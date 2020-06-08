import axios from "axios";
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_TASKS, EDIT_TASK } from "./types";


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


// ADD TASK
export const addTask = (task, projectID) => (dispatch, getState) => {
    axios
        .post(`/api/projects/${projectID}/tasks/`, task, tokenConfig(getState))
        .then((res) => {
            dispatch(createMessage({ addTask: 'Zadanie zostało dodane' }));
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// EDIT PROJECTS
export const editTask = (task, projectID, taskID) => (dispatch, getState) => {
    axios
        .patch(`/api/projects/${projectID}/tasks/${taskID}/`, task, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: EDIT_TASK,
                payload: res.data,
            });
            dispatch(createMessage({ editTask: 'Zadanie zostało edytowane' }));
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};