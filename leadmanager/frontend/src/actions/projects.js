import axios from "axios";
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_PROJECTS } from "./types";

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