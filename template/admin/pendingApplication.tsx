import PendingApplicationComponent from "@/component/application/admin/pendingApplication";
import { useAdminApplicationFetch } from "@/hooks/user/admin";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";

export default function PendingApplications() {
  const { applications, loading } = useAdminApplicationFetch({ status: "pending" });
  return (
    <Box>
      {loading ? (
        <CircularProgress variant="indeterminate" />
      ) : applications.length >= 1 ? (
        <Stack rowGap={"0.5em"}>
          {applications.map((item) => (
            <PendingApplicationComponent key={item._id} {...item} />
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
