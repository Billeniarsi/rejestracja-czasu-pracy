import React, { Component } from 'react'
import PropTypes, { string } from 'prop-types';
import { connect } from 'react-redux';
import { getReports, deleteReport } from '../../actions/reports';

export class TodaysReport extends Component {
    state = {
        date: "",
        employeeID: "",
        project: "",
    }

    static propTypes = {
        getReports: PropTypes.func.isRequired,
        deleteReport: PropTypes.func.isRequired
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

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {
        const { reports } = this.props;
        return (
            <div>
                <div className="text-center m-md-5">
                    Wybierz dzień z którego mają wyświetlić się raporty <input type="date" style={{ width: "15%" }} name="date" value={this.state.date} onChange={this.onChange} /> godzin i <input type="number" style={{ width: "5%" }} name="minWorking" value={this.state.minWorking} onChange={this.onTimeChange} /> minut
                </div>
                <div className="card mb-4">
                    <div className="card-header">Raporty z dnia {this.state.date}</div>
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
                        </div> : <div>Nie ma z tego dnia żadnych raportów</div>}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reports: state.reports.reports
});

export default connect(mapStateToProps, { getReports, deleteReport })(TodaysReport);