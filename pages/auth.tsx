import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";

export default function AuthPage() {
  const router = useRouter()
  const param = router.query

  console.log({param})
  return (
    <Box>
      <Button> Login </Button>
    </Box>
  );
}
