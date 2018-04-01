import {City} from './model.city';
import {State} from './model.state';
export class Country {
  code: string;
  name: string;
  cities: City[];
  states: State[] = null;
}
