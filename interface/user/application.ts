import { IUser } from ".";

export interface IAddress {
  street: string;
  city: string;
  postalCode: number;
  state: string;
  country: string;
}

export interface IApplication {
  user: IUser;
  eid: string;
  _id?: string;
}

export interface IApplicationApproveDTO {
  application?: string;
  status: string;
}
