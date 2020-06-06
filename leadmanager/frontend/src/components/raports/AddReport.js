import React, { Component } from 'react'
import PropTypes, { string } from 'prop-types';
import { connect } from 'react-redux';
import { getProjects } from '../../actions/projects';
import { getTasks } from '../../actions/tasks';
import { addReport } from '../../actions/reports';

export class AddReport extends Component {
    state = {
        todaysDate: "",
        selectedProject: 0,
        selectedTask: 0,
        minWorking: 0,
        hWorking: 0,
        minOvertime: 0,
        hOvertime: 0,
        regexp: /^[0-9\b]+$/
    }

    static propTypes = {
        getProjects: PropTypes.func.isRequired,
        getTasks: PropTypes.func.isRequired,
        addReport: PropTypes.func.isRequired,
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
        this.props.getTasks();
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

    selectProject() {
        const { projects } = this.props.projects;
        const { tasks } = this.props.tasks;
        if (projects[0]) {
            return (
                <div>
                    <div className="text-center m-md-4">
                        <p className="m-0">Wybierz projekt</p>
                        <select className="ml-2 w-50" value={this.state.value} onChange={this.selectProjectChange}>
                            <option key="0" value="0">Wybierz projekt</option>
                            {projects.map(project => (
                                <option key={project.id} value={project.id}>{project.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="text-center m-md-4">
                        <p className="m-0">Wybierz zadanie</p>
                        <select className="ml-2 w-50" value={this.state.value} onChange={this.selectTaskChange}>
                            <option key="0" value="0">Wybierz zadanie</option>
                            {tasks.map(task => {
                                if (task.project == this.state.selectedProject)
                                    return <option key={task.id} value={task.id}>{task.name}</option>
                            })}
                        </select>
                    </div>
                </div>
            )
        } else {
            return <div>Nie ma żadnych dostępnych projektów.</div>
        }
    }

    onTimeChange = e => {
        let time = e.target.value;
        if (time === '' || this.state.regexp.test(time))
            this.setState({ [e.target.name]: time })
    }
    onChange = e => this.setState({ [e.target.name]: e.target.value });
    selectProjectChange = e => this.setState({ selectedProject: e.target.value });
    selectTaskChange = e => this.setState({ selectedTask: e.target.value });

    time2min(h, min) {
        return parseInt(h) * 60 + parseInt(min);
    }

    onSubmit = e => {
        const { selectedProject, selectedTask, minWorking, hWorking, minOvertime, hOvertime, todaysDate } = this.state;
        e.preventDefault();
        if (minOvertime === 0 && hOvertime === 0 && minWorking === 0 && hWorking === 0) {
            alert("Musisz wpisać ilość przepracowanych godzin")
            return;
        }
        if (minOvertime % 5 !== 0 || minWorking % 5 !== 0) {
            alert("Minuty muszą być wielokrotnością liczby 5")
            return;
        }
        if (selectedProject == 0) {
            alert("Musisz wybrać projekt")
            return;
        }
        if (selectedTask == 0) {
            alert("Musisz wybrać zadanie")
            return;
        }
        const time = this.time2min(hWorking, minWorking);
        const overtime = this.time2min(hOvertime, minOvertime);
        const report = {
            task: selectedTask,
            date: todaysDate,
            time,
            overtime
        };
        this.props.addReport(report);
    };
    render() {
        return (
            <div>
                <div className="card mb-4">
                    <div className="card-header">Wyślij raport z dziś ({this.state.todaysDate})</div>
                    <div className="card-body">
                        <div className="table-responsive">
                            {this.selectProject()}
                            <div className="text-center m-md-5">
                                <p className="m-md-1">Wpisz ile czasu spędziłeś przy tym zadaniu</p>
                                <input type="number" style={{ width: "5%" }} name="hWorking" value={this.state.hWorking} onChange={this.onTimeChange} /> godzin i <input type="number" style={{ width: "5%" }} name="minWorking" value={this.state.minWorking} onChange={this.onTimeChange} /> minut
                            </div>
                            <div className="text-center m-md-5">
                                <p className="m-md-1">Wpisz ile <strong>nadgodzin</strong> spędziłeś przy tym zadaniu</p>
                                <input type="number" style={{ width: "5%" }} name="hOvertime" value={this.state.hOvertime} onChange={this.onTimeChange} /> godzin i <input type="number" style={{ width: "5%" }} name="minOvertime" value={this.state.minOvertime} onChange={this.onTimeChange} /> minut
                            </div>
                            <div className="text-center">
                                <button className="btn btn-success text-center" onClick={this.onSubmit}>Wyślij raport</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    projects: state.projects,
    tasks: state.tasks,
    reports: state.reports
});

export default connect(mapStateToProps, { getProjects, getTasks, addReport })(AddReport);