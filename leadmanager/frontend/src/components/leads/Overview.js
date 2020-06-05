import React, { Component } from 'react'
import PropTypes, { string } from 'prop-types';
import { getOverview } from '../../actions/overview';
import { connect } from 'react-redux';

export class Overview extends Component {
    state = {
        startDate: '',
        endDate: '',
    }

    static propTypes = {
        getOverview: PropTypes.func.isRequired
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

    onChange = e => this.setState({ [e.target.name]: e.target.value });
    onSubmit = e => {
        e.preventDefault();
        const { startDate, endDate } = this.state;
        const date = { startDate, endDate };
        this.props.getOverview(date);
        this.setState({
            startDate: '',
            endDate: '',
        });
    };
    render() {
        const { overview } = this.props;
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="row align-content-center">
                        <div className="col-xl-2 mb-3 mr-4">
                            Data początku raportu
                            <input
                                placeholder="RRRR-MM-DD"
                                className="form-control"
                                type="text"
                                name="startDate"
                                onChange={this.onChange}
                                value={this.state.startDate}
                            />
                        </div>
                        <div className="col-xl-2">
                            Data końca raportu
                            <input
                                placeholder="RRRR-MM-DD"
                                className="form-control"
                                type="text"
                                name="endDate"
                                onChange={this.onChange}
                                value={this.state.endDate}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary mb-3"
                    >
                        Pokaż podsumowanie
                    </button>
                </form>
                {overview.start_date &&
                    <div className="card mb-4">
                        <div className="card-header">Podsumowanie od dnia: {overview.start_date}, do dnia: {overview.end_date} <br /> Podsumowanie dla: <strong>{overview.employee_username}</strong></div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
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
                                            <td>{this.displayTime(overview.time)}</td>
                                            <td>{this.displayTime(overview.overtime)}</td>
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
                                <p>Wybierz projekt    <select><option>Wszystkie</option></select></p>
                                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
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
                    </div>}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    overview: state.overview.overview
});

export default connect(mapStateToProps, { getOverview })(Overview);