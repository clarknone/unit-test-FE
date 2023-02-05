import StatsCard, { IStatsCardProps } from "@/component/stats/statsCard";
import AdminLayout from "@/layout/adminLayout";
import PendingApplications from "@/template/admin/pendingApplication";
import PendingWithdrawals from "@/template/admin/pendingWithdrawal";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { FaSadCry } from "react-icons/fa";

const data: IStatsCardProps[] = [{ title: "Total User", value: 20, Icon: FaSadCry }];

export default function AdminHomePage() {
  return (
    <AdminLayout>
      <Grid pr={"1em"} pl={{ xs: "1em", md: 0 }} container columnSpacing={"1em"} rowSpacing="1em">
        {/* <Grid item xs={12}>
          <Stack direction={{ xs: "column", md: "row" }}>
            {data.map((item) => (
              <StatsCard {...item} />
            ))}
          </Stack>
        </Grid> */}

        <Grid item xs={12} sm={6}>
          <Typography> Pending Applications </Typography>
          <PendingApplications />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography> Pending Withdrawal </Typography>
          <PendingWithdrawals />
        </Grid>
      </Grid>
    </AdminLayout>
  );
}
