import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import { cookies, headers } from "next/headers";

import { ToastProvider } from "@/lib/components/ui/Toast";
import { FeatureFlagsProvider } from "@/lib/context";
import { SupabaseProvider } from "@/lib/context/SupabaseProvider";

import { App } from "./App";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SpringerAI - Get a Second Brain with Generative AI",
  description:
    "SpringerAI is your second brain in the cloud, designed to easily store and retrieve unstructured information.",
};

const RootLayout = async ({
  children,
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> => {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body
        className={`bg-white text-black h-screen flex flex-col dark:bg-black dark:text-white w-full ${inter.className}`}
      >
        <FeatureFlagsProvider>
          <ToastProvider>
            <SupabaseProvider session={session}>
              <App>{children}</App>
            </SupabaseProvider>
          </ToastProvider>
          <VercelAnalytics />
        </FeatureFlagsProvider>
      </body>
    </html>
  );
};

export default RootLayout;
