import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AvailableOffers} from '../model/model.availableOffers';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Bearer {{token}}',
    'Accept': 'application/hal+json;profile=com.afklm.b2c.flightoffers.available-offers.v1;charset=utf8',
    'AFKL-TRAVEL-Host': 'AF',
    'AFKL-TRAVEL-Country': 'NL',
    'Accept-Language': 'en-US',
    'api-key': 'p4h6u3cxxresdvhj8qv6s658',
  })
};

@Injectable()
export class AvailableOffersService {
  private url = 'https://api.klm.com/opendata/flightoffers/available-offers';


  constructor(public http: HttpClient) {}

  getAvailableOffers(availableOffers: AvailableOffers) {
    return this.http.post<AvailableOffers>(this.url, availableOffers, httpOptions);
  }

}
