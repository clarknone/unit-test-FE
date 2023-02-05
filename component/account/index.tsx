import { IAccount } from "@/interface/account";
import { Card, CardContent, Chip, Stack, Typography } from "@mui/material";

export default function AccountComponent(account: IAccount) {
  return (
    <Card elevation={0}>
      <CardContent>
        <Stack direction={"row"} justifyContent="end">
          <Chip  color="primary" size="small"  label={account.currency} />
        </Stack>
        <Stack>
          <Typography> Account Name: {account.accountName}</Typography>
          <Typography> Account No:{account.accountNo} </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
