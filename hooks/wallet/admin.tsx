import { IWalletApproveDTO, IWalletFilter } from "@/interface/wallet";
import {
  approveWithdrawalAPI,
  getAllTransferAPI,
  getAllWalletAPI,
  getAllWithdrawAPI,
} from "@/service/api/wallet/admin";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type ICallback<T = any> = (data?: any) => T;

export function useWalletFetch(filter: IWalletFilter) {
  const { data, isLoading, error } = useQuery(
    ["wallets", filter],
    () => {
      return getAllWalletAPI();
    },
    { refetchOnMount: false }
  );
  return { wallet: data || [], loading: isLoading, error };
}

export function useWalletTransferFetch(filter: IWalletFilter) {
  const { data, isLoading, error } = useQuery(
    ["wallets", filter],
    () => {
      return getAllTransferAPI();
    },
    { refetchOnMount: false }
  );
  return { wallets: data || [], loading: isLoading, error };
}

export function useWalletWithdrawFetch(filter: IWalletFilter) {
  const { data, isLoading, error } = useQuery(
    ["wallets", filter],
    () => {
      return getAllWithdrawAPI(filter);
    },
    { refetchOnMount: false }
  );
  return { wallets: data || [], loading: isLoading, error };
}

export function useApproveWalletWithdrawMutate(callback?: ICallback) {
  const queryClient = useQueryClient();
  const { isLoading, mutate, error, isSuccess, isError } = useMutation(
    (data: IWalletApproveDTO) => {
      return approveWithdrawalAPI(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["wallets"]);
      },
      onSettled: () => {
        callback && callback();
      },
    }
  );

  return {
    approveWithdrawMutate: mutate,
    loading: isLoading,
    success: isSuccess,
    error,
    isError,
  };
}
