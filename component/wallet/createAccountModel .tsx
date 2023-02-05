import { Box, Button, Typography, TextField, Stack, MenuItem } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { FaTimes } from "react-icons/fa";
import IconButton from "@mui/material/IconButton";
import { FormEvent } from "react";
import LoadingButton from "../general/loadingButton";
import { IAccount } from "@/interface/account";
import { useAccountMutate } from "@/hooks/account";

export interface ICreateAccountModelProps {
  open: boolean;
  close: () => void;
}

const Banks = [
  "First Bank Plc",
  "Zenith Bank Plc",
  "Union Bank Plc",
  "Access Bank Plc",
  "United Bank Of Africa Plc",
  "Standard Plc",
];

export default function CreateAccountModel(props: ICreateAccountModelProps) {
  const { accountMutate, loading } = useAccountMutate(props.close);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data: IAccount = {
      bank: e.currentTarget["bank"].value,
      accountName: e.currentTarget["accountName"].value,
      accountNo: e.currentTarget["accountNo"].value,
      currency: e.currentTarget["currency"].value,
    };
    accountMutate(data);
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
              Create Account
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
            <form style={{ width: "100%" }} onSubmit={handleSubmit}>
              <Stack gap="1em" alignItems="flex-start" justifyContent="center">
                <TextField fullWidth label="Bank Name" name="bank" select>
                  {
                    Banks.map((bank)=>(
                      <MenuItem value={bank}> {bank} </MenuItem>
                    ))
                  }
                </TextField>
                <TextField fullWidth label="Currency" name="currency" select required>
                  <MenuItem value="USD"> USD </MenuItem>
                  <MenuItem value="NGN"> NGN </MenuItem>
                </TextField>
                <TextField fullWidth label="Account Name" name="accountName" required></TextField>
                <TextField fullWidth label="Account No" name="accountNo" required />
              </Stack>
              <Stack mt={"1em"} direction="row" justifyContent="right">
                <LoadingButton variant="contained" disableElevation loading={loading} type="submit">
                  Create
                </LoadingButton>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Dialog>
    </>
  );
};
