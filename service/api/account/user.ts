import { IAccount } from "@/interface/account";
import axios from "axios";

export async function getAllAccountAPI(): Promise<IAccount[]> {
  return axios
    .get("/unit/wallet/account")
    .then((resp) => {
      return resp.data;
    })
    .catch((e) => {
      throw new Error(e.response?.data?.message || "Failed to get all account");
    });
}

export async function createAccountAPI(data: IAccount) {
  return axios
    .post("/unit/wallet/account", data)
    .then((resp) => {
      return resp.data;
    })
    .catch((e) => {
      throw new Error(e.response?.data?.message || "Failed to get create account");
    });
}
