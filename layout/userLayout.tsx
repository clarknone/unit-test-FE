import { Box, Container, Stack } from "@mui/material";
import { PropsWithChildren, useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { useAuthContex } from "@/context/auth";
import DashboardDrawer from "@/component/layout/drawer";
import DashboardAppBar from "@/component/layout/appBar";
import { UserNavLinks } from "@/service/data/layout/nav";
import { useProfileFetch } from "@/hooks/user";

export default function UserLayout({ children }: PropsWithChildren) {
  const { auth } = useAuthContex();
  const router = useRouter();
  const [drawer, setDrawer] = useState(false);

  const { user } = useProfileFetch();

  const path = router.pathname;

  useEffect(() => {
    if (!auth?.token) {
      Router.push("/");
    } else {
      if (!path.includes("verify")) {
        if (!user?.isVerified) {
          router.push("/user/verify");
        }
      }
    }
  }, [auth, user?.isVerified]);

  const toggleDrawer = () => setDrawer((val) => !val);

  return auth?.token ? (
    <Container
      sx={{
        bgcolor: "#F5F5F5",
      }}
      disableGutters
      maxWidth={false}
    >
      <Stack direction="row" columnGap={{ md: "2.64vw" }}>
        <Box>
          <DashboardDrawer type="user" open={drawer} close={toggleDrawer} navLinks={UserNavLinks} />
        </Box>
        <Box flexGrow="1" width="100%">
          <DashboardAppBar type="user" title="User Dashbard" toggle={toggleDrawer} />
          <Box mt={"1em"} component="main">
            {children}
          </Box>
        </Box>
      </Stack>
    </Container>
  ) : (
    <></>
  );
}
