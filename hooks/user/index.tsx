import { IApplicationForm } from "@/interface/application";
import { IWalletFilter, IWalletTransferForm, IWalletWithdrawForm } from "@/interface/wallet";
import { createApplicationAPI, getProfileAPI } from "@/service/api/user/user";
import {
  createWalletTransferAPI,
  createWalletWithdrawAPI,
  getWalletAPI,
  getWalletWithdrawAPI,
} from "@/service/api/wallet/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type ICallback<T = any> = (data?: any) => T;

export function useProfileFetch() {
  const { data, isLoading, error } = useQuery(["profile"], getProfileAPI);
  return { user: data, loading: isLoading, error };
}

export function useApplicationMutate(callback?: ICallback) {
  const queryClient = useQueryClient();
  const { isLoading, mutate, error, isSuccess, isError } = useMutation(
    (data: IApplicationForm) => {
      return createApplicationAPI(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["profile"]);
        callback && callback();
      },
    }
  );
  const e = error as Error;

  return {
    applicationMutate: mutate,
    loading: isLoading,
    success: isSuccess,
    error: { message: e?.message },
    isError,
  };
}
