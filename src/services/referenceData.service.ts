import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ReferenceData} from '../model/model.referencedata';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Bearer {{token}}',
    'Accept': 'application/hal+json;profile=com.afklm.b2c.flightoffers.reference-data.v1;charset=utf8',
    'AFKL-TRAVEL-Host': 'AF',
    'AFKL-TRAVEL-Country': 'NL',
    'Accept-Language': 'en-US',
    'api-key': 'p4h6u3cxxresdvhj8qv6s658',
  })
};

@Injectable()
export class ReferenceDataService {
  private url = 'https://api.klm.com/opendata/flightoffers/reference-data';

  constructor(public http: HttpClient) {}

  getReferenceData() {
    return this.http.get<ReferenceData>(this.url, httpOptions);
  }
}
