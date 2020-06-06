import { combineReducers } from 'redux';
import leads from './leads';
import errors from './errors';
import messages from './messages';
import auth from './auth';
import reports from './reports';
import summary from './summary';
import projects from './projects';
import tasks from './tasks';

export default combineReducers({
    leads,
    errors,
    messages,
    auth,
    reports,
    summary,
    projects,
    tasks
});