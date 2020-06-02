import React, { Fragment } from 'react'

export default function Dashboard() {
    return (
        <div>
            <div id="layoutSidenav">
                <div id="layoutSidenav_content">
                    <main>
                        <div class="container-fluid">
                            <h1 class="mt-4">Podsumowanie okresu</h1>
                            <ol class="breadcrumb mb-4">
                                <li class="breadcrumb-item active">Wybierz dane aby podejrzeć podsumowanie z danego okresu.</li>
                            </ol>
                            <div class="row">
                                <div class="col-xl-4 col-md-6">
                                    <div class="card bg-primary text-white mb-4">
                                        <div class="card-footer d-flex align-items-center justify-content-between">
                                            <a class="small text-white stretched-link" href="#">Wyświetl podsumowanie</a>
                                            <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-xl-4 col-md-6">
                                    <div class="card bg-primary text-white mb-4">
                                        <div class="card-footer d-flex align-items-center justify-content-between">
                                            <a class="small text-white stretched-link" href="#">Dodaj zadanie</a>
                                            <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-xl-4 col-md-6">
                                    <div class="card bg-primary text-white mb-4">
                                        <div class="card-footer d-flex align-items-center justify-content-between">
                                            <a class="small text-white stretched-link" href="#">Dzisiejszy raport</a>
                                            <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p>Data początku okresu <input data-role="datepicker"></input></p>
                            <p>Data końca okresu    <input data-role="datepicker"></input></p>
                            <p>Wybierz projekt    <select data-role="datepicker"><option>Wszystkie</option></select></p>
                            <p><button>Pokaż raport</button></p>
                            <div class="card mb-4">
                                <div class="card-header"><i class="fas fa-table mr-1"></i>Raport od dnia: 28.05.2020, do dnia: 28.05.2020</div>
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                            <thead>
                                                <tr>
                                                    <th>Projekt</th>
                                                    <th>Ilość godzin</th>
                                                    <th>Ilość nadgodzin</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Wszystkie</td>
                                                    <td>8:00</td>
                                                    <td>0:15</td>
                                                </tr>
                                                <tr>
                                                    <td>Borrow.me</td>
                                                    <td>4:30</td>
                                                    <td>0:15</td>
                                                </tr>
                                                <tr>
                                                    <td>Osiedlowy monitoring</td>
                                                    <td>3:30</td>
                                                    <td>0:00</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                            <thead>
                                                <tr>
                                                    <th>Projekt</th>
                                                    <th>Zadanie</th>
                                                    <th>Ilość godzin</th>
                                                    <th>Ilość nadgodzin</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Borrow.me</td>
                                                    <td>Strona główna</td>
                                                    <td>2:15</td>
                                                    <td>0:00</td>
                                                </tr>
                                                <tr>
                                                    <td>Borrow.me</td>
                                                    <td>Strona logowania</td>
                                                    <td>1:15</td>
                                                    <td>0:15</td>
                                                </tr>
                                                <tr>
                                                    <td>Osiedlowy monitoring</td>
                                                    <td>Mocup strony głównej</td>
                                                    <td>2:15</td>
                                                    <td>0:00</td>
                                                </tr>
                                                <tr>
                                                    <td>Osiedlowy monitoring</td>
                                                    <td>Mocup strony logowania</td>
                                                    <td>2:15</td>
                                                    <td>0:00</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                    <footer class="py-4 bg-light mt-auto">
                        <div class="container-fluid">
                            <div class="d-flex align-items-center justify-content-between small">
                                <div class="text-muted">Copyright &copy; Osiedlowy monitoring 2020</div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
            <script src="https://code.jquery.com/jquery-3.4.1.min.js" crossorigin="anonymous"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
            <script src="js/scripts.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js" crossorigin="anonymous"></script>
            <script src="assets/demo/chart-area-demo.js"></script>
            <script src="assets/demo/chart-bar-demo.js"></script>
            <script src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js" crossorigin="anonymous"></script>
            <script src="https://cdn.datatables.net/1.10.20/js/dataTables.bootstrap4.min.js" crossorigin="anonymous"></script>
            <script src="assets/demo/datatables-demo.js"></script>
        </div>
    )
}
