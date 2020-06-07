import React, { Component, Fragment } from 'react'
import { withAlert } from 'react-alert'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import errors from '../../reducers/errors';


export class Alerts extends Component {
    static propTypes = {
        error: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired,
    }

    componentDidUpdate(prevProps) {
        const { error, alert, message } = this.props;
        if (error !== prevProps.error) {
            if (error.msg.username) alert.error(`Nazwa użytkownika: ${error.msg.username.join()}`);
            if (error.msg.password) alert.error(`Hasło: ${error.msg.password.join()}`);
            if (error.msg.non_field_errors) alert.error(error.msg.non_field_errors.join());
            if (error.msg.start_date) alert.error(error.msg.start_date.join());
            if (error.msg.end_date) alert.error(error.msg.end_date.join());
        }
        if (message !== prevProps.message) {
            if (message.deleteLead) alert.success(message.deleteLead);
            if (message.addLead) alert.success(message.addLead);
            if (message.addReport) alert.success(message.addReport);
            if (message.passwordNotMatch) alert.error(message.passwordNotMatch);
            if (message.incorrectTime) alert.error(message.incorrectTime);
            if (message.enterData) alert.error(message.enterData);
            if (message.deleteRaport) alert.success(message.deleteRaport);
            if (message.pullReports) alert.success(message.pullReports);
            if (message.acceptReport) alert.success(message.acceptReport);
        }
    }

    render() {
        return <Fragment />
    }
}

const mapStateToProps = state => ({
    error: state.errors,
    message: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts));
