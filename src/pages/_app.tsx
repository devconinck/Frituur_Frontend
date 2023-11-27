import { type AppType } from "next/app";

import "~/styles/globals.css";

import { ThemeProvider } from "~/components/theme-provider";
import Header from "~/components/Header";
import { AuthProvider } from "~/contexts/auth.contexts";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default MyApp;
