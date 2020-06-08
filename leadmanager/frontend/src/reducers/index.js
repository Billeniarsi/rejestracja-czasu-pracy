import { combineReducers } from 'redux';
import errors from './errors';
import messages from './messages';
import auth from './auth';
import reports from './reports';
import summary from './summary';
import projects from './projects';
import tasks from './tasks';
import users from './users';
import overview from './overview';

export default combineReducers({
    errors,
    messages,
    auth,
    reports,
    summary,
    projects,
    tasks,
    users,
    overview
});