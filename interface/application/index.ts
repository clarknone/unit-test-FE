export interface IApplicationForm {
  passport: string;
  dateOfBirth: Date;
  address: { street: string; state: string; city: string; postalCode: string; country: string };
  [index: string]: any;
}
