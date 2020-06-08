import { GET_PROJECTS, ADD_PROJECT, EDIT_PROJECT } from '../actions/types';

const initialState = {
    projects: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PROJECTS:
            return {
                ...state,
                projects: action.payload
            };
        case EDIT_PROJECT:
            return {
                ...state,
                projects: state.projects.map(project => {
                    if (action.payload.id !== project.id)
                        return project;
                    if (action.payload.name) project.name = action.payload.name;
                    if (action.payload.description) project.description = action.payload.description;
                    return project;
                })
            };
        default:
            return state;
    }
}