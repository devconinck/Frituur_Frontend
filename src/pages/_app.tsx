import { type AppType } from "next/app";

import "~/styles/globals.css";
import { ThemeProvider } from "~/components/theme-provider";
import Header from "~/components/Header";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Header />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
