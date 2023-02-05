import { IApplicationForm } from "@/interface/application";
import { IApplicationApproveDTO } from "@/interface/user/application";
import { IWalletApproveDTO, IWalletFilter, IWalletTransferForm, IWalletWithdrawForm } from "@/interface/wallet";
import { approveApplicationAPI, getApplicationAPI } from "@/service/api/application/admin";
import { createApplicationAPI, getProfileAPI } from "@/service/api/user/user";
import {
  createWalletTransferAPI,
  createWalletWithdrawAPI,
  getWalletAPI,
  getWalletWithdrawAPI,
} from "@/service/api/wallet/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type ICallback<T = any> = (data?: any) => T;

export function useAdminApplicationFetch(filter: IWalletFilter) {
  const { data, isLoading, error } = useQuery(
    ["application"],
    () => {
      return getApplicationAPI(filter);
    },
    { refetchOnMount: false }
  );
  return { applications: data || [], loading: isLoading, error };
}

export function useApplicationApproveMutate(callback?: ICallback) {
  const queryClient = useQueryClient();
  const { isLoading, mutate, error, isSuccess, isError } = useMutation(
    (data: IApplicationApproveDTO) => {
      return approveApplicationAPI(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["application"]);
      },
      onSettled: () => {
        callback && callback();
      },
    }
  );

  return {
    approveMutate: mutate,
    loading: isLoading,
    success: isSuccess,
    error,
    isError,
  };
}
