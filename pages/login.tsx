import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";

export default function LoginPage() {
  const { isLoading, isAuthenticated, error, user, loginWithRedirect } = useAuth0();
  console.log({ error, user, isAuthenticated });
  const router = useRouter();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isAuthenticated) {
    return (  
      <div>
        Hello {user?.name} <button onClick={() => router.push("profile")}> Go To Profile</button>
      </div>
    );
  } else {
    return (
      <>
        <button onClick={() => loginWithRedirect()}>Log in</button>
        <button
          onClick={() =>
            loginWithRedirect({ authorizationParams: { screen_hint: "signup", user_metadata: { First_Name: "" } } })
          }
        >
          Sign Up
        </button>
      </>
    );
  }
}
