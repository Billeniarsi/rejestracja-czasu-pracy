import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import AddProject from './AddProject';
import AddTask from './AddTask';
import EditProject from './EditProject'
import EditTask from './EditTask'


export class ManageProjects extends Component {
    state = {
        activePage: '',
    }

    displayManageProjects() {
        const { auth } = this.props;
        if (auth.user)
            if (auth.user.is_staff)
                return (
                    <div className="col-xl-4 col-md-6">
                        <div className="card bg-primary text-white mb-4">
                            <div className="card-footer d-flex align-items-center justify-content-between">
                                <Link to="/projects" className="small text-white stretched-link">Zarządzanie projektami</Link>
                                <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                            </div>
                        </div>
                    </div>
                )
    }

    displaySection() {
        const { activePage } = this.state;
        switch (activePage) {
            case "add-project":
                return <AddProject />
            case "add-task":
                return <AddTask />
            case "edit-project":
                return <EditProject />
            case "edit-task":
                return <EditTask />
        }
    }

    render() {
        const { summary, auth, overview } = this.props;
        if (!auth.user.is_staff)
            return <Redirect to="/summaries" />;
        return (
            <div>
                <div id="layoutSidenav">
                    <div id="layoutSidenav_content">
                        <main>
                            <div className="container-fluid">
                                <h1 className="mt-4">Projekty</h1>
                                <ol className="breadcrumb mb-4">
                                    <li className="breadcrumb-item active">Dodawaj oraz edytuj projekty i zadania.</li>
                                </ol>

                                <div className="row justify-content-around">
                                    <div className="col-xl-4 col-md-6">
                                        <div className="card bg-primary text-white mb-4">
                                            <div className="card-footer d-flex align-items-center justify-content-between">
                                                <Link className="small text-white stretched-link" to="/summaries">Podsumowanie okresu</Link>
                                                <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-4 col-md-6">
                                        <div className="card bg-primary text-white mb-4">
                                            <div className="card-footer d-flex align-items-center justify-content-between">
                                                <Link to="/raports" className="small text-white stretched-link">Raporty</Link>
                                                <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                    {this.displayManageProjects()}
                                </div>

                                <div className="row justify-content-center mt-4">

                                    <div className="col-xl-3 col-md-6">
                                        <button className="card bg-info mb-4 w-100">
                                            <div className="card-footer d-flex align-items-center justify-content-center btn text-white w-100" onClick={() => this.setState({ activePage: 'add-project' })}>
                                                Dodaj projekt
                                            </div>
                                        </button>
                                    </div>

                                    <div className="col-xl-3 col-md-6">
                                        <button className="card bg-info mb-4 w-100">
                                            <div className="card-footer d-flex align-items-center justify-content-center btn text-white w-100" onClick={() => this.setState({ activePage: 'edit-project' })}>
                                                Edytuj projekt
                                            </div>
                                        </button>
                                    </div>

                                    <div className="col-xl-3 col-md-6">
                                        <button className="card bg-info mb-4 w-100">
                                            <div className="card-footer d-flex align-items-center justify-content-center btn text-white w-100" onClick={() => this.setState({ activePage: 'add-task' })}>
                                                Dodaj zadanie
                                            </div>
                                        </button>
                                    </div>

                                    <div className="col-xl-3 col-md-6">
                                        <button className="card bg-info mb-4 w-100">
                                            <div className="card-footer d-flex align-items-center justify-content-center btn text-white w-100" onClick={() => this.setState({ activePage: 'edit-task' })}>
                                                Edytuj zadanie
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <section>
                                {this.displaySection()}
                            </section>
                        </main>
                    </div>
                </div>
                <script src="https://code.jquery.com/jquery-3.4.1.min.js" crossOrigin="anonymous"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js" crossOrigin="anonymous"></script>
                <script src="js/scripts.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js" crossOrigin="anonymous"></script>
                <script src="assets/demo/chart-area-demo.js"></script>
                <script src="assets/demo/chart-bar-demo.js"></script>
                <script src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js" crossOrigin="anonymous"></script>
                <script src="https://cdn.datatables.net/1.10.20/js/dataTables.bootstrap4.min.js" crossOrigin="anonymous"></script>
                <script src="assets/demo/datatables-demo.js"></script>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(ManageProjects);