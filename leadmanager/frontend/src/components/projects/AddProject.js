import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addProject } from '../../actions/projects';

export class AddProject extends Component {
    state = {
        projectName: '',
        projectDescription: ''
    }

    static propTypes = {
        addProject: PropTypes.func.isRequired,
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = e => {
        const { projectName, projectDescription } = this.state;
        e.preventDefault();
        this.props.addProject({ name: projectName, description: projectDescription });
        this.setState({
            projectName: '',
            projectDescription: ''
        })
    };

    render() {
        return (
            <div>
                <form className="text-center m-md-3">
                    <div className="text-center m-md-2">
                        <p className="m-md-1">Wpisz nazwę nowego projektu</p>
                        <input
                            type="text"
                            required
                            name="projectName"
                            value={this.state.projectName}
                            onChange={this.onChange}
                        />
                        <p className="m-md-1">Wpisz opis nowego projektu</p>
                        <input
                            className="w-50"
                            type="text"
                            required
                            name="projectDescription"
                            value={this.state.projectDescription}
                            onChange={this.onChange}
                        />
                    </div>
                    <input type="submit" className="btn btn-success text-center" onClick={this.onSubmit} value="Dodaj projekt" />
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, { addProject })(AddProject);