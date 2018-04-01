import {Airport} from './model.airport';
export class Origin {
  airport: Airport;

  setAirport(a: Airport) {
    this.airport = a;
  }

  getAirport() {
    return this.airport;
  }
}
