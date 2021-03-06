import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './common/PrivateRoute';

import { Provider } from 'react-redux';
import store from '../store';

import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import Alerts from './layout/Alerts';

import Header from './layout/Header';

import Dashboard from './leads/Dashboard';
import Raports from './raports/Reports';
import Login from './accounts/Login';
import Register from './accounts/Register';
import { loadUser } from '../actions/auth';

import ManageProjects from './projects/ManageProjects';


// Alert Options
const alertOptions = {
    timeout: 3000,
    position: 'top center'
}

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser());
    }
    render() {
        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Router>
                        <Fragment>
                            <Header />
                            <Alerts />
                            <div className="container">
                                <Switch>
                                    <Route exact path="/">
                                        <Redirect to="/summaries" />
                                    </Route>
                                    <Route exact path="/register" component={Register}></Route>
                                    <Route exact path="/login" component={Login}></Route>
                                    <PrivateRoute exact path="/summaries" component={Dashboard}></PrivateRoute>
                                    <PrivateRoute exact path="/raports" component={Raports}></PrivateRoute>
                                    <PrivateRoute exact path="/projects" component={ManageProjects}></PrivateRoute>
                                </Switch>
                            </div>
                        </Fragment>
                    </Router>
                </AlertProvider>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));