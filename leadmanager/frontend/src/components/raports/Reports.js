import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import TodaysRaport from './TodaysReport';
import AddReport from './AddReport';
import OldReports from './OldReports';

export class Reports extends Component {
    state = {
        activePage: "",
    }

    displaySection() {
        const { activePage } = this.state;
        switch (activePage) {
            case "add-report":
                return <AddReport />
            case "todays-report":
                return <TodaysRaport />
            case "old-reports":
                return <OldReports />
        }
    }

    render() {
        return (
            <div>
                <div id="layoutSidenav">
                    <div id="layoutSidenav_content">
                        <main>
                            <div className="container-fluid">
                                <h1 className="mt-4">Raporty</h1>
                                <ol className="breadcrumb mb-4">
                                    <li className="breadcrumb-item active">Wyślij raport lub wyszukaj stare raporty i edytuj je.</li>
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
                                </div>
                            </div>
                            <div className="row justify-content-center mt-4">

                                <div className="col-xl-3 col-md-6">
                                    <button className="card bg-info mb-4 w-100">
                                        <div className="card-footer d-flex align-items-center justify-content-center btn text-white w-100" onClick={() => this.setState({ activePage: 'add-report' })}>
                                            Wyślij raport
                                        </div>
                                    </button>
                                </div>

                                <div className="col-xl-3 col-md-6">
                                    <button className="card bg-info mb-4 w-100">
                                        <div className="card-footer d-flex align-items-center justify-content-center btn text-white w-100" onClick={() => this.setState({ activePage: 'todays-report' })}>
                                            Dzisiejsze raporty
                                        </div>
                                    </button>
                                </div>

                                <div className="col-xl-3 col-md-6">
                                    <button className="card bg-info mb-4 pointer w-100">
                                        <div className="card-footer d-flex align-items-center justify-content-center btn text-white w-100" onClick={() => this.setState({ activePage: 'old-reports' })}>
                                            Stare raporty
                                        </div>
                                    </button>
                                </div>
                            </div>
                            <section>
                                {this.displaySection()}
                            </section>
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
});

export default connect(mapStateToProps)(Reports);