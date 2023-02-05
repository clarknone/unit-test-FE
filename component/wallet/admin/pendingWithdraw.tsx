import LoadingButton from "@/component/general/loadingButton";
import { useApproveWalletWithdrawMutate } from "@/hooks/wallet/admin";
import { IWalletWithdraw } from "@/interface/wallet";
import { Card, CardActions, CardContent, Chip, Stack, Typography } from "@mui/material";

interface IPendingWithdrawalProps extends IWalletWithdraw {
  hideControl?: boolean;
}

export default function PendingWalletWithdraw({ hideControl = false, ...wallet }: IPendingWithdrawalProps) {
  const { approveWithdrawMutate, loading } = useApproveWalletWithdrawMutate();

  const updateStaus = (status: string) => {
    approveWithdrawMutate({ status: status, wallet: wallet._id });
  };

  return (
    <Card elevation={0}>
      <CardContent>
        <Stack direction={"row"} justifyContent="space-between">
          <Typography> {wallet.user.fullname} </Typography>
          <Chip color="primary" size="small" label={wallet.amount} />
        </Stack>
        <Stack fontSize={"0.7em"}>
          <Typography fontSize={"inherit"}> Bank: {wallet.account.bank} </Typography>
          <Typography fontSize={"inherit"}> Account Name:{wallet.account.accountName} </Typography>
          <Typography fontSize={"inherit"}> Account No: {wallet.account.accountNo}</Typography>
        </Stack>
      </CardContent>
      {hideControl ? (
        <></>
      ) : (
        <CardActions>
          <Stack direction={"row"} justifyContent="space-between">
            <LoadingButton loading={loading} onClick={() => updateStaus("paid")}>
              Accept
            </LoadingButton>
            <LoadingButton loading={loading} onClick={() => updateStaus("Cancled")}>
              Reject
            </LoadingButton>
          </Stack>
        </CardActions>
      )}
    </Card>
  );
}
