import PendingWalletWithdraw from "@/component/wallet/admin/pendingWithdraw";
import { useWalletWithdrawFetch } from "@/hooks/wallet/admin";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";

export default function PendingWithdrawals() {
  const { wallets, loading } = useWalletWithdrawFetch({ status: "Sent" });
  return (
    <Box>
      {loading ? (
        <CircularProgress variant="indeterminate" />
      ) : wallets.length >= 1 ? (
        <Stack rowGap={"0.5em"}>
          {wallets.map((item) => (
            <PendingWalletWithdraw key={item._id} {...item} />
          ))}
        </Stack>
      ) : (
        <Typography textAlign={"center"} fontSize={"0.8em"} my={"2em"}>
          No Data
        </Typography>
      )}
    </Box>
  );
}
