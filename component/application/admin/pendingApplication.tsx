import LoadingButton from "@/component/general/loadingButton";
import { useApplicationApproveMutate } from "@/hooks/user/admin";
import { IApplication } from "@/interface/user/application";
import { Button, IconButton, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import { FaTimes } from "react-icons/fa";

export default function PendingApplicationComponent(application: IApplication) {
  const { approveMutate, loading } = useApplicationApproveMutate();

  function handleApprove() {
    approveMutate({ application: application._id, status: "successful" });
  }
  return (
    <ListItem
      secondaryAction={
        <LoadingButton loading={loading} onClick={handleApprove} variant="contained">
          Approve
        </LoadingButton>
      }
    >
      <ListItemText
        primary={<Typography> {application.user.fullname} </Typography>}
        secondary={
          <>
            <Stack component={"span"} direction={"row"} gap={"1em"}>
              <Typography component={"span"}>Email: {application.user.email} </Typography>
              <Typography component={"span"}>Phone: {application.user.phone}</Typography>
            </Stack>
          </>
        }
      />
    </ListItem>
  );
}
