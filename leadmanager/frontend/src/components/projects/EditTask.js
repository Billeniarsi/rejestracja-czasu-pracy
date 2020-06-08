import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editTask, getTasks } from '../../actions/tasks';
import { getProjects } from '../../actions/projects';

export class EditTask extends Component {
    state = {
        taskName: '',
        selectedProjectID: '',
        taskID: ''
    }

    static propTypes = {
        editTask: PropTypes.func.isRequired,
        getTasks: PropTypes.func.isRequired,
        getProjects: PropTypes.func.isRequired,
    }

    selectProject() {
        const { projects } = this.props;
        if (projects[0]) {
            return (
                <div>
                    <div className="text-center m-md-3">
                        <select className="ml-2 w-25" onChange={this.selectProjectChange}>
                            <option key="0" value="">Wybierz projekt</option>
                            {projects.map(project => (
                                <option key={project.id} name={project.name} value={project.id}>{project.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )
        }
    }

    selectTask() {
        const { tasks } = this.props;
        if (tasks[0]) {
            return (
                <div>
                    <p className="m-md-1">Wybierz zadanie, które chcesz zmienić</p>
                    <div className="text-center m-md-3">
                        <select className="ml-2 w-25" onChange={this.selectTaskChange}>
                            <option key="0" value="">Wybierz zadanie</option>
                            {tasks.map(task => (
                                <option key={task.id} name={task.name} value={task.id}>{task.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )
        } else {
            return <div>Nie ma żadnych dostępnych projektów.</div>
        }
    }

    selectProjectChange = e => {
        this.setState({ selectedProjectID: e.target.value });
        this.props.getTasks(e.target.value);
    };
    selectTaskChange = e => { this.setState({ taskID: e.target.value }); };
    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = e => {
        const { taskName, selectedProjectID, taskID } = this.state;
        e.preventDefault();
        this.props.editTask({ name: taskName }, selectedProjectID, taskID);
        this.setState({
            taskName: '',
        })
    };

    render() {
        return (
            <div>
                <form className="text-center m-md-3">
                    <div className="text-center m-md-2">
                        <p className="m-md-1">Wybierz projekt do którego chcesz dodać zadanie</p>
                        {this.selectProject()}
                        {this.selectTask()}
                        <p className="m-md-1">Wpisz nową nazwę zadania</p>
                        <input
                            type="text"
                            name="taskName"
                            value={this.state.taskName}
                            onChange={this.onChange}
                        />
                    </div>
                    <input type="submit" className="btn btn-success text-center" onClick={this.onSubmit} value="Edytuj zadanie" />
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    projects: state.projects.projects,
    tasks: state.tasks.tasks
});

export default connect(mapStateToProps, { editTask, getProjects, getTasks })(EditTask);