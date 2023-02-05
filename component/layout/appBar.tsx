import React from "react";
import { AppBar, Box, Button, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaLockOpen, FaThList } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { useAuthContex } from "@/context/auth";

interface IAppBarProps {
  toggle: () => void;
  title: string;
  type: "admin" | "user";
}

export default function DashboardAppBar(props: IAppBarProps) {
  const { logout } = useAuthContex();
  function handlelogout() {
    logout && logout();
  }
  return (
    <AppBar
      elevation={0}
      sx={{ bgcolor: "transparent", pl: 0, color: "black", position: "relative", minHeight: "auto" }}
    >
      <Toolbar
        sx={{
          pl: { xs: "1em", md: 0 },
          display: "block",
          // pl: { xs: "4.80vw", md: "7.18vw" },
          // pr: { xs: "4.80vw", md: "6.77vw" },
          mt: { xs: "3.20vw", md: "1.91vw" },
        }}
        style={{ minHeight: "auto" }}
      >
        <Stack
          direction={"row"}
          justifyContent="space-between"
          flexWrap="wrap"
          alignItems={"center"}
          columnGap="20px"
          rowGap="20px"
        >
          <Stack direction={"row"} columnGap={{ xs: "0.00vw", md: "4.98vw" }}>
            <IconButton
              edge="start"
              color="primary"
              onClick={props.toggle}
              sx={{
                mr: "20px",
                display: { md: "none" },
              }}
            >
              <FaThList />
            </IconButton>
            <Box position="relative">
              <Link href={`/${props.type}`}>
                <Typography> {props.title} </Typography>
              </Link>
            </Box>
          </Stack>
          <Box>
            <Button onClick={handlelogout} startIcon={<AiOutlineLogout />}>
              Logout
            </Button>
          </Box>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
