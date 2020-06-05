import React, { Fragment } from 'react'
import Summary from "./Summary";

export default function Dashboard() {
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
                            <div className="row">
                                <div className="col-xl-4 col-md-6">
                                    <div className="card bg-primary text-white mb-4">
                                        <div className="card-footer d-flex align-items-center justify-content-between">
                                            <a className="small text-white stretched-link" href="#">Podsumowanie okresu</a>
                                            <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-4 col-md-6">
                                    <div className="card bg-primary text-white mb-4">
                                        <div className="card-footer d-flex align-items-center justify-content-between">
                                            <a className="small text-white stretched-link" href="#">Dodaj zadanie</a>
                                            <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-4 col-md-6">
                                    <div className="card bg-primary text-white mb-4">
                                        <div className="card-footer d-flex align-items-center justify-content-between">
                                            <a className="small text-white stretched-link" href="#">Dzisiejszy raport</a>
                                            <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                        </div>
                                    </div>
                                </div>
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
