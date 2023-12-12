import { type AppType } from "next/app";

import "~/styles/globals.css";

import { ThemeProvider } from "~/components/theme-provider";
import { AuthProvider } from "~/contexts/auth.contexts";
import Layout from "./layout";
import AdminLayout from "./admin/layout";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const MyApp: AppType = ({ Component, pageProps }) => {
  const router = useRouter();
  const isAdmin = router.pathname.startsWith("/admin");

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
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
          <ReactQueryDevtools />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
