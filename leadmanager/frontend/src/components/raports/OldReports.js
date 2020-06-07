import React, { Component } from 'react'
import PropTypes, { string } from 'prop-types';
import { connect } from 'react-redux';
import { getReports, deleteReport, clearReports } from '../../actions/reports';
import { getProjects } from '../../actions/projects';

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
        this.props.getProjects();
        this.props.clearReports();
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

    deleteReport(id) {
        this.props.deleteReport(id);
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

    displayReports() {
        const { reports } = this.props;
        if (reports[0]) {
            return reports.map(report => (
                <tr key={report.id}>
                    <td>{report.project.name}</td>
                    <td>{report.task_name}</td>
                    <td>{this.displayTime(report.time)}</td>
                    <td>{this.displayTime(report.overtime)}</td>
                    {report.is_accepted ? <td>Zaakceptowany</td> : <td>Niezaakceptowany</td>}
                    {report.is_accepted ?
                        <td><button title="Nie można edytować zaakceptowanego raportu" className="btn btn-success disabled">Edytuj</button></td> :
                        <td><button className="btn btn-success">Edytuj</button></td>
                    }
                    {report.is_accepted ?
                        <td><button title="Nie można usunąć zaakceptowanego raportu" className="btn btn-danger disabled">Usuń</button></td> :
                        <td><button className="btn btn-danger" onClick={() => this.deleteReport(report.id)}>Usuń</button></td>
                    }
                </tr>
            ));
        }
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
                    <div className="text-center m-md-3">
                        Wybierz projekt z którego mają wyświetlić się raporty
                        {this.selectProject()}
                    </div>
                    <button type="submit" className="btn btn-success text-center" onClick={this.onSubmit}>Pokaż raporty</button>
                </form>
                {reports[0] ? <div className="card mb-4">
                    <div className="card-header">
                        {this.state.dateDisplay ? <p className="m-0">Raporty z dnia {this.state.dateDisplay}</p> : ""}
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
                                        <th>Status</th>
                                        <th>Edycja</th>
                                        <th>Usunięcie</th>
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
    projects: state.projects.projects
});

export default connect(mapStateToProps, { getReports, deleteReport, getProjects, clearReports })(OldReports);