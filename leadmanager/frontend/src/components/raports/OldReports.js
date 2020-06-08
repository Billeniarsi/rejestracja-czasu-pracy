import React, { Component } from 'react'
import PropTypes, { string } from 'prop-types';
import { connect } from 'react-redux';
import { getReports, deleteReport, clearReports, acceptReport } from '../../actions/reports';
import { getProjects } from '../../actions/projects';
import { getUsers } from '../../actions/users';

export class OldReports extends Component {
    state = {
        date: "",
        employeeID: "",
        selectedProject: "",
        selectedProjectID: "",
        todaysDate: "",
        submitForm: false,

        selectedProjectDisplay: "",
        employeeDisplay: "",
        dateDisplay: "",
    }

    static propTypes = {
        getProjects: PropTypes.func.isRequired,
        getReports: PropTypes.func.isRequired,
        deleteReport: PropTypes.func.isRequired,
        clearReports: PropTypes.func.isRequired,
        acceptReport: PropTypes.func.isRequired,
        getUsers: PropTypes.func.isRequired,
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
        this.props.getProjects();
        this.props.clearReports();
        this.props.getUsers();
    }

    displayTime(time) {
        let min = time % 60;
        const h = Math.floor(time / 60);
        return `${h} godzin ${min} minut`;
    }

    deleteReport(id) {
        this.props.deleteReport(id);
    }

    acceptReport(id) {
        this.props.acceptReport(id);
    }

    selectProject() {
        const { projects } = this.props;
        if (projects[0]) {
            return (
                <div>
                    <div className="text-center m-md-3">
                        <select className="ml-2 w-25" onChange={this.selectProjectChange}>
                            <option key="0" value="">Wszystkie projekty</option>
                            {projects.map(project => (
                                <option key={project.id} name={project.name} value={project.id}>{project.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )
        } else {
            return <div>Nie ma żadnych dostępnych projektów.</div>
        }
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

    displayReports() {
        const { reports, auth } = this.props;
        if (reports[0]) {
            return reports.map(report => (
                <tr key={report.id}>
                    <td>{report.project.name}</td>
                    <td>{report.task_name}</td>
                    <td>{this.displayTime(report.time)}</td>
                    <td>{this.displayTime(report.overtime)}</td>
                    <td>{report.date}</td>
                    {report.is_accepted ? <td>Zaakceptowany</td> : <td>Niezaakceptowany</td>}
                    {report.is_accepted ?
                        <td><button title="Nie można usunąć zaakceptowanego raportu" className="btn btn-danger disabled">Usuń</button></td> :
                        <td><button className="btn btn-danger" onClick={() => this.deleteReport(report.id)}>Usuń</button></td>
                    }
                    {this.acceptButton(report.is_accepted, report.employee, report.id)}
                </tr>
            ));
        }
    }

    acceptButton(accepted, employeeID, reportID) {
        const { auth } = this.props;
        if (auth.user.is_staff)
            if (accepted)
                return <td><button title="Nie można zaakceptować zaakceptowanego raportu" className="btn btn-success disabled">Zaakceptuj</button></td>
            else if (auth.user.id !== employeeID)
                return <td><button className="btn btn-success" onClick={() => this.acceptReport(reportID)}>Zaakceptuj</button></td>
            else
                return <td><button className="btn btn-success disabled" title="Nie można zaakceptować własnego raportu">Zaakceptuj</button></td>

    }

    emptyTable() {
        if (this.state.submitForm)
            return <div className="card-header">Brak raportów dla wprowadzonych danych</div>
        return <div className="card-header">Wprowadź dane</div>
    }

    selectProjectChange = e => { this.setState({ selectedProjectID: e.target.value, selectedProject: e.target.name }) };
    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = e => {
        const { date, employeeID, selectedProjectID } = this.state;
        e.preventDefault();
        this.setState({
            submitForm: true,
            selectedProjectDisplay: selectedProjectID,
            employeeDisplay: employeeID,
            dateDisplay: date,
        })
        this.props.getReports({ date: date, employee: employeeID, project: selectedProjectID }, true);
    };

    render() {
        const { reports } = this.props;
        return (
            <div>
                <form className="text-center m-md-3">
                    {this.selectEmployee()}
                    <div className="text-center m-md-3">
                        Wybierz projekt z którego mają wyświetlić się raporty
                        {this.selectProject()}
                    </div>
                    <div className="text-center m-md-3">
                        <p>Wybierz dzień z którego mają wyświetlić się raporty</p>
                        <input
                            type="date"
                            style={{ width: "15%" }}
                            name="date"
                            value={this.state.date}
                            onChange={this.onChange}
                            max={this.state.todaysDate}
                        />
                    </div>
                    <button type="submit" className="btn btn-success text-center" onClick={this.onSubmit}>Pokaż raporty</button>
                </form>
                {reports[0] ? <div className="card mb-4">
                    <div className="card-header">
                        {this.state.dateDisplay ? <p className="m-0">Raporty z dnia {this.state.dateDisplay}</p> : <p className="m-0">Raporty ze wszystkich dni</p>}
                        {this.state.selectedProjectDisplay ? <p className="m-0">Raporty z projektu o ID {this.state.selectedProjectDisplay}</p> : ""}
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                <thead>
                                    <tr>
                                        <th>Projekt</th>
                                        <th>Zadanie</th>
                                        <th>Ilość godzin</th>
                                        <th>Ilość nadgodzin</th>
                                        <th>Data raportu</th>
                                        <th>Status</th>
                                        <th>Usunięcie</th>
                                        {this.props.auth.user.is_staff ? <th>Akceptacja</th> : ""}
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.displayReports()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div> : this.emptyTable()}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reports: state.reports.reports,
    auth: state.auth,
    projects: state.projects.projects,
    users: state.users
});

export default connect(mapStateToProps, { getReports, deleteReport, getProjects, clearReports, getUsers, acceptReport })(OldReports);