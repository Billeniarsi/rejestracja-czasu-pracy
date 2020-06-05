import React, { Component } from 'react'
import PropTypes, { string } from 'prop-types';
import { getSummary } from '../../actions/summary';
import { connect } from 'react-redux';

export class Summary extends Component {
    state = {
        startDate: '',
        endDate: '',
        value: 'Wszystkie'
    }

    static propTypes = {
        getSummary: PropTypes.func.isRequired
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
                <form onSubmit={this.onSubmit}>
                    <div className="row align-content-center">
                        <div className="col-xl-3 mb-3 mr-4">
                            Data początku podsumowania
                            <input
                                placeholder="RRRR-MM-DD"
                                className="form-control"
                                type="text"
                                name="startDate"
                                onChange={this.onChange}
                                value={this.state.startDate}
                            />
                        </div>
                        <div className="col-xl-3">
                            Data końca podsumowania
                            <input
                                placeholder="RRRR-MM-DD"
                                className="form-control"
                                type="text"
                                name="endDate"
                                onChange={this.onChange}
                                value={this.state.endDate}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary mb-3"
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
            </div>
        )
    }
}

const mapStateToProps = state => ({
    summary: state.summary.summary,
    auth: state.auth
});

export default connect(mapStateToProps, { getSummary })(Summary);