import {Airport} from './model.airport';
export class Destination {
  airport: Airport;

  setAirport(a: Airport) {
    this.airport = a;
  }

  getAirport() {
    return this.airport;
  }
}
