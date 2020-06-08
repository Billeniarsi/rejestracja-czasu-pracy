import axios from "axios";
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_PROJECTS, ADD_PROJECT, EDIT_PROJECT } from "./types";

// GET PROJECTS
export const getProjects = () => (dispatch, getState) => {
    axios
        .get(`/api/projects/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: GET_PROJECTS,
                payload: res.data,
            });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// ADD PROJECTS
export const addProject = (project) => (dispatch, getState) => {
    axios
        .post(`/api/projects/`, project, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: ADD_PROJECT,
                payload: res.data,
            });
            dispatch(createMessage({ addProject: 'Projekt został dodany' }));
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// EDIT PROJECTS
export const editProject = (project, id) => (dispatch, getState) => {
    axios
        .patch(`/api/projects/${id}/`, project, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: EDIT_PROJECT,
                payload: res.data,
            });
            dispatch(createMessage({ editProject: 'Projekt został edytowany' }));
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};