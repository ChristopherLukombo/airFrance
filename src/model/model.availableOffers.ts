import {PassengerCount} from './model.passengerCount';
import {RequestConnections} from './model.requestedConnections';
import {FlightProducts} from './model.flightProducts';

export class AvailableOffers {
  cabinClass: string;
  discountCode = '';
  passengerCount: PassengerCount;
  currency: string;
  minimumAccuracy = '';
  requestedConnections: RequestConnections[];
  shortest = false;
  disclaimer = null;
  flightProducts = null;

  setPassengerCount(p: PassengerCount) {
    this.passengerCount = p;
  }

  setRequestedConnections(r: RequestConnections []) {
    this.requestedConnections = r;
  }

}


