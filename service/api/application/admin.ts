import { IApplication, IApplicationApproveDTO } from "@/interface/user/application";
import { IWalletFilter } from "@/interface/wallet";
import axios from "axios";

export async function getWallet() {
  return axios
    .get("/unit/admin/wallet")
    .then((resp) => {
      return resp.data;
    })
    .catch((e) => {
      throw new Error(e.response?.data?.message || "Failed to get all Wallet");
    });
}

export async function approveApplicationAPI(data: IApplicationApproveDTO): Promise<IApplication[]> {
  return axios
    .post("/unit/admin/application/approve", data)
    .then((resp) => {
      return resp.data;
    })
    .catch((e) => {
      throw new Error(e.response?.data?.message || "Failed to get user profile");
    });
}

export async function getApplicationAPI(filter: IWalletFilter): Promise<IApplication[]> {
  return axios
    .get("/unit/admin/application", { params: filter })
    .then((resp) => {
      return resp.data;
    })
    .catch((e) => {
      throw new Error(e.response?.data?.message || "Failed to get user profile");
    });
}
