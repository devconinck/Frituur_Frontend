import { type AppType } from "next/app";

import "~/styles/globals.css";

import { ThemeProvider } from "~/components/theme-provider";
import Header from "~/components/Header";
import { AuthProvider } from "~/contexts/auth.contexts";
import Layout from "./layout";
import AdminLayout from "./admin/layout";
import { useRouter } from "next/router";

const MyApp: AppType = ({ Component, pageProps }) => {
  const router = useRouter();
  const isAdmin = router.pathname.startsWith("/admin");

  return (
    <AuthProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {isAdmin ? (
          <AdminLayout>
            <Component {...pageProps} />
          </AdminLayout>
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </ThemeProvider>
    </AuthProvider>
  );
};

export default MyApp;
