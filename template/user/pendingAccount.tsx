import AccountComponent from "@/component/account";
import { useAccountFetch } from "@/hooks/account";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";

export default function UserAccounts() {
  const { accounts, loading } = useAccountFetch();
  return (
    <Box>
      {loading ? (
        <CircularProgress variant="indeterminate" />
      ) : accounts.length >= 1 ? (
        <Stack rowGap={"0.5em"}>
          {accounts.map((item) => (
            <AccountComponent key={item._id} {...item} />
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
