import {
  Box,
  Button,
  Typography,
  TextField,
  Stack,
  MenuItem,
  SelectChangeEvent,
  Select,
  FormControl,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { FaTimes } from "react-icons/fa";
import IconButton from "@mui/material/IconButton";
import { IWallet, IWalletWithdrawForm } from "@/interface/wallet";
import { FormEvent, useState } from "react";
import { useWalletWithdrawMutate } from "@/hooks/wallet";
import LoadingButton from "../general/loadingButton";
import { useAccountFetch } from "@/hooks/account";

export interface ITransferModelProps extends IWallet {
  open: boolean;
  close: () => void;
}

export default function WalletWithdrawModel(props: ITransferModelProps) {
  const { walletWithdrawMutate, loading } = useWalletWithdrawMutate(props.close);
  const { accounts, loading: accountLoading } = useAccountFetch();

  const [currentBank, setCurrentBank] = useState<string>("");

  function handleTransfer(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data: IWalletWithdrawForm = {
      wallet: props._id,
      amount: parseInt(e.currentTarget["amount"].value) || 0,
      account: e.currentTarget["account"].value,
    };
    console.log({ data });
    walletWithdrawMutate(data);
  }

  function handleCurrentBankChange(e: SelectChangeEvent) {
    setCurrentBank(e.target.value);
  }
  return (
    <>
      <Dialog
        open={props.open}
        onClose={props.close}
        PaperProps={{
          sx: {
            width: "100%",
            maxWidth: "400px",
            border: "none",
            backgroundColor: "white",
          },
        }}
      >
        <Box>
          <Stack direction={"row"} p={"1em"} gap={"1em"} alignItems="center" justifyContent="space-between">
            <Typography my={"1em"} textAlign="center">
              Withdraw from Wallet
            </Typography>

            <IconButton
              aria-label="close"
              onClick={props.close}
              sx={{
                fontSize: { xs: "12px", sm: "18px", md: "24px" },
                color: "#000000",
              }}
            >
              <FaTimes />
            </IconButton>
          </Stack>

          <Stack gap={"1em"} p={"1em"} alignItems="flex-start" justifyContent="center">
            <form style={{ width: "100%" }} onSubmit={handleTransfer}>
              <Stack gap="1em" alignItems="flex-start" justifyContent="center">
                <Select
                  fullWidth
                  label="Bank Account"
                  name="account"
                  value={currentBank}
                  onChange={handleCurrentBankChange}
                  required
                >
                  {!accountLoading &&
                    accounts.length &&
                    accounts.map((account) => <MenuItem value={account._id}> {account.bank} </MenuItem>)}
                </Select>
                <TextField fullWidth label={`Amount In ${props.currency}`} name="amount" required />
              </Stack>
              <Stack mt={"1em"} direction="row" justifyContent="right">
                <LoadingButton variant="contained" disableElevation loading={loading} type="submit">
                  Withdraw
                </LoadingButton>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Dialog>
    </>
  );
}
("");
