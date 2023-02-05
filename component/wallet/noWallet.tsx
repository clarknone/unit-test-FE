import { useCreateWalletMutate } from "@/hooks/wallet";
import { Button, Card, CardActions, CardContent, Chip, Stack, Typography } from "@mui/material";
import LoadingButton from "../general/loadingButton";

export default function NoWalletComponent() {
  const { createWalletMutate, loading } = useCreateWalletMutate();
  return (
    <Card elevation={0}>
      <CardContent>
        <Typography> No Wallet</Typography>
        <LoadingButton onClick={() => createWalletMutate()} loading={loading}>
          {" "}
          Add New Wallet{" "}
        </LoadingButton>
      </CardContent>
    </Card>
  );
}
