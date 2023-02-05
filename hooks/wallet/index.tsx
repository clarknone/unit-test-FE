import { IWalletFilter, IWalletTransferForm, IWalletWithdrawForm } from "@/interface/wallet";
import {
  createWalletAPI,
  createWalletTransferAPI,
  createWalletWithdrawAPI,
  getWalletAPI,
  getWalletWithdrawAPI,
} from "@/service/api/wallet/user";
import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type ICallback<T = any> = (data?: any) => T;

export function useWalletFetch() {
  const { data, isLoading, error } = useQuery(
    ["wallets"],
    () => {
      return getWalletAPI();
    },
    { refetchOnMount: false }
  );
  return { wallet: data, loading: isLoading, error };
}

export function useWalletWithdrawFetch(filter: IWalletFilter) {
  const { data, isLoading, error } = useQuery(
    ["wallets"],
    () => {
      return getWalletWithdrawAPI();
    },
    { refetchOnMount: false }
  );
  return { withdrawals: data, loading: isLoading, error };
}

export function useWalletWithdrawMutate(callback?: ICallback) {
  const queryClient = useQueryClient();
  const { isLoading, mutate, error, isSuccess, isError } = useMutation(
    (data: IWalletWithdrawForm) => {
      return createWalletWithdrawAPI(data);
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
    walletWithdrawMutate: mutate,
    loading: isLoading,
    success: isSuccess,
    error,
    isError,
  };
}

export function useCreateWalletMutate(callback?: ICallback) {
  const queryClient = useQueryClient();
  const { isLoading, mutate, error, isSuccess, isError } = useMutation(createWalletAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries(["wallets"]);
    },
    onSettled: () => {
      callback && callback();
    },
  });

  return {
    createWalletMutate: mutate,
    loading: isLoading,
    success: isSuccess,
    error,
    isError,
  };
}

export function useWalletTransferMutate(callback?: ICallback) {
  const queryClient = useQueryClient();
  const { isLoading, mutate, error, isSuccess, isError } = useMutation(
    (data: IWalletTransferForm) => {
      return createWalletTransferAPI(data);
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
    walletTransferMutate: mutate,
    loading: isLoading,
    success: isSuccess,
    error,
    isError,
  };
}
