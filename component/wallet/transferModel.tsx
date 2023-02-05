import { Box, Button, Typography, TextField, Stack } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { FaTimes } from "react-icons/fa";
import IconButton from "@mui/material/IconButton";
import { IWallet, IWalletTransferForm } from "@/interface/wallet";
import { FormEvent } from "react";
import { useWalletTransferMutate } from "@/hooks/wallet";
import LoadingButton from "../general/loadingButton";

export interface ITransferModelProps extends IWallet {
  open: boolean;
  close: () => void;
}

export default function WalletTransferModel(props: ITransferModelProps) {
  const { walletTransferMutate, loading } = useWalletTransferMutate(props.close);

  function handleTransfer(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data: IWalletTransferForm = {
      sendWallet: props._id,
      amount: parseInt(e.currentTarget["amount"].value || "0"),
      user: e.currentTarget["user"].value,
    };
    console.log({ data });
    walletTransferMutate(data);
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
            <Typography textAlign="center">Wallet to Wallet Transfer</Typography>
            <IconButton
              aria-label="close"
              onClick={props.close}
              sx={{ fontSize: { xs: "12px", sm: "18px", md: "24px" }, color: "#000000" }}
            >
              <FaTimes />
            </IconButton>
          </Stack>
          <Stack gap={"1em"} p={"1em"} alignItems="flex-start" justifyContent="center">
            <form style={{ width: "100%" }} onSubmit={handleTransfer}>
              <Stack gap="1em" alignItems="flex-start" justifyContent="center">
                <TextField fullWidth label="Receiver's Email" name="user" type={"email"} required />
                <TextField fullWidth label={`Amount In ${props.currency}`} name="amount" type={"number"} required />
              </Stack>
              <Stack mt={"1em"} direction="row" justifyContent="right">
                {
                  <LoadingButton variant="contained" disableElevation loading={loading} type="submit">
                    Transfer
                  </LoadingButton>
                }
              </Stack>
            </form>
          </Stack>
        </Box>
      </Dialog>
    </>
  );
}
("");
