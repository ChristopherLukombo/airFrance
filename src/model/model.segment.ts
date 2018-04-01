import {MarketingFlight} from './model.marketingFlight';

export class Segment {
  arrivalDateTime: Date;
  departureDateTime: Date;
  destination = null;
  marketingFlight: MarketingFlight;
}
