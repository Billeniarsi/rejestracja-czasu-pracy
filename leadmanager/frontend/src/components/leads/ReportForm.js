import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { getReports } from '../../actions/reports';
import { connect } from 'react-redux';

export class ReportForm extends Component {
    state = {
        startDate: '',
        endDate: '',
    }

    static propTypes = {
        getReports: PropTypes.func.isRequired
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });
    onSubmit = e => {
        e.preventDefault();
        const { startDate, endDate } = this.state;
        this.props.getReports(startDate, endDate);
        this.setState({
            startDate: '',
            endDate: '',
        });
    };
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="row align-content-center">
                        <div class="col-xl-2 mb-3 mr-4">
                            Data początku raportu
                            <input
                                placeholder="YYYY-MM-DD"
                                className="form-control"
                                type="text"
                                name="name"
                                onChange={this.onChange}
                                value={name}
                            />
                        </div>
                        <div class="col-xl-2">
                            Data końca raportu
                            <input
                                placeholder="YYYY-MM-DD"
                                className="form-control"
                                type="text"
                                name="name"
                                onChange={this.onChange}
                                value={name}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary mb-3"
                    >
                        Pokaż raport
                    </button>
                </form>
            </div>
        )
    }
}

export default connect(null, { getReports })(ReportForm);