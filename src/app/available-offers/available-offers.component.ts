import {Component, OnInit} from '@angular/core';
import {AvailableOffersService} from '../../services/available-offers.service';
import {AvailableOffers} from '../../model/model.availableOffers';
import {PassengerCount} from '../../model/model.passengerCount';
import {RequestConnections} from '../../model/model.requestedConnections';
import {Airport} from '../../model/model.airport';
import {Origin} from '../../model/model.origin';
import {Destination} from '../../model/model.destination';
import {ReferenceDataService} from '../../services/referenceData.service';
import 'rxjs/add/operator/debounceTime';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-available-offers',
  templateUrl: './available-offers.component.html',
  styleUrls: ['./available-offers.component.css']
})
export class AvailableOffersComponent implements OnInit {
  offer: AvailableOffers = new AvailableOffers();
  origin: Origin = new Origin();
  destination: Destination = new Destination();
  passengerCount: PassengerCount = new PassengerCount();
  requestConnection: RequestConnections = new RequestConnections();
  requestConnections: RequestConnections[];

  originAeroport: string;
  destinationAeroport: string;
  dateDepart: string;

  myControlOrigin: FormControl = new FormControl();
  myControlDestination: FormControl = new FormControl();

  optionsOrigin = [];
  optionsDestination = [];

  filteredOptionsOrigin: Observable<string[]>;
  filteredOptionsDestination: Observable<string[]>;

  destinationStates: any[];
  originStates: any[];

  filteredOffers = [];

  // drop-down list of currencies
  devises = [
    {value: 'USD', viewValue: 'Etats-Unis Dollars - USD'},
    {value: 'EUR', viewValue: 'Euro - EUR'},
    {value: 'GBP', viewValue: 'Royaume-Uni Livres - GBP'},
    {value: 'CAD', viewValue: 'Canada Dollars - CAD'},
    {value: 'AUD', viewValue: 'Australie Dollars - AUD'},
    {value: 'JPY', viewValue: 'Japon Yen - JPY'},
    {value: 'INR', viewValue: 'Inde Roupie - INR'},
    {value: 'NZD', viewValue: 'Nouvelle-Zélande Dollars - NZD'},
    {value: 'CHF', viewValue: 'Suisse Francs - CHF'},
    {value: 'ZAR', viewValue: 'Afrique du Sud Rands - ZAR'}
  ];

  mode = 0;

  currentPage = 1;
  pages: Array<number>;

  constructor(public availableOffersService: AvailableOffersService, public referenceDataService: ReferenceDataService) {}

  ngOnInit() {
    this.fillDestinations();
    this.initOffer();
    this.initAutocompletes();
  }

  private initOffer(): void {
    this.origin.setAirport(new Airport());
    this.destination.setAirport(new Airport());
    this.requestConnection.origin =  this.origin;
    this.requestConnection.destination = this.destination;
  }

