import { IAccount } from "../account";
import { IUser } from "../user";

export interface IWalletWithdraw {
  account: IAccount;
  amount: number;
  wallet?: IWallet;
  user: IUser;
  status: string;
  _id?: string;
}

export interface IWalletWithdrawForm {
  account: string;
  amount: number;
  wallet?: string;
}

export interface IWalletTransferForm {
  amount: number;
  user: string;
  sendWallet?: string;
}

export interface IWallet {
  _id?: string;
  currency: string;
  balance: number;
  //   eid: string;
  routingNumber: string;
  accountNumber: string;
  status: string;
}

export interface IWalletFilter {
  status: string;
}
export interface IWalletApproveDTO {
  wallet?: string;
  status: string;
}
