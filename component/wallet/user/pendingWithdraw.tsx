import { IWalletWithdraw } from "@/interface/wallet";
import {
  Chip,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

export default function UserPendingWalletWithdraw(wallet: IWalletWithdraw) {
  return (
    <ListItem secondaryAction={<Chip color="primary" size="small" label={wallet.status} />}>
      <ListItemText
        primary={<Typography> {wallet.account.bank} </Typography>}
        secondary={
          <>
            <Stack direction={"row"} gap={"1em"}>
              <Typography>
                {" "}
                {wallet.wallet?.currency} {wallet.amount}{" "}
              </Typography>
              <Typography>Phone: {wallet.account.bank}</Typography>
            </Stack>
          </>
        }
      />
    </ListItem>
  );
}
