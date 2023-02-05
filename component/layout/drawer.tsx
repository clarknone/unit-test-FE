import { INavItems, UserNavLinks } from "@/service/data/layout/nav";
import { Drawer, Box, ListItem, Typography, ListItemText, Stack, useTheme, useMediaQuery, Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

const DrawerList = ({ links, type }: { links: INavItems[]; type: "admin" | "user" }) => {
  const router = useRouter();
  const currentPage = router.pathname;

  function switchAccount() {
    router.push(`/${type == "user" ? "admin" : "user"}`);
  }

  return (
    <div>
      <Stack alignItems={"center"} justifyContent="space-between" direction={"row"} gap="1em" p={"1em"} >
        <Link href="/">
          <Typography> Unit Test </Typography>
        </Link>
        <Button onClick={switchAccount}> Switch </Button>
      </Stack>
      <Stack
        justifyContent="space-between"
        // alignItems="center"
        pl={{ xs: "32px", md: "2.36vw" }}
        sx={{ color: "#6D7C90" }}
      >
        {links.map((item) => (
          <Link href={item.path} key={item.path}>
            <ListItem
              key={item.path}
              disableGutters
              disablePadding
              sx={{
                py: { xs: "17px", md: "1.25vw" },
                px: { xs: "15px", md: "1.11vw" },
                color: item.path === currentPage ? "#2A569F" : "inherit",
                cursor: "pointer",
              }}
            >
              <Stack direction="row" alignItems="center">
                <Box mr={{ xs: "17px", md: "1.25vw" }} fontSize={{ xs: "23px", md: "1.67vw" }}>
                  <item.icon fontSize={"inherit"} />
                </Box>
                <ListItemText
                  primary={<Typography fontSize={{ xs: "0.75em", md: "1.25vw" }}>{item.title}</Typography>}
                />
              </Stack>
            </ListItem>
          </Link>
        ))}
      </Stack>
    </div>
  );
};

interface IDrawerProps {
  open: boolean;
  close: () => void;
  navLinks: INavItems[];
  type: "admin" | "user";
}

export default function DashboardDrawer(props: IDrawerProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Drawer
      open={props.open}
      onClose={props.close}
      variant={isMobile ? "temporary" : "permanent"}
      sx={{
        height: { md: "100%" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: { xs: "250px", md: "18.40vw" },
          borderRight: "none",
          minHeight: "100vh",
          height: "100%",
          position: "relative",
        },
      }}
    >
      <DrawerList links={props.navLinks} type={props.type} />
    </Drawer>
  );
}
