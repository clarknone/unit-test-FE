import { IWallet } from "@/interface/wallet";
import { Button, Card, CardActions, CardContent, Chip, IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import NoWalletComponent from "./noWallet";
import WalletTransferModel from "./transferModel";
import WalletWithdrawModel from "./withdrawModel";

interface IModels {
  withdraw: boolean;
  transfer: boolean;
}

export default function WalletComponent(wallet: IWallet) {
  const [model, setModel] = useState<IModels>({ withdraw: false, transfer: false });

  const toggle = (type: "withdraw" | "transfer") => {
    setModel((val) => ({ ...val, [type]: !val[type] }));
  };

  if (wallet._id) {
    return (
      <Card elevation={0}>
        <CardContent>
          <Stack direction={"row"} justifyContent="end">
            <Chip color="primary" size="small" label={wallet.currency} />
          </Stack>
          <Typography>
            {wallet.currency}
            {(wallet.balance / 10).toFixed(2)}
          </Typography>
          <Stack>
            <Typography> Account No:{wallet.accountNumber} </Typography>
            <Typography> Routing No: {wallet.routingNumber}</Typography>
          </Stack>
        </CardContent>
        <CardActions>
          <Stack direction={"row"} gap={"1em"} justifyContent="space-between">
            <Button variant="contained" size="small" disableElevation onClick={() => toggle("transfer")}>
              Transfer{" "}
            </Button>
            <Button variant="contained" size="small" disableElevation color="secondary" onClick={() => toggle("withdraw")}>
              Withdraw{" "}
            </Button>
            {/* <Button> Deposit </Button> */}
          </Stack>
        </CardActions>

        <WalletTransferModel {...wallet} open={model.transfer} close={() => toggle("transfer")} />
        <WalletWithdrawModel {...wallet} open={model.withdraw} close={() => toggle("withdraw")} />
      </Card>
    );
  }

  return <NoWalletComponent />;
}
