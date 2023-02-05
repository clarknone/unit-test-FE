import axios from "axios";
import { IWalletApproveDTO, IWalletFilter, IWalletWithdraw } from "../../../interface/wallet";

export async function getAllWalletAPI() {
  return axios
    .get("/unit/admin/wallet")
    .then((resp) => {
      return resp.data;
    })
    .catch((e) => {
      throw new Error(e.response?.data?.message || "Failed to get all Wallet");
    });
}

export async function getAllTransferAPI() {
  return axios
    .get("/unit/admin/transfer")
    .then((resp) => {
      return resp.data;
    })
    .catch((e) => {
      throw new Error(e.response?.data?.message || "Failed to get all Wallet");
    });
}

export async function getAllWithdrawAPI(filter: IWalletFilter): Promise<IWalletWithdraw[]> {
  return axios
    .get("/unit/admin/withdraw", { params: filter })
    .then((resp) => {
      return resp.data;
    })
    .catch((e) => {
      throw new Error(e.response?.data?.message || "Failed to get all Wallet");
    });
}

export async function getUserWithdrawal(filter: IWalletFilter): Promise<IWalletWithdraw[]> {
  return axios
    .get("/unit/wallet/withdraw", { params: filter })
    .then((resp) => {
      return resp.data;
    })
    .catch((e) => {
      throw new Error(e.response?.data?.message || "Failed to get all Wallet");
    });
}

export async function approveWithdrawalAPI(data: IWalletApproveDTO) {
  return axios
    .post("/unit/admin/withdraw/approve", data)
    .then((resp) => {
      return resp.data;
    })
    .catch((e) => {
      throw new Error(e.response?.data?.message || "Failed to get all Wallet");
    });
}
