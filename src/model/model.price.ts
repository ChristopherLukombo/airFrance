import {Connections} from './modelconnections';

export class Price {
  displayPrice: number;
  totalPrice: number;
  accuracy: number;
  flexibilityWaiver = false;
  currency: string;
  displayType: string;
  connections: Connections[];
}
