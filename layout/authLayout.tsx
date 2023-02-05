import { setToken } from "@/service/api/config";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Container, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { PropsWithChildren, useEffect } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently()
        .then((token) => {
          console.log({ token });
          setToken(token);
        })
        .catch((e) => {
          console.log({ e });
        });
    }
  }, [isAuthenticated]);
  if (isAuthenticated) {
    return <Container maxWidth={false}>{children}</Container>;
  } else if (isLoading) {
    return <Typography> Loading ....</Typography>;
  } else {
    router.push("/");
    return <></>;
  }
}
