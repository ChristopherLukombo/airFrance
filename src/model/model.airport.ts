
export class Airport {
  code: string;
  name = null;

  setCode(code: string) {
    this.code = code;
  }

  getCode() {
    return this.code;
  }
}
