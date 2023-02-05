import PendingWalletWithdraw from "@/component/wallet/admin/pendingWithdraw";
import { useWalletWithdrawFetch } from "@/hooks/wallet/admin";
import { Box, CircularProgress, Typography } from "@mui/material";

export default function UserPendingWithdrawals() {
  const { wallets, loading } = useWalletWithdrawFetch({ status: "Sent" });
  return (
    <Box>
      {loading ? (
        <CircularProgress variant="indeterminate" />
      ) : wallets.length >= 1 ? (
        <>
          {wallets.map((item) => (
            <PendingWalletWithdraw hideControl key={item._id} {...item} />
          ))}
        </>
      ) : (
        <Typography textAlign={"center"} fontSize={"0.8em"} my={"2em"}>
          No Data
        </Typography>
      )}
    </Box>
  );
}
