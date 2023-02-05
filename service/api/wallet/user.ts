import axios from "axios";
import {
  IWallet,
  IWalletTransferForm,
  IWalletWithdraw,
  IWalletWithdrawForm,
} from "../../../interface/wallet";

export async function getWalletAPI(): Promise<IWallet> {
  return axios
    .get("/unit/wallet")
    .then((resp) => {
      return resp.data;
    })
    .catch((e) => {
      throw new Error(e.response?.data?.message || "Failed to get Wallet");
    });
}

export async function getWalletWithdrawAPI(): Promise<IWalletWithdraw> {
  return axios
    .get("/unit/wallet/withdraw")
    .then((resp) => {
      return resp.data;
    })
    .catch((e) => {
      throw new Error(e.response?.data?.message || "Failed to get Wallet");
    });
}

export async function createWalletAPI() {
  return axios
    .post("/unit/wallet", {})
    .then((resp) => {
      return resp.data;
    })
    .catch((e) => {
      throw new Error(e.response?.data?.message || "Failed to get Wallet");
    });
}

export async function createWalletTransferAPI(data: IWalletTransferForm) {
  return axios
    .post("/unit/wallet/transfer", data)
    .then((resp) => {
      return resp.data;
    })
    .catch((e) => {
      throw new Error(e.response?.data?.message || "Failed to get Wallet");
    });
}

export async function createWalletWithdrawAPI(data: IWalletWithdrawForm) {
  return axios
    .post("/unit/wallet/withdraw", data)
    .then((resp) => {
      return resp.data;
    })
    .catch((e) => {
      throw new Error(e.response?.data?.message || "Failed to get Wallet");
    });
}
