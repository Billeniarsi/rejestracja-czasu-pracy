import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editProject, getProjects } from '../../actions/projects';

export class EditProject extends Component {
    state = {
        selectedProjectID: 0,
        projectName: '',
        projectDescription: ''
    }

    static propTypes = {
        editProject: PropTypes.func.isRequired,
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
        const { projectName, projectDescription, selectedProjectID } = this.state;
        e.preventDefault();
        this.props.editProject({ name: projectName, description: projectDescription }, selectedProjectID);
        this.setState({
            projectName: '',
            projectDescription: '',
        })
    };

    render() {
        return (
            <div>
                <form className="text-center m-md-3">
                    <div className="text-center m-md-2">
                        <p className="m-md-1">Wybierz projekt</p>
                        {this.selectProject()}
                        <p className="m-md-1">Zmień nazwę projektu</p>
                        <input
                            type="text"
                            name="projectName"
                            value={this.state.projectName}
                            onChange={this.onChange}
                        />
                        <p className="m-md-1">Zmień opis projektu</p>
                        <input
                            className="w-50"
                            type="text"
                            name="projectDescription"
                            value={this.state.projectDescription}
                            onChange={this.onChange}
                        />
                    </div>
                    <input type="submit" className="btn btn-success text-center" onClick={this.onSubmit} value="Edytuj projekt" />
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    projects: state.projects.projects,
});

export default connect(mapStateToProps, { editProject, getProjects })(EditProject);