  private initAutocompletes(): void {
    this.filteredOptionsOrigin = this.myControlOrigin.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filterOptionOrigin(val))
      );

    this.filteredOptionsDestination = this.myControlDestination.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filterOptionDestination(val))
      );
  }

  public filterOptionOrigin(val: string): string[] {
    return this.optionsOrigin.filter(option => option.toLowerCase().indexOf(val.toLowerCase()) !== -1);
  }

  public filterOptionDestination(val: string): string[] {
    return this.optionsDestination.filter(option => option.toLowerCase().indexOf(val.toLowerCase()) !== -1);
  }

  /**
   * Filter all past dates.
   * @param {Date} d
   * @returns {boolean}
   */
  public filterDatePast = (d: Date): boolean => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);
    return currentDate < d;
  }

  /**
   * Send an offer
   * @param dataForm
   */
  public sendOffer(dataForm): void {
    this.offer.cabinClass =  dataForm.cabinClass;
    this.passengerCount.YOUNG_ADULT = dataForm.youngAdult;
    this.passengerCount.INFANT = dataForm.infant;
    this.passengerCount.CHILD = dataForm.child;
    this.passengerCount.ADULT = dataForm.adult;
    this.offer.setPassengerCount(this.passengerCount);
    this.offer.currency = dataForm.currency;
    this.originAeroport = dataForm.depart.trim();
    this.destinationAeroport = dataForm.destination.trim();
    this.dateDepart = dataForm.dateDepart;

    this.getAvailableOffers();
  }

  /**
   * Return all available offers
   */
  private getAvailableOffers() {
    // We inject all data
    this.requestConnections = new Array();
    this.requestConnections.push(this.requestConnection);
    this.offer.setRequestedConnections(this.requestConnections);

    this.origin.getAirport().setCode(
      this.originAeroport[this.getInitiales(this.originAeroport) + 1] +
      this.originAeroport[this.getInitiales(this.originAeroport) + 2] +
      this.originAeroport[this.getInitiales(this.originAeroport) + 3]
    );

    this.destination.getAirport().setCode(
      this.destinationAeroport[this.getInitiales(this.destinationAeroport) + 1] +
      this.destinationAeroport[this.getInitiales(this.destinationAeroport) + 2] +
      this.destinationAeroport[this.getInitiales(this.destinationAeroport) + 3]
    );

    const date = new Date(this.dateDepart);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate = year + '-' + ((month) < 10 ? '0'
      + (month) : (month))  +
      '-' + ((day) < 10 ? '0' + (day) : (day));

    this.requestConnection.departureDate = formattedDate;

    this.availableOffersService.getAvailableOffers(this.offer)
      .subscribe(data => {
        if (null === data) {
          this.mode = 2;
          this.resetData();
        } else {
          this.offer = data;
          this.callBackSuccess(this.offer);
          this.mode = 1;

          if (undefined !== this.offer && 1 === this.mode) {
            this.pages = Array(this.getNbPages(this.offer.flightProducts.length));
            this.gotoPage(this.currentPage);
          }

          this.resetData();
        }
      }, err => {
        alert('Aucun Vol n\'est disponible à cette date');
        console.log(JSON.parse(err.body).message);
      });
  }

  private callBackSuccess(data) {
    for (const flightProduct of data.flightProducts) {
      for (const connection of flightProduct.connections) {
        connection.duration = (Math.trunc((connection.duration / 60))) + 'h' +
          ((this.diviseMin(connection.duration) < 10) ? ('0' + this.diviseMin(connection.duration)) :
            this.diviseMin(connection.duration));
      }
    }
  }

  /**
   *  Permit to change of page.
   * @param {number} index
   */
  public gotoPage(index: number): void {
    this.filteredOffers = new Array();
    if (undefined !== this.offer) {
      for (let i = index - 1; i < this.offer.flightProducts.length; i++) {
        if ((Math.trunc(i / 6)) === index - 1) {
          this.filteredOffers.push(this.offer.flightProducts[i]);
        }
      }
      // We update current page
      this.currentPage = index - 1;
    }
  }

  private getNbPages(value): number {
    return Math.trunc(value / 6) + 1;
  }

  private diviseMin(num: number): number {
    let value = num;

    while (value >= 60) {
      value -= 60;
    }

    return value;
  }

  private getInitiales(val: string) {
    return (val.toLowerCase().indexOf('('));
  }

  private resetData(): void {
    this.offer.cabinClass = null;
    this.passengerCount.YOUNG_ADULT = null;
    this.passengerCount.INFANT = null;
    this.passengerCount.CHILD = null;
    this.passengerCount.ADULT = null;
    this.offer.currency = null;
    this.originAeroport = null;
    this.destinationAeroport = null;
    this.dateDepart = null;
  }

  /**
   * Fill all destinations in autocomplete
   */
  public fillDestinations(): void {
    this.referenceDataService.getReferenceData().subscribe(referenceData => {
      this.callBackDestinationsSuccess(referenceData);
    }, err => {
      console.log(JSON.parse(err.body).message);
    });
  }

  private callBackDestinationsSuccess(data) {
    for (const continent of data.continents) {
      for (const country of continent.countries) {
        if (undefined === country.cities) {
          continue;
        }
        for (const city of country.cities) {
          for (const airport of city.airports) {
            this.optionsOrigin.push(city.name + ', ' + airport.name + ' (' + airport.code + ')' + ' - ' + country.name);
            this.optionsDestination.push(city.name + ', ' + airport.name + ' (' + airport.code + ')' + ' - ' + country.name);
          }
        }
        if (undefined !== country.states) {
          for (const state of country.states) {
            for (const city of state.cities) {
              for (const airport of city.airports) {
                this.optionsOrigin.push(city.name + ', ' + airport.name + ' (' + airport.code + ')' + ' - ' + country.name);
                this.optionsDestination.push(city.name + ', ' + airport.name + ' (' + airport.code + ')' + ' - ' + country.name);
              }
            }
          }
        }
      }
    }
  }

}
