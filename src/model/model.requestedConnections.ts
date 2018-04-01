import {Origin} from './model.origin';
import {Destination} from './model.destination';

export class RequestConnections {
  public origin: Origin;
  public destination: Destination;
  public departureDate: string;
  public maxDaysOfStay = null;
  public minDaysOfStay = null;
  public dateInterval = null;
  public RequestConnections() {}

}
