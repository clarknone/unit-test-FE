import { IAccount } from "@/interface/account";
import { createAccountAPI, getAllAccountAPI } from "@/service/api/account/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type ICallback<T = any> = (data?: any) => T;

export function useAccountFetch() {
  const { data, isLoading, error } = useQuery(["account"], getAllAccountAPI, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return { accounts: data || [], loading: isLoading, error };
}

export function useAccountMutate(callback?: ICallback) {
  const queryClient = useQueryClient();
  const { isLoading, mutate, error, isSuccess, isError } = useMutation(
    (data: IAccount) => {
      return createAccountAPI(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["account"]);
      },
      onSettled: () => {
        callback && callback();
      },
    }
  );

  return {
    accountMutate: mutate,
    loading: isLoading,
    success: isSuccess,
    error,
    isError,
  };
}
