import { Box, Container, Stack } from "@mui/material";
import { PropsWithChildren, useEffect, useState } from "react";
import Router from "next/router";
import { useAuthContex } from "@/context/auth";
import DashboardDrawer from "@/component/layout/drawer";
import DashboardAppBar from "@/component/layout/appBar";
import { AdminNavLinks } from "@/service/data/layout/nav";

export default function AdminLayout({ children }: PropsWithChildren) {
  const { auth } = useAuthContex();
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    if (!auth?.token) {
      Router.push("/");
    }
  }, [auth]);

  const toggleDrawer = () => setDrawer((val) => !val);

  return auth?.token ? (
    <Container
      sx={{
        bgcolor: "#F5F5F5",
      }}
      disableGutters
      maxWidth={false}
    >
      <Stack direction="row" height="" columnGap={{ md: "2.64vw" }}>
        <Box>
          <DashboardDrawer type="admin" open={drawer} close={toggleDrawer} navLinks={AdminNavLinks} />
        </Box>
        <Box flexGrow="1" width="100%" pl={{ xs: "17px", sm: "27px" }}>
          <DashboardAppBar type="admin" title="Admin Dashbard" toggle={toggleDrawer} />
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
