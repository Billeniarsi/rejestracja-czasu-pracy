import React, { Component } from 'react'
import PropTypes, { string } from 'prop-types';
import { connect } from 'react-redux';
import { getReports, deleteReport } from '../../actions/reports';

export class TodaysReport extends Component {
    state = {
        todaysDate: "",
        employeeID: 0
    }

    static propTypes = {
        getReports: PropTypes.func.isRequired,
        deleteReport: PropTypes.func.isRequired
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
        this.props.getReports({ date: `${year}-${month}-${day}`, employee: this.props.auth.user.id });
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

    displayTasks() {
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

    render() {
        const { reports } = this.props;
        return (
            <div>
                <div className="card mb-4">
                    <div className="card-header">Dzisiejsze raporty ({this.state.todaysDate})</div>
                    <div className="card-body">
                        {reports[0] ? <div className="table-responsive">
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
                                    {this.displayTasks()}
                                </tbody>
                            </table>
                        </div> : <div>Nie ma dzisiaj żadnych raportów</div>}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reports: state.reports.reports,
    auth: state.auth
});

export default connect(mapStateToProps, { getReports, deleteReport })(TodaysReport);