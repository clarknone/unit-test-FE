import ApplicationFormDialog from "@/component/application/user/form";
import { IStatsCardProps } from "@/component/stats/statsCard";
import { useProfileFetch } from "@/hooks/user";
import UserLayout from "@/layout/userLayout";
import { Box, Button, Stack, Typography } from "@mui/material";
import Router from "next/router";
import { useState } from "react";
import { FaPlus, FaSadCry } from "react-icons/fa";

const data: IStatsCardProps[] = [{ title: "Total User", value: 20, Icon: FaSadCry }];

export default function UserHomePage() {
  const [model, setModel] = useState(false);

  const { user } = useProfileFetch();

  if (user?.isVerified) {
    Router.push("/user");
  }

  return (
    <UserLayout>
      <Stack>
        <Box>
          <Typography> Please complete your profile verification </Typography>
          <Button onClick={() => setModel(true)}> Verify </Button>
        </Box>
      </Stack>
      <ApplicationFormDialog open={model} close={() => setModel(false)} />
    </UserLayout>
  );
}
