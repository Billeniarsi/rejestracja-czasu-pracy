import React, { Component } from 'react'
import PropTypes, { string } from 'prop-types';
import { connect } from 'react-redux';
import { getReports } from '../../actions/reports';

export class TodaysReport extends Component {
    state = {
        todaysDate: ""
    }

    componentDidMount() {
        const date = new Date();
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        if (month < 10)
            month = `0${month}`;
        if (day < 10)
            day = `0${day}`;

        this.setState({ todaysDate: `${year}-${month}-${day}` });
        // this.props.getReports(`${year}-${month}-${day}`);
        this.props.getReports(`${year}-06-01`);
    }

    static propTypes = {
        getReports: PropTypes.func.isRequired
    }

    displayTime(time) {
        let min = time % 60;
        if (min < 10) {
            min = `0${min}`;
        } else if (min == 0) {
            min = "00";
        }
        const h = Math.floor(time / 60);
        return `${h}:${min}`;
    }

    projects() {
        const { summary } = this.props;
        return summary.details.projects.map(project => (
            <tr key={project.id}>
                <td>{project.name}</td>
                <td>{this.displayTime(project.time)}</td>
                <td>{this.displayTime(project.overtime)}</td>
            </tr>
        ));
    }

    selectProject() {
        const { summary } = this.props;
        return (
            <div className="m-md-3">
                Wybierz projekt
                <select className="ml-2" value={this.state.value} onChange={this.handleChange}>
                    <option value="Wszystkie">Wszystkie</option>
                    {summary.details.projects.map(project => (
                        <option key={project.id} value={project.name}>{project.name}</option>
                    ))}
                </select>
            </div>
        )
    }

    displayTasks() {
        const { summary } = this.props;
        return summary.details.projects.map(project => {
            if (project.name === this.state.value || this.state.value === "Wszystkie") {
                return project.tasks.map(task => (
                    <tr key={task.id}>
                        <td>{project.name}</td>
                        <td>{task.name}</td>
                        <td>{this.displayTime(task.time)}</td>
                        <td>{this.displayTime(task.overtime)}</td>
                    </tr>
                ))
            }
        });
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });
    handleChange = e => this.setState({ value: e.target.value });
    onSubmit = e => {
        e.preventDefault();
        const userID = this.props.auth.user.id;
        const { startDate, endDate } = this.state;
        const body = { startDate, endDate, userID };
        this.props.getSummary(body);
        this.setState({
            startDate: '',
            endDate: '',
        });
    };
    render() {
        const { summary } = this.props;
        return (
            <div>
                <div className="card mb-4">
                    <div className="card-header">Dzisiejsze raporty ({this.state.todaysDate})</div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                <thead>
                                    <tr>
                                        <th>Projekt</th>
                                        <th>Ilość godzin</th>
                                        <th>Ilość nadgodzin</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Cały dzień</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                <thead>
                                    <tr>
                                        <th>Projekt</th>
                                        <th>Zadanie</th>
                                        <th>Ilość godzin</th>
                                        <th>Ilość nadgodzin</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reports: state.reports.reports
});

export default connect(mapStateToProps, { getReports })(TodaysReport);