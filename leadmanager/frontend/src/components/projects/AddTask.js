import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTask } from '../../actions/tasks';
import { getProjects } from '../../actions/projects';

export class AddTask extends Component {
    state = {
        taskName: '',
        selectedProjectID: '',
    }

    static propTypes = {
        addTask: PropTypes.func.isRequired,
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
        } else {
            return <div>Nie ma żadnych dostępnych projektów.</div>
        }
    }

    selectProjectChange = e => { this.setState({ selectedProjectID: e.target.value }) };
    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = e => {
        const { taskName, selectedProjectID } = this.state;
        e.preventDefault();
        this.props.addTask({ name: taskName }, selectedProjectID);
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
                        <p className="m-md-1">Wybierz nazwę zadania</p>
                        <input
                            type="text"
                            name="taskName"
                            value={this.state.taskName}
                            onChange={this.onChange}
                        />
                    </div>
                    <input type="submit" className="btn btn-success text-center" onClick={this.onSubmit} value="Dodaj zadanie" />
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    projects: state.projects.projects,
});

export default connect(mapStateToProps, { addTask, getProjects })(AddTask);