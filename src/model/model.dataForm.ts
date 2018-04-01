export class DataForm {
  private _cabinClass: string;
  private _YOUNG_ADULT: number;
  private _INFANT: number;
  private _CHILD: number;
  private _ADULT: number;
  private _currency: string;
  private _originAeroportName: string;
  private _destinationAeroportName: string;
  private _date: string;


  get cabinClass(): string {
    return this._cabinClass;
  }

  set cabinClass(value: string) {
    this._cabinClass = value;
  }

  get YOUNG_ADULT(): number {
    return this._YOUNG_ADULT;
  }

  set YOUNG_ADULT(value: number) {
    this._YOUNG_ADULT = value;
  }

  get INFANT(): number {
    return this._INFANT;
  }

  set INFANT(value: number) {
    this._INFANT = value;
  }

  get CHILD(): number {
    return this._CHILD;
  }

  set CHILD(value: number) {
    this._CHILD = value;
  }

  get ADULT(): number {
    return this._ADULT;
  }

  set ADULT(value: number) {
    this._ADULT = value;
  }

  get currency(): string {
    return this._currency;
  }

  set currency(value: string) {
    this._currency = value;
  }

  get originAeroportName(): string {
    return this._originAeroportName;
  }

  set originAeroportName(value: string) {
    this._originAeroportName = value;
  }

  get destinationAeroportName(): string {
    return this._destinationAeroportName;
  }

  set destinationAeroportName(value: string) {
    this._destinationAeroportName = value;
  }

  get date(): string {
    return this._date;
  }

  set date(value: string) {
    this._date = value;
  }

}
