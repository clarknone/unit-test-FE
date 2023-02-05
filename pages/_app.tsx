import AuthProvider from "@/context/auth";
import "@/styles/globals.css";
// import { Auth0Provider } from "@auth0/auth0-react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@emotion/react";
import AppTheme from "../styles/theme";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    // <Auth0Provider
    //   domain="unit-auth-test.jp.auth0.com"
    //   clientId="sqsj3bbA5p1ricYYxQqCNBAPNBUZHZzZ"
    //   authorizationParams={{ redirect_uri: "http://localhost:3000" }}
    // >
    <ThemeProvider theme={AppTheme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
    // </Auth0Provider>
  );
}
