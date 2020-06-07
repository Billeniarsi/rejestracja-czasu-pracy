import React, { Fragment, Component } from 'react'
import Summary from "./Summary";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export class Dashboard extends Component {
    state = {
        employeeID: 0
    }

    componentDidMount() {
        this.setState({ employeeID: this.props.auth.user.id })
    }

    render() {
        return (
            <div>
                <div id="layoutSidenav">
                    <div id="layoutSidenav_content">
                        <main>
                            <div className="container-fluid">
                                <h1 className="mt-4">Podsumowanie okresu</h1>
                                <ol className="breadcrumb mb-4">
                                    <li className="breadcrumb-item active">Wybierz datę, aby podejrzeć podsumowanie z tego okresu.</li>
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

                                    {this.props.auth.user.is_staff ? <div className="col-xl-4 col-md-6">
                                        <div className="card bg-primary text-white mb-4">
                                            <div className="card-footer d-flex align-items-center justify-content-between">
                                                <Link to="/projects" className="small text-white stretched-link">Zarządzanie projektami</Link>
                                                <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                            </div>
                                        </div>
                                    </div> : ""}
                                </div>
                                <Summary />
                            </div>
                        </main>
                        <footer className="py-4 bg-light mt-auto">
                            <div className="container-fluid">
                                <div className="d-flex align-items-center justify-content-between small">
                                    <div className="text-muted">Copyright &copy; Osiedlowy monitoring 2020</div>
                                </div>
                            </div>
                        </footer>
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

export default connect(mapStateToProps)(Dashboard);