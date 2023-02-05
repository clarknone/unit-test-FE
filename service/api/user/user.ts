import { IApplicationForm } from "@/interface/application";
import { IUser } from "@/interface/user";
import { IApplication } from "@/interface/user/application";
import axios from "axios";

export async function getProfileAPI(): Promise<IUser> {
  return axios
    .get("/auth/profile")
    .then((resp) => {
      return resp.data;
    })
    .catch((e) => {
      throw new Error(e.response?.data?.message || "Failed to get user profile");
    });
}

export async function getApplicationAPI(): Promise<IApplication[]> {
  return axios
    .get("/auth/profile")
    .then((resp) => {
      return resp.data;
    })
    .catch((e) => {
      throw new Error(e.response?.data?.message || "Failed to get user profile");
    });
}

export async function createApplicationAPI(data: IApplicationForm) {
  return axios
    .post("/unit/wallet/application", data)
    .then((resp) => {
      return resp.data;
    })
    .catch((e) => {
      throw new Error(e.response?.data?.message || "Failed to get user profile");
    });
}
