import { GTProviders } from "~/providers";
import "./globals.css";
import { Noto_Sans_Javanese } from "next/font/google";
import { Toaster } from "~/components/common/toater";
import { Notification } from "~/components/domain/notification/Notification";
import { cn } from "~/lib/ui/utils";

const notoSansJp = Noto_Sans_Javanese({
  subsets: ["latin"],
});

export const metadata = {
  title: "Katacky",
  description:
    "オリジナルチケットを発行して使用したり、他の人に渡すことができるアプリです",
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <head>
        <meta name="application-name" content="katacky" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="katacky" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        {/* <meta name="msapplication-config" content="/icons/browserconfig.xml" /> */}
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="mask-icon"
          href="/icons/safari-pinned-tab.svg"
          color="#5bbad5"
        />

        {/* <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content={getBaseUrl()} />
        <meta name="twitter:title" content="katacky" />
        <meta name="twitter:description" content="チケット発行アプリ" />
        <meta name="twitter:image" content="/android-chrome-192x192.png" />
        <meta name="twitter:creator" content="@skyt" /> */}
        {/* <meta property="og:type" content="website" />
        <meta property="og:title" content="katacky" />
        <meta property="og:description" content="チケット発行アプリ" />
        <meta property="og:site_name" content="katacky" />
        <meta property="og:url" content={getBaseUrl()} />
        <meta property="og:image" content="/apple-touch-icon.png" /> */}
      </head>
      <body
        className={cn("h-screen w-screen bg-background", notoSansJp.className)}
      >
        <main className="container bg-background min-h-full p-8 box-border pb-24">
          <GTProviders>
            {children}
            <Toaster />
            <Notification />
          </GTProviders>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
