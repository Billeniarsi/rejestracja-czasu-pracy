import { GET_TASKS, EDIT_TASK } from '../actions/types';

const initialState = {
    tasks: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_TASKS:
            return {
                ...state,
                tasks: action.payload
            };
        case EDIT_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task => {
                    if (action.payload.id !== task.id)
                        return task;
                    if (action.payload.name) task.name = action.payload.name;
                    return task;
                })
            };
        default:
            return state;
    }
}