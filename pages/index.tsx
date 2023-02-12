import LoadingButton from "@/component/general/loadingButton";
import CustomSnackBar from "@/component/general/snackbar";
import { useAuthContex } from "@/context/auth";
import { ISignInData } from "@/interface/auth";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Card, CardContent, Container, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

export default function AuthPage() {
  const router = useRouter();
  const { login } = useAuthContex();
  const [snackbar, setSnackbar] = useState<{ error?: string; success?: string }>({});
  const [loading, setLoading] = useState(false);
  const auth0 = useAuth0();

  console.log(auth0);

  async function getData() {
    const func = await auth0.getAccessTokenSilently({
      // authorizationParams: { audience: "https://localhost:8000" },
    });
    getProfile(func).then(data=>{
      console.log({data})
    })
    const token = await auth0.getIdTokenClaims();
    console.log({ func, token });
  }

  function loginS() {
    auth0.loginWithRedirect();
  }


  function getProfile(token:string){
    return axios.get("http://localhost:8000/auth/profile",{headers:{Authorization:`Bearer ${token}`}})
  }

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: ISignInData = { email: e.currentTarget["email"].value, password: e.currentTarget["password"].value };
    setSnackbar({});
    setLoading(true);
    login &&
      login(data)
        .then(() => {
          setSnackbar(() => ({ success: "Login sucessful" }));
          router.push("/user");
        })
        .catch((e) => {
          console.log({ m: e.message });
          setSnackbar(() => ({ error: e.message }));
        })
        .finally(() => {
          setLoading(false);
        });
  };
  return (
    <Stack justifyContent={"center"} alignItems="center" sx={{ minHeight: "100vh" }}>
      <Button onClick={getData}> Click </Button>
      <Button onClick={loginS}> Login </Button>
      <Card elevation={0}>
        <Stack p={"1em"} gap={"1em"} justifyContent="center">
          <Typography>
            {" "}
            Login to Continue or{" "}
            <Link href={"/signup"}>
              <Button> Sign Up </Button>
            </Link>
          </Typography>
          <form onSubmit={handleLogin}>
            <Stack gap={"2em"}>
              <TextField label="Email" name="email" type={"email"} />
              <TextField label="Password" name="password" type={"password"} />
              <LoadingButton variant="contained" loading={loading} type="submit">
                Login
              </LoadingButton>
            </Stack>
          </form>
        </Stack>
      </Card>

      <CustomSnackBar
        display={Boolean(snackbar.error || snackbar.success)}
        type={snackbar.success ? "success" : "error"}
        message={snackbar.error || snackbar.success}
      />
    </Stack>
  );
}
