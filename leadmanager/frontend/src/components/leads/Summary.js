import React, { Component } from 'react'
import PropTypes, { string } from 'prop-types';
import { getSummary } from '../../actions/summary';
import { getUsers } from '../../actions/users';
import { connect } from 'react-redux';
import { getProjects } from '../../actions/projects';
import { getOverview } from '../../actions/overview';

export class Summary extends Component {
    state = {
        todaysDate: '',
        startDate: '',
        endDate: '',
        value: 'Wszystkie',
        employeeID: 0,
        projectID: 0,
        selectSummary: 'employee'
    }

    static propTypes = {
        getSummary: PropTypes.func.isRequired,
        getOverview: PropTypes.func.isRequired,
        getUsers: PropTypes.func.isRequired,
        getProjects: PropTypes.func.isRequired,
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

        this.setState({ todaysDate: `${year}-${month}-${day}`, employeeID: this.props.auth.user.id });
        this.props.getUsers();
        this.props.getProjects();
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

    employeersSelect() {
        const { users, auth } = this.props;
        if (users.users[0])
            return (
                <div className="m-md-3">
                    Wybierz pracownika
                    <select className="ml-2" name="employeeID" value={this.state.employeeID} onChange={this.onChange}>
                        <option value={auth.user.id}>Ja ({auth.user.first_name} {auth.user.last_name})</option>
                        {users.users.map(user => (
                            <option key={user.id} value={user.id}>{user.first_name} {user.last_name}</option>
                        ))}
                    </select>
                </div>
            )
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

    selectSummary() {
        return (
            <div className="m-md-3">
                Pokaż podsumowanie dla
                <select className="ml-2" name="selectSummary" onChange={this.onChange}>
                    <option value="employee">Pracownika</option>
                    <option value="project">Projektu</option>
                </select>
            </div>
        )
    }

    selectProject() {
        const { projects } = this.props;
        return (
            <div className="m-md-3">
                Wybierz projekt
                <select className="ml-2" value={this.state.projectID} name="projectID" onChange={this.onChange}>
                    <option key="0" value="0">Wybierz projekt</option>
                    {projects.map(project => (
                        <option key={project.id} value={project.id}>{project.name}</option>
                    ))}
                </select>
            </div>
        )
    }

    selectEmployee() {
        const { users, auth } = this.props;
        if (auth.user.is_staff)
            if (users.users[0])
                return (
                    <div className="m-md-3">
                        Wybierz pracownika
                        <select className="ml-2" name="employeeID" value={this.state.employeeID} onChange={this.onChange}>
                            <option value={auth.user.id}>Ja ({auth.user.first_name} {auth.user.last_name})</option>
                            {users.users.map(user => (
                                <option key={user.id} value={user.id}>{user.first_name} {user.last_name}</option>
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

    displayProjectTasks() {
        const { overview } = this.props;
        return overview.details.tasks.map(task => (
            <tr key={task.id}>
                <td>{task.name}</td>
                <td>{this.displayTime(task.time)}</td>
                <td>{this.displayTime(task.overtime)}</td>
            </tr>
        ));
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });
    handleChange = e => this.setState({ value: e.target.value });
    onSubmit = e => {
        e.preventDefault();
        const { startDate, endDate, employeeID, projectID } = this.state;
        const employee = { startDate, endDate, employeeID };
        const project = { startDate, endDate, projectID };
        if (this.state.selectSummary === "employee")
            this.props.getSummary(employee);
        else
            this.props.getOverview(project);
        this.setState({
            startDate: '',
            endDate: '',
        });
    };
    render() {
        const { summary, auth, overview } = this.props;
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="row align-content-center">
                        <div className="col-xl-3 mb-3 mr-4">
                            Data początku podsumowania
                            <input
                                placeholder="RRRR-MM-DD"
                                className="form-control"
                                type="date"
                                name="startDate"
                                onChange={this.onChange}
                                value={this.state.startDate}
                                max={this.state.todaysDate}
                            />
                        </div>
                        <div className="col-xl-3">
                            Data końca podsumowania
                            <input
                                placeholder="RRRR-MM-DD"
                                className="form-control"
                                type="date"
                                name="endDate"
                                onChange={this.onChange}
                                value={this.state.endDate}
                                max={this.state.todaysDate}
                            />
                        </div>
                    </div>
                    {auth.user.is_staff ? this.selectSummary() : ""}
                    {this.state.selectSummary === "employee" ? this.selectEmployee() : this.selectProject()}
                    <button
                        type="submit"
                        className="btn btn-success mb-3"
                    >
                        Pokaż podsumowanie
                    </button>
                </form>
                {summary.start_date &&
                    <div className="card mb-4">
                        <div className="card-header">Podsumowanie od dnia: {summary.start_date}, do dnia: {summary.end_date} <br /> Podsumowanie dla: <strong>{summary.employee.first_name} {summary.employee.last_name}</strong></div>
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
                                            <td>Wszystkie projekty</td>
                                            <td>{this.displayTime(summary.details.time)}</td>
                                            <td>{this.displayTime(summary.details.overtime)}</td>
                                        </tr>
                                        {this.projects()}
                                    </tbody>
                                </table>
                                {this.selectProject()}
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
                                        {this.displayTasks()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>}
                {overview.start_date &&
                    <div className="card mb-4">
                        <div className="card-header">Podsumowanie od dnia: {overview.start_date}, do dnia: {overview.end_date} <br /> Podsumowanie dla projektu: {overview.project_name}<strong></strong></div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                    <thead>
                                        <tr>
                                            <th>Ilość godzin poświęconych na projekt</th>
                                            <th>Ilość nadgodzin poświęconych na projekt</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{this.displayTime(overview.details.time)}</td>
                                            <td>{this.displayTime(overview.details.overtime)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                    <thead>
                                        <tr>
                                            <th>Zadanie</th>
                                            <th>Ilość godzin poświęconych na zadanie</th>
                                            <th>Ilość nadgodzin poświęconych na zadanie</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.displayProjectTasks()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    summary: state.summary.summary,
    overview: state.overview.overview,
    auth: state.auth,
    users: state.users,
    projects: state.projects.projects,
});

export default connect(mapStateToProps, { getSummary, getUsers, getProjects, getOverview })(Summary);