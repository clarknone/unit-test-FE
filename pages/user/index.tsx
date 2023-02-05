import StatsCard, { IStatsCardProps } from "@/component/stats/statsCard";
import WalletComponent from "@/component/wallet";
import CreateAccountModel from "@/component/wallet/createAccountModel ";
import NoWalletComponent from "@/component/wallet/noWallet";
import { useWalletFetch } from "@/hooks/wallet";
import UserLayout from "@/layout/userLayout";
import UserAccounts from "@/template/user/pendingAccount";
import UserPendingWithdrawals from "@/template/user/pendingWithdrawal";
import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { FaPlus, FaSadCry } from "react-icons/fa";

const data: IStatsCardProps[] = [{ title: "Total User", value: 20, Icon: FaSadCry }];

export default function UserHomePage() {
  const { wallet, loading } = useWalletFetch();
  const [accountModel, setAccountModel] = useState(false);

  return (
    <UserLayout>
      <Grid pr={"1em"} pl={{ xs: "1em", md: 0 }} container columnSpacing={"1em"} rowSpacing="1em">
      {/*   <Grid item xs={12}>
          <Stack direction={{ xs: "column", md: "row" }}>
            {data.map((item) => (
              <StatsCard {...item} />
            ))}
          </Stack>
        </Grid> */}

        <Grid item xs={12}>
          <Grid container justifyContent={"flex-end"}>
            <Grid item xs={12} sm={8}>
              {loading ? <> </> : wallet ? <WalletComponent {...wallet} /> : <NoWalletComponent />}
            </Grid>
          </Grid>
        </Grid>

        <Grid item  xs={12} sm={6}>
          <Typography> Pending Withdrawal </Typography>
          <UserPendingWithdrawals />
        </Grid>

        <Grid item  xs={12} sm={6}>
          <Stack direction={"row"} justifyContent="space-between">
            <Typography> All Accounts </Typography>
            <IconButton onClick={() => setAccountModel(true)}>
              <FaPlus />
            </IconButton>
          </Stack>
          <UserAccounts />
        </Grid>
      </Grid>
      <CreateAccountModel open={accountModel} close={() => setAccountModel(false)} />
    </UserLayout>
  );
}
